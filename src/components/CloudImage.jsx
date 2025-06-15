import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({ cloud: { cloudName: 'dpal8wysp' } });

export default function CloudImage({ publicId }) {
  const img = cld.image(publicId).resize({ width: 800, crop: 'scale' });
  return <AdvancedImage cldImg={img} />;
}