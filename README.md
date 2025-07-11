# 🧱 Club Website Infrastructure

이 프로젝트는 대학 동아리 웹사이트를 위한 **풀스택 인프라 구축 레포지토리**입니다.  
프론트엔드(React), 백엔드(Node.js + Express), 데이터베이스(MySQL), 리버스 프록시(Nginx)를 기반으로 **Docker** 및 **EC2** 환경에서 운영되며, 현재는 **DevOps 채용 포지션**을 목표로 클라우드 인프라 기반 프로젝트로 확장 중입니다.

<br/>

## 🧩 기술 스택

| 영역        | 기술                                |
|-------------|-------------------------------------|
| Frontend    | React (CRA), Bootstrap              |
| Backend     | Node.js, Express                    |
| Database    | MySQL 8                             |
| Web Server  | Nginx (리버스 프록시 + HTTPS)       |
| Container   | Docker, Docker Compose              |
| Infra       | AWS EC2 (Amazon Linux 2023)         |
| CI/CD       | GitHub Actions + Terraform 예정     |
| IaC         | Terraform, Ansible (도입 중)         |
| Kubernetes  | Minikube → EKS 마이그레이션 예정     |
| 모니터링    | Prometheus, Grafana, ELK 예정       |
| 보안        | HTTPS (Let's Encrypt), JWT, bcrypt |

<br/>

## ⚙️ 시스템 아키텍처 (확장 방향 포함)

```
[사용자]
   │
   ▼
[Nginx] ← SSL (HTTPS)
   │
 ┌▼─────────────┐
 │React (build) │
 └──────────────┘
   │
   ▼
[Express API Server] ←→ [MySQL]
   │                        ▲
   │                        │
   ▼                        ▼
[CI/CD 파이프라인]     [Terraform/Ansible IaC]
   │
   ▼
[EC2 → Kubernetes → EKS]
```

> 모든 서비스는 Docker Compose 기반으로 구성되며, IaC 및 자동화 기반 DevOps 환경을 목표로 확장 중입니다.

<br/>

## 🚀 기능 요약

- 🔐 **JWT + bcrypt 기반 로그인/회원가입**
- 📦 **프론트 + 백엔드 + DB Docker 통합 배포**
- 🌐 **Nginx 리버스 프록시 및 HTTPS 인증서 적용**
- 📤 **GitHub Actions 기반 CI/CD 파이프라인**
- 🧱 **Terraform 기반 인프라 프로비저닝 도입 중**
- ⚙️ **Ansible로 Docker, Nginx, Node.js 자동 설치 구성 중**
- ☁️ **Kubernetes 매니페스트 작성 및 EKS 실험 예정**
- 📊 **Prometheus + Grafana로 모니터링 대시보드 구성 예정**

<br/>

## 🛠️ 프로젝트 구조

```
club-website-infra/
├── build/                 # React build 결과물
├── server/                # Node.js + Express 백엔드
│   ├── routes/
│   ├── db.js
│   └── index.js
├── nginx/
│   └── default.conf       # 리버스 프록시 + HTTPS 설정
├── infra/
│   ├── terraform/         # IaC: EC2, VPC, Route53 설정 파일 예정
│   └── ansible/           # Ansible Playbook, Role 등 자동화 스크립트 예정
├── k8s/                   # Kubernetes 매니페스트 (Deployment, Service 등)
├── monitoring/            # Prometheus, Grafana 설정 예정
├── Dockerfile             # Express용 Dockerfile
├── docker-compose.yml     # 전체 서비스 정의
├── .github/workflows/     # GitHub Actions CI/CD 정의
└── README.md
```

<br/>

## 🔧 실행 방법

1. `.env.production` 파일 생성
```env
DB_HOST=mysql
DB_USER=your_user
DB_PASSWORD=your_pw
DB_NAME=your_db
JWT_SECRET=your_jwt_secret
```

2. Docker Compose 실행
```bash
docker-compose up -d --build
```

3. 로컬 확인
- React 프론트엔드: http://localhost
- Express API 서버: http://localhost:5000

<br/>

## 🧪 CI/CD 구성

- `main` 브랜치에 push 시 GitHub Actions가 다음을 수행:
  - Docker build + Docker Hub push
  - EC2에 SSH 접속 후 컨테이너 pull 및 재시작
  - 향후: Terraform을 통한 EC2 생성 자동화, Ansible로 초기화

<br/>

## 🔒 HTTPS 적용

- Nginx 설정을 통해 80/443 포트 리디렉션
- Certbot + Let's Encrypt로 SSL 인증서 발급
- `default.conf`에 HTTPS 설정 반영

<br/>

## 📌 향후 개선 예정

- Terraform으로 VPC + EC2 + Security Group 구성 자동화
- Ansible로 Nginx, Node, MySQL 설치 및 배포 자동화
- Kubernetes(로컬 Minikube → AWS EKS) 이관 실험
- Prometheus, Grafana, Loki/ELK 기반 모니터링 구성
- Helm chart 기반 서비스 배포 관리

<br/>

https://pda.cbnu.ac.kr

## 🪪 라이선스

MIT License
