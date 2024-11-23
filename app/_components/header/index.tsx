import React from "react";
import logo from "./images/logo.png";
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";

const Header = () => (
  <header>
    <div className="container">
      <Link href="/" className={styles.logoContainer}>
        <Image src={logo} alt="Backbencher.dev" className={styles.logo} />
        {
          //<span className={styles.logoText}>Backbencher.dev</span>
        }
      </Link>
    </div>
  </header>
);

export default Header;
