const jwt = require("jsonwebtoken");

const generateRefreshToken = (user) =>
  jwt.sign(user,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg2MDg2MDAwLCJleHAiOjE2ODYwODYwODB9.Vo8oSyCLXY-QcDZ03i9x0_h7y2msmcQLv9JHn-1KuqY",
     { expiresIn: "1d" });

module.exports = { generateRefreshToken };