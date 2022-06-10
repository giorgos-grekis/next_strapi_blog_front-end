import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    chechUserLoggedIn();
  }, []);

  console.log("user: ", user);

  // Register user
  const register = async (user) => {
    console.log('user: ', user);
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data?.user);
      router.push("/account/dashboard");
    } else {
      setError(data?.message);
      // setError(null)
      // setTimeout(()=>{
      //   setError(null)
      // }, [5000])
    }
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

    const data = await res.json();

    if (res.ok) {
      setUser(data?.user);
      router.push("/account/dashboard");
    } else {
      setError(data?.message);
      // setError(null)
      // setTimeout(()=>{
      //   setError(null)
      // }, [5000])
    }
  };

  // Logout user
  const logout = async () => {
    console.log("mphke sto logout");
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "GET",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in
  const chechUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);

    const data = await res.json();

    if (res.ok) {
      setUser(data?.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
