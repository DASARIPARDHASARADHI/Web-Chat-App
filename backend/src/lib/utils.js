import jwt from "jsonwebtoken";

//Token expires in 7 days
//If expired, user have to signin again
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Specifying 7 days in milli secs
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", //CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
