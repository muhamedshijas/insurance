import jwt from "jsonwebtoken";
import user from "../Utils/userData.js"; // import static user

// Login route
export async function login(req, res) {
  const { userId } = req.body;

  if (userId === user.id) {
    // create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res
      .cookie("usertoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ works on localhost too
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .json({ success: true, user });
  } else {
    return res.json({ success: false, message: "Invalid Credentials" });
  }
}

// Auth check route
export async function checkAuth(req, res) {
  const token = req.cookies.usertoken;
  if (!token) return res.json({ loggedIn: false });

  try {
    const verifiedJwt = jwt.verify(token, process.env.JWT_SECRET);

    // compare JWT id with our static user
    if (verifiedJwt.id !== user.id) {
      return res.json({ loggedIn: false });
    }

    return res.json({ loggedIn: true, user });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
}
