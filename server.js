if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}


//importing modules
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require('method-override')
// const multer = require('multer');
const path = require('path');


// Update the passport authentication function to fetch user from the database
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id ===id)
)

// store box for users 
const users = []
const reqBooks = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))
app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JavaScript, etc.) from a public folder
app.use(express.static(path.join(__dirname, 'public')));


// configuring login post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))


// configuring register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users);
        res.redirect("/login")

    } catch (e) {
        console.log(e);
        res.redirect("/register")

    }

})



//routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res,) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})
app.get('/userdashboard', checkAuthenticated, (req, res) => {
    res.render('userdashboard', { name: req.user.name });
});

// Define a route to handle book requests
app.post('/request-book', checkAuthenticated, (req, res) => {
    const bookTitle = req.body.bookTitle;
    
    // Here, you can add code to record the book request (e.g., save it to a database)
    // For this example, let's assume you have a user-specific book request array

    // Initialize a user-specific book request array if it doesn't exist yet
    if (!req.user.bookRequests) {
        req.user.bookRequests = [];
    }

    // Add the book request to the user's list
    req.user.bookRequests.push(bookTitle);

    // Redirect back to the index page after the request is recorded
    res.redirect('/');
});

//end routes


app.delete("/logout", (req, res) => {
    req.logout(req.user, err =>{
        if (err) return next(err)
        res.redirect("/")
    })   
})


function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
       return res.redirect("/")
    }
    next()    
}

app.listen(3000)




// .          Database config
// configuring register post functionality
// app.post('/register', checkNotAuthenticated, (req, res) => {
//     const { name, email, password } = req.body;
  
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) {
//         console.error(err);
//         res.redirect('/register');
//       } else {
//         const user = {
//           name: name,
//           email: email,
//           password: hashedPassword,
//         };
  
//         con.query('INSERT INTO users SET ?', user, (err, result) => {
//           if (err) {
//             console.error(err);
//             res.redirect('/register');
//           } else {
//             console.log('User registered:', result);
//             res.redirect('/login');
//           }
//         });
//       }
//     });
//   });



// Update the passport authentication function to fetch user from the database
// initializePassport(
//     passport,
//     email => {
//       con.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
//         if (err) throw err;
//         return rows[0]; 
//       });
//     },
//     id => {
//       con.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
//         if (err) throw err;
//         return rows[0]; 
//       });
//     }
//   );



// admin upload functionality

// Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './uploads'); // Specify the upload directory
//   },
//   filename: (req, file, callback) => {
//     const fileName = Date.now() + '-' + file.originalname;
//     callback(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

// // Serve static files (if needed)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Parse JSON and form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Sample database (you can replace this with your database logic)
// const books = [];

// Create a route for file upload
// app.post('/upload', upload.single('bookFile'), (req, res) => {
//   const bookTitle = req.body.bookTitle;
//   const bookNumber = req.body.bookNumber;
//   const file = req.file;

//   if (!bookTitle || !bookNumber || !file) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

  // Save file details to your database (or perform any other necessary operations)
//   const book = {
//     title: bookTitle,
//     number: bookNumber,
//     filePath: file.path, // Store the file path
//   };
//   books.push(book);

//   res.json({ message: 'File uploaded successfully' });
// });

// app.get('/', (req, res) => {
//   res.send('Welcome to the Library Management System');
// });

// Handle 404 errors
// app.use((req, res) => {
//   res.status(404).send('Not Found');
// });

// Handle other errors
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send('Internal Server Error');
// });