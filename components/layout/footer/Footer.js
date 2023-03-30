import styles from "./Footer.module.css";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <div className={styles.footer_social_media}>
          <div>
            <AiFillInstagram />
          </div>
          <div>
            <AiFillYoutube />
          </div>
          <div>
            <AiFillTwitterCircle />
          </div>
          <div>
            <AiFillFacebook />
          </div>
        </div>
        <div className={styles.copy_right}>
          تمام حقوق این وبسایت متعلق به آقای بهنام زارع مولایی است.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
