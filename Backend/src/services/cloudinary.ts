/** @format */

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: 'dm8lhfdqd',
  api_key: "185965745277553",
  api_secret: "lyfnUqK5wgd5T_Vv_ksnp-w_m8s",
});

export function uploadImage(imageUploaded: any) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,
      { width: 400, height: 300, crop: "fill" },
      (err: any, res: any) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}
