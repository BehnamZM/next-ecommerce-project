import Image from "next/image";
import styles from "./Product.module.css";
// import cardImg from "@/public/images/b1.jpg";
import { BiCartAlt } from "react-icons/bi";
import { numberFormat } from "lib/helper";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { addToCart, removeFromCart } from "@/redux/cart/cartActions";

const Product = ({ productInfos }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(removeFromCart(productInfos.id));
    dispatch(addToCart(productInfos, 1));
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_inner}>
        <Link href={`/products/${productInfos.slug}`}>
          <Image
            src={productInfos.primary_image}
            placeholder="blur"
            alt="card-img"
            className={styles.product_img}
            blurDataURL={productInfos.primary_image_blurDataURL}
            width={300}
            height={200}
          />
        </Link>
        <div className={styles.product_infos}>
          <Link href={`/products/${productInfos.slug}`}>
            <div className={styles.product_name}>{productInfos.name}</div>
          </Link>
          <div className={styles.product_price}>
            <span>{numberFormat(productInfos.price)}</span>{" "}
            <span className={styles.toman}>تومان</span>
          </div>
        </div>
        <div className={styles.add_to_cart_btn} onClick={addToCartHandler}>
          <BiCartAlt />
        </div>
      </div>
    </div>
  );
};

export default Product;
