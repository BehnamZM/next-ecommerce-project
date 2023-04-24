import Button from "@/components/ui/button/Button";
import axios from "axios";
import { handleError, numberFormat } from "lib/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./ProductSlug.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation } from "swiper";
import Product from "@/components/product/Product";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cart/cartActions";

const ProductPage = ({ productInfos, error, randomProducts }) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    error &&
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: error,
      });
  }, [error]);

  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(removeFromCart(productInfos.id));
    dispatch(addToCart(productInfos, quantity));
  };
  return (
    <div className={styles.product_page_container}>
      <div className="container">
        <div className={styles.product_page_inner}>
          <div className={styles.product_page_infos_layout}>
            <div className={styles.product_image}>
              <Swiper
                style={{ width: "500px", height: "300px" }}
                spaceBetween={30}
                effect={"fade"}
                navigation={true}
                modules={[EffectFade, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image
                    src={productInfos.primary_image}
                    alt={productInfos.slug}
                    width={500}
                    height={300}
                    priority={true}
                    placeholder="blur"
                    blurDataURL={productInfos.primary_image_blurDataURL}
                  />
                </SwiperSlide>
                {productInfos.images.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Image
                      src={item.image}
                      alt="product-image"
                      width={500}
                      height={300}
                      placeholder="blur"
                      blurDataURL={productInfos.primary_image_blurDataURL}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.product_page_infos}>
              <h3>{productInfos.name}</h3>

              <div className={styles.product_price_infos}>
                {productInfos.is_sale ? (
                  <>
                    <div className={styles.product_price}>
                      <span>{numberFormat(productInfos.sale_price)}</span>{" "}
                      <span className={styles.toman}>تومان</span>
                    </div>
                    <del className={styles.product_price}>
                      <span>{numberFormat(productInfos.price)}</span>{" "}
                      <span className={styles.toman}>تومان</span>
                    </del>
                  </>
                ) : (
                  <div className={styles.product_price}>
                    <span>{numberFormat(productInfos.price)}</span>{" "}
                    <span className={styles.toman}>تومان</span>
                  </div>
                )}
              </div>

              <p>{productInfos.description}</p>
              <div className={styles.product_cart_control}>
                <div onClick={addToCartHandler}>
                  <Button bgColor="#ffe205">افزودن به سبد خرید</Button>
                </div>
                <div className={styles.product_quantity_control}>
                  <span
                    onClick={() =>
                      quantity < productInfos.quantity &&
                      setQuantity((prevQty) => prevQty + 1)
                    }
                  >
                    +
                  </span>
                  <div className={styles.product_quantity}>{quantity}</div>
                  <span
                    onClick={() =>
                      quantity > 1 && setQuantity((prevQty) => prevQty - 1)
                    }
                  >
                    -
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h2 style={{ textAlign: "center", margin: "2rem 0" }}>
            محصولات تصادفی
          </h2>
          <div className={styles.similar_products}>
            {randomProducts.map((product) => (
              <Product key={product.id} productInfos={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps({ query }) {
  try {
    const res = await axios.get(`products/${encodeURI(query.slug)}`);
    const randomRes = await axios.get("random-products?count=4");

    return {
      props: {
        productInfos: res.data.data,
        randomProducts: randomRes.data.data,
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
}
