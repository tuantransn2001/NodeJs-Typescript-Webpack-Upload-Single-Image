require("dotenv").config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import uploadSingleImageProvider from "./middlewares/upload/upload-img";
// ? ============================== INITIATE SERVER ====================================
const app: Express = express();
// ? ============================== VARIABLES ====================================
const ROOT_URL: string = process.env.ROOT_URL as string;
const HOST: string = process.env.HOST as string;
const PORT: string = process.env.PORT as string;
// ? ============================== SETUP STATIC PATH ====================================
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));
// ? ============================== SETTING SERVER ================================
app.use(cors()); // * Allow cors
app.use(express.json()); // * Converted Data into JSON type - !Important
app.post(
  ROOT_URL,
  uploadSingleImageProvider("Avatar", [".png", ".jpg"]),
  (req: Request, res: Response) => {
    const imgInfo: any = req.file;
    res.status(200).send({
      message: "🚀 NodeJs Typescript Webpack - Upload Single Image 🚀",
      img: {
        ...imgInfo,
        imgSrc: `http://${HOST}:${PORT}/${imgInfo.filename}`,
      },
    });
  }
); // * Router Set up
// ? ========================== RUN SERVER ====================
app.listen(PORT, () => {
  console.log("Connected - Synchronous Database Success");
  console.log(`🚀 Server is running 🚀 - http://${HOST}:${PORT}`);
});
