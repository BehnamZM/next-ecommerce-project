import { useRouter } from "next/router";
import styles from "./Header.module.css";
import Navbar from "./navbar/Navbar";
import Slider from "./slider/Slider";
import { BiCartAlt } from "react-icons/bi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const [cart, setCart] = useState([]);

  const state = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    setCart(state.cart);
  }, [state]);
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Navbar />
      <Link href="/cart">
        <div className={styles.cart_icon}>
          <BiCartAlt />
          <div className={styles.cart_counter}>{cart.length}</div>
        </div>
      </Link>
      {router.pathname === "/" && <Slider />}
    </header>
  );
};

export default Header;
