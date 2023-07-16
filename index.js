

const express = require("express");
const cors = require("cors");
require("./db/config");
const Login = require("./db/Login");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
res.send("Api is there")
})



app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await Login.findOne(req.body);
    if (user) {
      res.send({
        userEmail :user.email,
        message: "Api run successfully",
        status_code: 200,
      });
    } else {
      res.send({
        message: "No user found",

        status_code: 300,
      });
    }
  } else {
    res.send({ message: "Something went wrong", status_code: 400 });
  }
});

app.listen(5000, () => {
  console.log("server started at 5000");
});
