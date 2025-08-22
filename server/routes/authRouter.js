export async function login(req, res) {
  const { userId } = req.body;
  if (userId == "admin1234") {
    console.log("success");
    return res.json({ success: true, message: "Loggin successfull" });
  } else {
    return res.json({ success: false, message: "Invalid Credentials" }); 
  }
}
