// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// How to correctly dir article solutions , https://medium.com/@boris.poehland.business/next-js-api-routes-how-to-read-files-from-directory-compatible-with-vercel-5fb5837694b9

import fs from "fs";
import path from "path";

export default (req, res) => {
  const dir = path.resolve("./public", req.body.dir);

  try {
    const filenames = fs.readdirSync(dir);
    console.log("yolo : ", filenames);

    //check extension files is valid

    res.status(200).json(filenames);
  } catch (err) {
    res.status(500).json(err);
  }
};
