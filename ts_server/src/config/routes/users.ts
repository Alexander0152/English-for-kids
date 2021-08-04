import express, { Request, Response } from "express";
var router = express.Router();

const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://alexander:7JxL83PMVNNf52r@cluster0.tcllk.mongodb.net/English-for-kids?retryWrites=true&w=majority"
);

const getAdmin = async () => {
  try {
    await client.connect();
    console.log("Database connected");
    // await client.db().createCollection("users");
    const users = client.db().collection("users");
    users.insertOne({ login: "admin", password: "admin" });
    const user = await users.findOne({ login: "admin" });
    // console.log(user);

    return user;
  } catch (e) {
    console.log(e);
  }
};
// getAdmin();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next) {
  res.send("respond with a resource");
});

/* POST check admin */
router.post("/", async function (req: Request, res: Response) {
  const login: string = req.body.login;
  const password: string = req.body.password;

  let adminLogin: string = "";
  let adminPassword: string = "";

  try {
    await client.connect();
    const users = client.db().collection("users");
    const user = await users.findOne({ login: "admin" });

    adminLogin = user.login;
    adminPassword = user.password;

    if (login === adminLogin && password === adminPassword) {
      res.json({
        isAdmin: true
      });
    } else {
      console.log(adminLogin);
      res.json({
        isAdmin: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
// mongodb+srv://alexander:<password>@cluster0.tcllk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
