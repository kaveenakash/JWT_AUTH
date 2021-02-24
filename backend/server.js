const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
let refreshTokens = [];
app.use(express.json());

app.post("/login", (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.status(404).json({
      message: "Body Empty",
    });
  }
  let accessToken = jwt.sign(user, "access", { expiresIn: "20s" });
  let refreshToken = jwt.sign(user, "refresh", { expiresIn: "7d" });
  refreshTokens.push(refreshToken);

  return res.status(200).json({
    accessToken,
    refreshToken,
  });
});

app.listen(3000);
