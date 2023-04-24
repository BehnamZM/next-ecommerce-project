import Image from "next/image";
import styles from "./Navbar.module.css";
import logoImg from "@/public/images/logo.png";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className={styles.navbar}>
        <ul className={styles.list_items}>
          <Link href="/">خانه</Link>
        </ul>
        <ul className={styles.list_items}>
          <Link href="/menu">منو</Link>
          {user ? (
            <Link href="/profile">
              <div className={styles.user_name}>{user.name.slice(0, 1)}</div>
            </Link>
          ) : (
            <Link href="/auth/signin">ورود</Link>
          )}
        </ul>
        <div className={styles.logo_part}>
          <div className={styles.logo_inner}>
            <Image src={logoImg} alt="logo-img" className={styles.logo_img} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
