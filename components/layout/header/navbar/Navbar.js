import Image from "next/image";
import styles from "./Navbar.module.css";
import logoImg from "@/public/images/logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className={styles.navbar}>
        <ul className={styles.list_items}>
          <Link href="/">خانه</Link>
          <Link href="/menu">منو</Link>
          <Link href="/">تماس با ما</Link>
        </ul>
        <ul className={styles.list_items}>
          <Link href="/">ارتباط با ما</Link>
          <Link href="/auth/signup">عضویت</Link>
          <Link href="/auth/signin">ورود</Link>
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
