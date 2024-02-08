const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const helmet = require('helmet');



const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
      styleSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
      imgSrc: ["*", "data:"],
    },
  })
);

app.use("/api", authRoutes);
app.use("/api", noteRoutes);

app.get("/", (req, res) => {
  res.send("hello from server")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
