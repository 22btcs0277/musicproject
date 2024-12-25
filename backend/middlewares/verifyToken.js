const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg2MDg2MDAwLCJleHAiOjE2ODYwODYwODB9.Vo8oSyCLXY-QcDZ03i9x0_h7y2msmcQLv9JHn-1KuqY');
    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message+"internal erroro" });
  }
};


 