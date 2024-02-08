const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error occurred during authentication:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticateUser;
