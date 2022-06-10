import { API_URL } from "@config/index";
import cookie from "cookie";

const login_api = async (req, res) => {
  if (req.method === "GET") {
    console.log("mphke sto logout api");

    // Destroy cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    res.staus(200).json({ message: "Success" });

    
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default login_api;
