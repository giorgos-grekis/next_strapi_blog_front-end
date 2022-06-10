import React from 'react'
import Link from 'next/link';
import Search from '@components/Search'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href='/'>
                <a>
                    DJ events
                </a>
            </Link>
        </div>

        <Search />

        <nav>
            <ul>
                {/* all events */}
                <li>
                    <Link href='/events'>
                        <a>Events</a>
                    </Link>
                </li>

                {/* add event */}
                <li>
                    <Link href='/events/add'>
                        <a>Add Event</a>
                    </Link>
                </li>

                {/* login */}
                <li>
                    <Link href='/account/login'>
                        <a className='btn-secondary btn-icon'>
                            <FaSignInAlt />
                            Login
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>

    </header>
  )
}

export default Header