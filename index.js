// const EventEmitter = require("events");
// import EventEmitter from "events";
import express from "express";
import path from "path";

import fs from "fs";
// const eventEmitter = new EventEmitter();

// eventEmitter.on("hehe", () => {
//   console.log("this is side event hehe");
// });
// // trigger or emit the event
// eventEmitter.emit("hehe");
const __dirname = path.resolve();
console.log(__dirname);
const app = express();
app.use(express.urlencoded());
const fn = __dirname + "/userList.csv";

const port = 8000;
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  const str = email + "|" + password + "\n";
  fs.readFile(fn, (error, data) => {
    if (error) {
      return res.send(error.message);
    }
    const users = data.toString();
    // to check if the user has already signed up
    users.includes(str)
      ? res.send("login sucessfully")
      : res.send("Invalid login");
  });
});

app.get("/registration", (req, res) => {
  console.log("registration", req.query);
  res.sendFile(__dirname + "/register.html");
});
app.post("/registration", (req, res) => {
  // destructuring the array of incoming info

  const { email, password } = req.body;

  const str = email + "|" + password + "\n";

  //   store in csv file
  fs.appendFile(fn, str, (error) => {
    error ? console.log("error") : console.log("data has been written in file");
  });

  res.send(` <h1>Thank you for registration</h1>`);
});

app.use("/", (req, res) => {
  // we do some serer exe

  res.send(`
  <a href="/registration">Registration</a>
        <a href="/login">Login</a><div class="registration">
        <h1>Samir</h1>
        <hr>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid asperiores officiis amet nobis quo debitis exercitationem ullam magnam recusandae harum consequuntur accusamus quos tempore dicta, fugiat nulla, ipsam voluptas sed?</p>
    </div>`);
});

app.listen(port, (error) => {
  error
    ? console.log("error")
    : console.log("your server is running at http://localhost:" + port);
});
