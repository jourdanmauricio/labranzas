import nextConnect from 'next-connect';
import multer from 'multer';

const ImageService = require('@/db/services/image.service');
const service = new ImageService();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, 'newImage');
  },
});

const upload = multer({ storage: storage });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  const newImage = await service.createCloudinary(
    req.file.path,
    req.file.originalname?.split('.')[0]
  );

  res.status(200).json({ newImage });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
