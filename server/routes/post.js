const express = require('express');
const db = require('../db');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
const authenticateToken = require('../middleware/auth');

function authOrSession(req, res, next) {
    if (req.user) return next();
    next();
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', async (req, res) => {
    const [rows] = await db.execute(
        `SELECT p.*, u.username AS writer_name
        FROM posts p
        JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC`
    );
    res.json(rows);
});

// router.get('/:id', async (req, res) => {
//     const [rows] = await db.execute(
//         'SELECT * FROM posts WHERE id = ? AND user_id = ?',
//         [req.params.id, req.user.id]
//     );
//     if (rows.length === 0) return res.sendStatus(404);
//     res.json(rows[0]);
// });

router.get('/:id', authOrSession, async (req, res) => {
    const postId = req.params.id;
    const sessionID = req.sessionID;
    const userID = req.user?.id ?? null;

    // 1. 게시글 + 작성자 정보
    const [[post]] = await db.execute(
        `SELECT p.*, u.username AS writer_name
     FROM posts p
     JOIN users u ON p.user_id = u.id
     WHERE p.id = ?`,
        [postId]
    );
    if (!post) return res.sendStatus(404);

    // 2. 조회수 증가
    await db.execute(`UPDATE posts SET views = views + 1 WHERE id = ?`, [userID]);
    const [[updatedPost]] = await db.execute(
        `SELECT p.*, u.username AS writer_name
   FROM posts p JOIN users u ON p.user_id = u.id
   WHERE p.id = ?`, [userID]
    );

    // 2. 댓글 목록 함께 조회
    const [comments] = await db.execute(
        `SELECT c.*, u.username AS author_name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = ?
     ORDER BY c.created_at ASC`,
        [postId]
    );

    const [[{ count }]] = await db.execute(
        'SELECT COUNT(*) AS count FROM post_likes WHERE post_id = ?', [req.params.id]
    );

    const [[{ cnt }]] = await db.execute(
        'SELECT COUNT(*) AS cnt FROM post_likes WHERE post_id = ? AND user_id = ?', [req.params.id, userID]
    );

    // 3. post 객체에 comments 속성 추가
    post.comments = comments;

    // 4. JSON으로 응답
    res.json({
        ...post,
        likes: count,
        liked: cnt > 0,
        views: post.views,
        comments
    });
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    // 작성자 확인
    const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [postId]);
    if (rows.length === 0) return res.status(404).json({ message: '게시글 없음' });
    if (rows[0].user_id !== userId) return res.status(403).json({ message: '권한 없음' });

    // DB에서 삭제
    await db.execute('DELETE FROM posts WHERE id = ?', [postId]);

    res.json({ message: '삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '삭제 중 오류 발생' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { title, body, category } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [postId]);
    if (rows.length === 0) return res.status(404).json({ message: '게시글 없음' });
    if (rows[0].user_id !== userId) return res.status(403).json({ message: '수정 권한 없음' });

    await db.execute(
      `UPDATE posts SET title = ?, body = ?, category = ?, updated_at = NOW() WHERE id = ?`,
      [title, body, category, postId]
    );

    res.json({ message: '수정 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '수정 중 오류 발생' });
  }
});


router.patch('/:id', async (req, res) => {
    const { title, body, category } = req.body;
    await db.execute(
        `UPDATE posts
            SET title = ?, body = ?, category = ?
        WHERE id = ? AND user_id = ?`,
        [title, body, category, req.params.id, req.user.id]
    );
    res.sendStatus(204);
});

router.post('/', authenticateToken, upload.array('images'), async (req, res) => {
    console.log('업로드 요청 파일들:', req.files);
    let images = [];
    if (req.files && req.files.length) {
        const uploaded = await Promise.all(req.files.map(file =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result.secure_url);
                });
                stream.end(file.buffer);
            })
        ));
        images = uploaded;
    }

    const { title, body, category } = req.body;
    const [result] = await db.execute(`
    INSERT INTO posts (user_id, title, body, category, images, views, likes, created_at)
    VALUES (?, ?, ?, ?, ?, 0, 0, NOW())
  `, [req.user.id, title, body, category, JSON.stringify(images)]);

    const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
});

// router.post('/', upload.single('image'), async (req, res) => {
//   let imageUrl = null;

//   if (req.file) {
//     // 클라우디너리에 업로드
//     const uploadRes = await cloudinary.uploader.upload_stream({ resource_type: 'image' })
//       .catch(err => { throw err; });

//     // 메모리 스트림 사용
//     uploadRes.end(req.file.buffer);
//     imageUrl = (await uploadRes).secure_url;
//   }

//   // 📌 게시글 DB 저장
//   const { title, body, category } = req.body;
//   const [result] = await db.execute(
//     `INSERT INTO posts 
//       (user_id, title, body, category, image, views, likes, created_at)
//      VALUES (?, ?, ?, ?, ?, 0, 0, NOW())`,
//     [req.user.id, title, body, category, imageUrl]
//   );

//   const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [result.insertId]);
//   res.status(201).json(rows[0]);
// });

// 댓글 추가
// POST /api/posts/:id/comments

const auth = require('../middleware/auth');

// router.use(auth);

router.post('/:id/comments', authenticateToken, async (req, res) => {
    const userId = req.user?.id;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: '댓글이 비어있습니다.' });

    const [result] = await db.execute(
        `INSERT INTO comments (post_id, user_id, body, created_at)
     VALUES (?, ?, ?, NOW())`,
        [req.params.id, req.user.id, text]
    );

    const [rows] = await db.execute('SELECT * FROM comments WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
});


// 댓글 불러오기
// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
    const [rows] = await db.execute(
        `SELECT c.*, u.username AS author_name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = ?
     ORDER BY c.created_at ASC`,
        [req.params.id]
    );
    res.json(rows);
});

// 좋아요 토글
// POST /api/posts/:id/like
router.post('/:id/like', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    const [[existing]] = await db.execute(
        `SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?`,
        [postId, userId]
    );
    if (existing) {
        await db.execute(`DELETE FROM post_likes WHERE id = ?`, [existing.id]);
    } else {
        await db.execute(`INSERT INTO post_likes (post_id, user_id, created_at)
                      VALUES (?, ?, NOW())`, [postId, userId]);
    }
    // 현재 총 좋아요 수
    const [[{ count }]] = await db.execute(
        `SELECT COUNT(*) AS count FROM post_likes WHERE post_id = ?`, [postId]
    );
    res.json({ liked: !existing, count });
});

// 좋아요 상태 조회
router.get('/:id/like-status', async (req, res) => {
    const [rows] = await db.execute(
        `SELECT COUNT(*) AS cnt
     FROM post_likes
     WHERE post_id = ? AND user_id = ?`,
        [req.params.id, req.user.id]
    );
    res.json({ liked: rows[0].cnt > 0 });
});

module.exports = router;