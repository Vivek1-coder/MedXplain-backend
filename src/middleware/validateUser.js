import jwt from "jsonwebtoken";
function verifyToken(token) {
  if (!token) {
    const err = new Error("No token provided");
    err.status = 401;
    throw err;
  }
  try {
    // throws if invalid or expired
    return jwt.verify(token, "broisgay");
  } catch (e) {
    const err = new Error("Invalid or expired token");
    err.status = 401;
    throw err;
  }
}
export const validateUser = (req, res, next) => {
  const { cookie } = req.headers;
  // console.log(cookie);
  // console.log(request);
  if (!cookie) {
    res.status(401).json({ error: "No Cookie" });
    return;
  }
  try {
    console.log("hello");
    req.decoded = verifyToken(cookie);
    console.log("hello2");
    next();
  } catch (err) {
    console.log("hello3");
    res.status(401).json({ error: "Token Expired" });
    return;
  }
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).json({ error: "Email and password are required" });
  //   return;
  // }
  // next();
};
