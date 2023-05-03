import { Request } from "express";
import multer from "multer";
import { mkdirp } from "mkdirp";

const uploadSingleImageProvider = (
  storageFolderName: string,
  extensions: Array<string>
) => {
  // The <NAME> you use in multer's upload.single(<NAME>) function must be the same as the one you use in <input type="file" name="<NAME>" ...>.
  // ? Create folder where the image is
  const storagePath: any = mkdirp.sync(
    `${__dirname
      .split("/")
      .slice(0, -2)
      .join("/")}/build/production/public/Img/${storageFolderName}`
  );

  console.log(`made directories, starting with ${storagePath}`);

  const myCustomStorage = multer.diskStorage({
    destination: function (_: Request, __: Express.Multer.File, cb) {
      cb(null, storagePath);
    },
    filename: function (_: Request, file: Express.Multer.File, cb) {
      const extensionFileNameUpload: string = file.originalname.slice(-4);
      const isValidExtension: boolean = extensions.includes(
        extensionFileNameUpload
      );
      if (isValidExtension) {
        // ? Extension valid
        const uniqueSuffix: string =
          Date.now() + "-" + Math.round(Math.random() * 1e9);
        // ? Full Img name
        const completeFileName = `${file.fieldname}${uniqueSuffix}${extensionFileNameUpload}`;
        const imgPath: string = `${storagePath}/${completeFileName}`;

        console.log(`Complete file name: ${imgPath}`);

        cb(null, completeFileName);
        // ? Storage img path
      } else {
        // ! Extension in-valid
        cb(new Error("Extension in-valid"), file.filename);
      }
    },
  });

  const upload = multer({ storage: myCustomStorage });

  return upload.single(storageFolderName);
};

export default uploadSingleImageProvider;
