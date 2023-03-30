import { useRouter } from "next/router";
import styles from "./Header.module.css";
import Navbar from "./navbar/Navbar";
import Slider from "./slider/Slider";

const Header = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Navbar />
      {router.pathname === "/" && <Slider />}
    </header>
  );
};

export default Header;
