const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(bodyParser.json());




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});