// import multer from 'multer'


// export default function handler(req, res) {

//     const upload = multer({ dest: '/public/imgs' })
//     upload.single(req.body.avatar)

//     res.status(200).json({ message: 'file uploaded' })
//   }
  


import nextConnect from 'next-connect';
import multer from 'multer';
import protectImage from '../../../middlewares/protectImage';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/imgs',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error)
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});


//protect the route

apiRoute.use(protectImage);

// apiRoute.use(upload.array('avatar'));

apiRoute.use(upload.single('avatar'));

apiRoute.post( async (req, res) => {
  const file = req.file

  const { filename } = file

  res.status(200).json({ filename });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};