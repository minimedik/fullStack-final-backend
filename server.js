const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

//const uri = process.eventNames.ATLAS_URI;
const uri = 'mongodb+srv://minimedik:TRCcyrhhoDzexBIw@cluster0.4pxzkse.mongodb.net/BookDB';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true   }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})


// import routes
const bookRouter = require('./routes/book');

// adding /activity to before all routes
app.use('/api/v1', bookRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});