const express = require('express');
const multer = require('multer'); // For file uploads
const app = express();
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Books')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render("admin.ejs",)
})


app.post("/upload", upload.single("bookFile"), (req, res) => {
    res.render("admin.ejs")
    // res.send("Book uploaded")
    console.log("book uploaded");
});

app.listen(3090);
console.log("port is running on 3090");