import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@components/Layout";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "@styles/AuthForm.module.css";
import useAuth from "@hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, error } = useAuth();

  useEffect(() => {
    error && toast.error(error)
  },[error])

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password});
  }

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>

        <form onSubmit={handleSubmit}>
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

          {/* submit */}

          <input type='submit' value='Login' className='btn'/>
        </form>

        <p>
            Don't have an account? <Link href="/account/register">
            <a>
                Register
            </a>
            </Link>
        </p>
      </div>
    </Layout>
  );
};


