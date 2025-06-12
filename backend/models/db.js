const mongoose = require("mongoose");
// require('dotenv').config();

mongoose.connect(process.env.DB_Uri)
.then(() =>{ console.log("connected DB")})
.catch((err) =>{console.log("DB NOT CONNECTED",err)});

