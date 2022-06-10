import { API_URL } from "@config/index";
import cookie from "cookie";

const login_api = async (req, res) => {
  if (req.method === "GET") {
    
    // chech if cookie exists 
    if(!req.headers.cookie) {
        // 403 forbidden
        res.status(403).json({message: 'Not Authorized'})
        return;
    }

    const {token} = cookie.parse(req.headers.cookie);

    

    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })

    const user = await strapiRes.json()

    if(strapiRes.ok){
        res.status(200).json({user})
    } else{
        res.status(403).json({message: 'User forbidden'})
    }

    // const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     identifier: identifier,
    //     password,
    //   }),
    // });

    // const data = await strapiRes.json();




     
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default login_api;
