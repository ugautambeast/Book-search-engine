const mongoose = require("mongoose");

const DB = 'mongodb+srv://grocery:grocery123@cluster0.op7tq.mongodb.net/GROCERY-APP?retryWrites=true&w=majority';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("Database not connected"));