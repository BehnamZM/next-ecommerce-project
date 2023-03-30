import Image from "next/image";
import styles from "./Product.module.css";
// import cardImg from "@/public/images/b1.jpg";
import { BiCartAlt } from "react-icons/bi";
import { numberFormat } from "lib/helper";

const Product = ({ productInfos }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_inner}>
        <Image
          src={productInfos.primary_image}
          placeholder="blur"
          alt="card-img"
          className={styles.product_img}
          blurDataURL={productInfos.primary_image_blurDataURL}
          width={300}
          height={200}
        />
        <div className={styles.product_infos}>
          <div className={styles.product_name}>{productInfos.name}</div>
          <div className={styles.product_price}>
            <span>{numberFormat(productInfos.price)}</span>{" "}
            <span className={styles.toman}>تومان</span>
          </div>
        </div>
        <div className={styles.add_to_cart_btn}>
          <BiCartAlt />
        </div>
      </div>
    </div>
  );
};

export default Product;
