const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

//***************************global configuration**********************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
///** shahid  yccpBN96Ay9JK8cw*/

//************************database connection here ******************/
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://shahid:yccpBN96Ay9JK8cw@cluster0.emevi.mongodb.net/userApp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("and database connected!");
  })
  .catch((err) => {});

//*********all routes here */

app.use("/api", userRoute);
app.use("/api", authRoute);
//**************************port listing */
app.listen(process.env.PORT || 9000);
