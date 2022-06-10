import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@components/Layout";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "@styles/AuthForm.module.css";
import useAuth from "@hooks/useAuth";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useAuth();


  useEffect(()=> {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    register({username, email, password });

    if (password !== passwordConfirm) {
      toast.error("Passwods do not match");
      return;
    }
    // console.log(username, email, password);
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>

        <form onSubmit={handleSubmit}>
          {/* username */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* email */}
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          {/* submit */}

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account?{" "}
          <Link href="/account/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
