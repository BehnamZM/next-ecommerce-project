import Button from "@/components/ui/button/Button";
import CircleHeader from "@/components/ui/circleHeader/CircleHeader";
import Input from "@/components/ui/input/Input";
import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import Swal from "sweetalert2";
import styles from "./Signin.module.css";

const SigninPage = () => {
  const [phone, setPhone] = useState("");
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const submitPhoneHandler = async (e) => {
    e.preventDefault();
    const pattern = /^(\+98|0)?9\d{9}$/;
    if (!pattern.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: "فرمت شماره تماس نامعتبر است!",
      });
      return;
    }
    login();
    // if (phone.trim() !== "") {
    //   try {
    //     setLoading(true);
    //     await axios.post("/auth/login", { phone });
    //     Swal.fire({
    //       icon: "success",
    //       title: "خیلیم خوب",
    //       text: "پیام شما با موفقیت ارسال شد :)",
    //     });
    //     setPhone("");
    //   } catch (err) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "ای بابا",
    //       text: err,
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "ای بابا",
    //     text: "تمام فیلدها رو پر کنید!",
    //   });
    //   return;
    // }
  };
  return (
    <>
      <div className={styles.signin_container}>
        <div className="container">
          <div className={styles.signin_inner}>
            <form className={styles.signin_form} onSubmit={submitPhoneHandler}>
              <Input
                type="text"
                placeholder="شماره تماس را وارد کنید"
                tagName="input"
                setValue={setPhone}
                value={phone}
              />
              <Button bgColor="red" type="submit">
                ارسال پیامک
              </Button>
            </form>
            <CircleHeader bgColor="white" icon={<IoIosLogIn />} top="-35%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
