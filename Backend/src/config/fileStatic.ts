/** @format */
import path from "path";
import express from "express";
const configFileStatic = (app: any) => {
  app.use(express.static(path.join("./src", "public")));
};
export default configFileStatic;
