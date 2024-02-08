const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
