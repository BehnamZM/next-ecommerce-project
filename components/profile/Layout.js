import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import styles from "./Layout.module.css";
const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  return (
    <div className={styles.profile_container}>
      <div className="container">
        <div className={styles.profile_inner}>
          <div className={styles.profile_sidebar}>
            <ul className={styles.profile_list}>
              <Link className={styles.profile_list_item} href="/profile">
                اطلاعات کاربر
              </Link>
              <Link
                className={styles.profile_list_item}
                href="/profile/addresses"
              >
                آدرس ها
              </Link>
              <Link className={styles.profile_list_item} href="/profile/orders">
                سفارشات
              </Link>
              <Link
                className={styles.profile_list_item}
                href="/profile/transactions"
              >
                تراکنشها
              </Link>
              <li className={styles.profile_list_item} onClick={logout}>
                خروج
              </li>
            </ul>
          </div>
          <div className={styles.profile_main_part}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
