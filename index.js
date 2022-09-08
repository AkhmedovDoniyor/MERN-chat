require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');

require('./models/user');
require('./models/post');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


mongoose.connect(MONGO_URI, () => console.log('Connect DB'))

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

