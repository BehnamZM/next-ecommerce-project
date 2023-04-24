import axios from "axios";
import { handleError } from "lib/helper";
import styles from "./Verify.module.css";
import { BsBagCheck } from "react-icons/bs";
import { TbFaceIdError } from "react-icons/tb";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cart/cartActions";

const PaymentVerifyPage = ({ payment, error }) => {
  const dispatch = useDispatch();
  if (error) {
    return <div>{error}</div>;
  }

  if (payment.status) {
    dispatch(clearCart());
  }
  return (
    <div className={styles.verify_layout}>
      <div className={styles.verify_inner}>
        <div className={styles.payment_infos}>
          {payment.status ? (
            <div style={{ color: "green", fontSize: "50px" }}>
              <BsBagCheck />
            </div>
          ) : (
            <div
              style={{
                color: "red",
                fontSize: "70px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TbFaceIdError />
            </div>
          )}
          {payment.status ? (
            <div style={{ color: "green" }}>تراکنش با موفقیت انجام شد:)</div>
          ) : (
            <h3 style={{ color: "red" }}>{payment.error}</h3>
          )}
        </div>
        {payment.status && (
          <div className={styles.transId}>شماره تراکنش: {payment.transId}</div>
        )}
        <div className={styles.verify_btns}>
          {payment.status ? (
            <Link href="/profile/orders">
              <button style={{ backgroundColor: "#ffe205" }}>
                مشاهده سفارش
              </button>
            </Link>
          ) : (
            <Link href="/cart">
              <button style={{ backgroundColor: "#ffe205" }}>
                مشاهده سبد خرید
              </button>
            </Link>
          )}
          <Link href="/">
            <button style={{ backgroundColor: "#000", color: "white" }}>
              بازگشت به خانه
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerifyPage;

export async function getServerSideProps({ query }) {
  try {
    const res = await axios.post("payment/verify", {
      token: query.token,
      status: query.status,
    });
    return {
      props: {
        payment: res.data.data,
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
