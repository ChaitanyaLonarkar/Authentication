
const express = require("express");
const router = express.Router();

const {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
  } = require("firebase/storage");
const multer = require("multer");

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
    // console.log(req.file)
    // console.log(req.body)
    try {
        // const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.body.img}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        // console.log('File successfully uploaded.',downloadURL);
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "../public/Images")
//   },
//   filename: function (req, file, cb) {
//     // return cb(null, `${Date.now()}_${file.originalname}`)
//     return cb(null,req.body.img)

//   }
// })

// const upload = multer({storage})

// router.post('/', upload.single('file'), (req, res) => {
//   console.log(req.body)
//   // console.log(req.file)
//   res.status(200).json("Image has been uploaded successfully!")
// })
module.exports= router