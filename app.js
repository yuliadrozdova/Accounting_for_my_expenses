const express = require('express');
const mongoose = require("mongoose");


//const bodyParser = require('body-parser');

const app = express();
 const cors = require('cors');

const bodyParser = require('body-parser');
// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(bodyParser.json());

const apiRoutes = require("./src/modules/routes/routes");

const uri = "mongodb+srv://user_01:CK9qTqZ5@cluster0.ijpew.mongodb.net/ExpenseAppDB?retryWrites=true&w=majority"
mongoose.connect(uri);

 app.use(cors());
//app.use(bodyParser);
app.use("/", apiRoutes);

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});