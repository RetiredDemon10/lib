const express = require('express');
const multer = require('multer'); // For file uploads
const fs = require('fs'); // For file system operations
const app = express();
const port = 3020;
var formidable = require('formidable');




app.get('/', (req, res) => {
    res.render("admin.ejs",)
})

// Middleware for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });

// Middleware for checking admin role (you can implement your own authentication and authorization logic)
function isAdmin(req, res, next) {
  const userRole = req.user.role; // Assuming you have a user object with a 'role' property
  if (userRole === 'admin') {
    return next(); // Admin is allowed to access these routes
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

// Route for uploading a file (admin only)
app.post('/upload', isAdmin, upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

// Route for editing user profiles (admin only)
app.put('/edit-user/:userId', isAdmin, (req, res) => {
  const userId = req.params.userId;
  // Implement logic to edit the user's profile here
  res.json({ message: `User profile with ID ${userId} edited successfully` });
});

// Route for fining a user (admin only)
app.post('/fine-user/:userId', isAdmin, (req, res) => {
  const userId = req.params.userId;
  // Implement logic to fine the user here
  res.json({ message: `User with ID ${userId} fined successfully` });
});

// Route for banning a user (admin only)
app.post('/ban-user/:userId', isAdmin, (req, res) => {
  const userId = req.params.userId;
  // Implement logic to ban the user here
  res.json({ message: `User with ID ${userId} banned successfully` });
});

// Route for deleting a user (admin only)
app.delete('/delete-user/:userId', isAdmin, (req, res) => {
  const userId = req.params.userId;
  // Implement logic to delete the user here
  res.json({ message: `User with ID ${userId} deleted successfully` });
});

// Route for updating a book (admin only)
app.put('/update-book/:bookId', isAdmin, (req, res) => {
  const bookId = req.params.bookId;
  // Implement logic to update the book here
  res.json({ message: `Book with ID ${bookId} updated successfully` });
});

// Route for issuing a book to a user (admin only)
app.post('/issue-book/:bookId/:userId', isAdmin, (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  // Implement logic to issue the book to the user here
  res.json({ message: `Book with ID ${bookId} issued to user with ID ${userId}` });
});




http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
