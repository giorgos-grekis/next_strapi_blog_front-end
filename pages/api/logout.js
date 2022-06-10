import { API_URL } from "@config/index";
import cookie from "cookie";

const login_api = async (req, res) => {
  if (req.method === "GET") {

    console.log('mphke sto logout api')


    // Destroy cookie
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0), 
          sameSite: "strict",
          path: "/",
        })
      );

      res.staus(200).json({message: "Success"})
    
    // // chech if cookie exists 
    // if(!req.headers.cookie) {
    //     // 403 forbidden
    //     res.status(403).json({message: 'Not Authorized'})
    //     return;
    // }

    // const {token} = cookie.parse(req.headers.cookie);

    

    // const strapiRes = await fetch(`${API_URL}/api/users/me`, {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${token}` 
    //     }
    // })

    // const user = await strapiRes.json()

    // if(strapiRes.ok){
    //     res.status(200).json({user})
    // } else{
    //     res.status(403).json({message: 'User forbidden'})
    // }



     
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default login_api;
