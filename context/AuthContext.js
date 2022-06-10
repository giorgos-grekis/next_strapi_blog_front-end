import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  console.log('user: ', user);
  console.log('error: ', error);

  // Register user
  const register = async (user) => {
    console.log(user);
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    // console.log({ identifier, password });
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: identifier,
        password,
      }),
    });

    const data = await res.json()

    console.log('data: ', data?.message)

    if(res.ok){
      setUser(data?.user)
    } else{
      console.log('mpkhe sto else')
      setError(data?.message)
      // setError(null)
      // setTimeout(()=>{
      //   setError(null)
      // }, [5000])
    }

  };

  // Logout user
  const logout = async () => {
    console.log("Logout");
  };

  // Check if user is logged in
  const chechUserLoggedIn = async () => {
    console.log("Check");
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
