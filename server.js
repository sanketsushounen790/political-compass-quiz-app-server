/* app init packages */
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

/* middlewares import */
//custom middlewares
const corsOptions = require('./configs/corsOptions');
//log handler
const verifyJWT = require('./middlewares/verifyJWT');
const credentials = require('./middlewares/credentials');
//third-party middlewares
const cookieParser = require('cookie-parser');

/* routes import*/
//public routes
const rootRoutes = require('./routes/root')
const catchAllRoutes = require('./routes/catch-all')
const resultRoutes = require('./routes/results')

//apis routes(private)
const questionRoutes = require('./routes/apis/questions')
const answerRoutes = require('./routes/apis/answer')
const commentRoutes = require('./routes/apis/comment')

/* app setup server and database configs */
const connectDB = require('./configs/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();
//use custom middleware logger
/* app.use(logEventHandler) */

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

/* routes */
//public access
app.use('/', rootRoutes)
app.use('/results', resultRoutes)

//DO THIS LATER ON
//private routes: need login(verify authentication) to access
//app.use(verifyJWT) //use middleware to verify auth
app.use('/questions', questionRoutes)
app.use('/answers', answerRoutes)
app.use('/comments', commentRoutes)

app.all('*', catchAllRoutes)

//use custom middleware to handle request errors
/* app.use(errorHandler); */

//Start the server after connect success to the database
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}; press Ctrl + C to terminate\n`));
});