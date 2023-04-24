import Button from "@/components/ui/button/Button";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import StyledLoading from "@/components/ui/styledLoading/StyledLoading";
import {
  clearCart,
  decrement,
  increment,
  removeFromCart,
} from "@/redux/cart/cartActions";
import axios from "axios";
import { handleError, numberFormat } from "lib/helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import useSWR from "swr";
import styles from "./Cart.module.css";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [couponInput, setCouponInput] = useState({ code: null, percent: 0 });
  const [addressId, setAddressId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const state = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const router = useRouter();

  // get addresses
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/addresses`
  );

  if (error) {
    Swal.fire({
      icon: "error",
      title: "متاسفیم",
      text: handleError(error),
    });
  }

  useEffect(() => {
    setCart(state.cart);
  }, [state]);

  if (!cart || !data) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <StyledLoading />
      </div>
    );
  }

  // apply coupons
  const applyCouponHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/checkCoupon`,
        { code: couponInput.code }
      );
      Swal.fire({
        icon: "success",
        title: "تبریک",
        text: "کد تخفیف با موفقیت اعمال شد:)",
      });
      setCouponInput({ ...couponInput, percent: res.data.percentage });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "متاسفیم",
        text: handleError(err),
      });
    } finally {
      setLoading(false);
    }
  };

  // payment function
  const paymentHandler = async () => {
    if (addressId === "") {
      Swal.fire({
        icon: "error",
        title: "متاسفیم",
        text: "یک آدرس انتخاب کنید!",
      });
      return;
    }
    try {
      setLoadingPayment(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/paymentSend`,
        {
          cart,
          coupon: couponInput.code,
          address_id: addressId,
        }
      );

      router.push(res.data.url);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "متاسفیم",
        text: handleError(err),
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <>
      {cart.length ? (
        <div className={styles.cart_container}>
          <div className="container">
            <div className={styles.cart_inner}>
              <div className={styles.cart_items}>
                <table>
                  <thead>
                    <tr>
                      <th>شناسه</th>
                      <th>تصویر</th>
                      <th>نام محصول</th>
                      <th>تعداد</th>
                      <th>قیمت</th>
                      <th>قیمت کل</th>
                      <th>حذف محصول</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <Image
                            alt="product-image"
                            src={item.primary_image}
                            width={110}
                            height={70}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <div className={styles.product_quantity_control}>
                            <span
                              onClick={() =>
                                item.qty < item.quantity &&
                                dispatch(increment(item.id))
                              }
                            >
                              +
                            </span>
                            <div className={styles.product_quantity}>
                              {item.qty}
                            </div>
                            <span
                              onClick={() =>
                                item.qty > 1 && dispatch(decrement(item.id))
                              }
                            >
                              -
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            {item.is_sale ? (
                              <>
                                <span>{numberFormat(item.sale_price)}</span>
                                <del>{numberFormat(item.price)}</del>
                              </>
                            ) : (
                              <span>{numberFormat(item.price)}</span>
                            )}
                            <span className="toman">تومان</span>
                          </div>
                          {item.is_sale && (
                            <div style={{ color: "red" }}>
                              {salePercent(item.price, item.sale_price)}% تخفیف
                            </div>
                          )}
                        </td>
                        <td>
                          {item.is_sale ? (
                            <span>
                              {numberFormat(item.sale_price * item.qty)}
                            </span>
                          ) : (
                            <span>{numberFormat(item.price * item.qty)}</span>
                          )}
                          <span className="toman">تومان</span>
                        </td>

                        <td>
                          <button
                            className={styles.delete_button}
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div onClick={() => dispatch(clearCart())}>
                  <Button bgColor="red">خالی کردن سبد خرید</Button>
                </div>
              </div>
              <div className={styles.select_address}>
                {data ? (
                  <select
                    className="styled_input"
                    defaultValue=""
                    style={{ width: "100%" }}
                    onChange={(e) => setAddressId(e.target.value)}
                  >
                    <option value="" disabled>
                      انتخاب آدرس
                    </option>
                    {data.map((address) => (
                      <option value={address.id} key={address.id}>
                        {address.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <link href="/profile/addresses">
                    <Button bgColor="blue">ایجاد آدرس جدید</Button>
                  </link>
                )}
              </div>
              <div className={styles.apply_coupon}>
                <input
                  type="text"
                  placeholder="کد تخفیف را وارد کنید"
                  className={styles.coupon_input}
                  onChange={(e) =>
                    setCouponInput({ ...couponInput, code: e.target.value })
                  }
                  value={couponInput.code}
                />
                <button
                  className={styles.apply_coupon_btn}
                  onClick={() => couponInput !== "" && applyCouponHandler()}
                >
                  اعمال کد تخفیف
                  {loading && <LoadingButton />}
                </button>
              </div>
              <div className={styles.prices_part_layout}>
                <h3>مجموع قیمت ها</h3>
                <div className={styles.prices_part_inner}>
                  <div className={styles.prices_item}>
                    <h5>مجموع قیمت:</h5>
                    <div>
                      {numberFormat(
                        cart.reduce((total, product) => {
                          return product.is_sale
                            ? total + product.is_sale * product.qty
                            : total + product.price * product.qty;
                        }, 0)
                      )}{" "}
                      تومان
                    </div>
                  </div>
                  <div className={styles.prices_item}>
                    <h5 style={{ color: couponInput.percent !== 0 && "green" }}>
                      تخفیف: %{couponInput.percent}
                    </h5>
                    <div style={{ color: couponInput.percent !== 0 && "red" }}>
                      {numberFormat(
                        cart.reduce((total, product) => {
                          return product.is_sale
                            ? total + product.is_sale * product.qty
                            : total + product.price * product.qty;
                        }, 0) *
                          (couponInput.percent / 100)
                      )}{" "}
                      تومان
                    </div>
                  </div>
                  <div className={styles.prices_item}>
                    <h5>قیمت پرداختی:</h5>
                    <div>
                      {numberFormat(
                        cart.reduce((total, product) => {
                          return product.is_sale
                            ? total + product.sale_price * product.qty
                            : total + product.price * product.qty;
                        }, 0) -
                          cart.reduce((total, product) => {
                            return product.is_sale
                              ? total + product.sale_price * product.qty
                              : total + product.price * product.qty;
                          }, 0) *
                            (couponInput.percent / 100)
                      )}{" "}
                      تومان
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="styled_button"
                  style={{ backgroundColor: "#ffe205" }}
                  onClick={paymentHandler}
                >
                  پرداخت کنید
                  {loadingPayment && <LoadingButton />}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.no_cart_item}>
          <h5>سبد خرید خالی است</h5>

          <Link href="/menu">
            <Button bgColor="#ffe205">بازگشت به فروشگاه</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartPage;
