const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());


app.listen(8191,()=>{
    console.log("Listining on port 8191")
})