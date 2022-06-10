import React from "react";
import Link from "next/link";
import Search from "@components/Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/Header.module.css";
import useAuth from "@hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          {/* all events */}
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>

          {user ? (
            // if logged in
            <>
              {/* add event */}
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>

              {/* add event */}
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>

              {/* logout */}
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt />
                  Log out
                </button>
              </li>
            </>
          ) : (
            // if logged out
            <>
              {/* login */}
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt />
                    Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
