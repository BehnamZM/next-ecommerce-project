import Button from "@/components/ui/button/Button";
import CircleHeader from "@/components/ui/circleHeader/CircleHeader";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import Swal from "sweetalert2";
import styles from "./Signin.module.css";

const SigninPage = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState("");
  const [loadingResend, setLoadingResend] = useState(false);
  const { login, checkOtp, resendOtp } = useContext(AuthContext);

  useEffect(() => {
    let time = "0:10";
    let interval = setInterval(() => {
      let countdown = time.split(":");
      let minutes = parseInt(countdown[0], 10);
      let seconds = parseInt(countdown[1], 10);
      --seconds;
      minutes = seconds < 0 ? --minutes : minutes;
      if (minutes < 0) {
        clearInterval(interval);
        setShow(true);
      }
      seconds = seconds < 0 ? 59 : seconds;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      time = minutes + ":" + seconds;
      setTimer(time);
    }, 1000);

    return () => {
      clearInterval(interval);
      setTimer("");
    };
  }, [loadingResend]);

  const submitPhoneHandler = async (e) => {
    e.preventDefault();
    const pattern = /^(\+98|0)?9\d{9}$/;
    if (phone.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: "شماره تماس الزامی است!",
      });
      return;
    }
    if (!pattern.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: "فرمت شماره تماس نامعتبر است!",
      });
      return;
    }

    await login(phone);
    setStep(2);
  };

  const submitOtpHandler = async (e) => {
    e.preventDefault();
    const pattern = /^[0-9]{6}$/;
    if (otp.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: " رمز ورود الزامی است!",
      });
      return;
    }
    if (!pattern.test(otp)) {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: "فرمت رمز ورود نامعتبر است!",
      });
      return;
    }
    await checkOtp(otp);
  };

  const resendOtpHandle = async () => {
    setLoadingResend(true);
    await resendOtp();
    setLoadingResend(false);
    setShow(false);
  };

  return (
    <>
      <div className={styles.signin_container}>
        <div className="container">
          <div className={styles.signin_inner}>
            {step === 1 && (
              <form
                className={styles.signin_form}
                onSubmit={submitPhoneHandler}
              >
                <input
                  className="styled_input"
                  type="text"
                  placeholder="شماره تماس را وارد کنید"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <Button bgColor="red" type="submit">
                  ارسال پیامک
                </Button>
              </form>
            )}
            {step === 2 && (
              <div className={styles.signin_form}>
                <input
                  className="styled_input"
                  type="text"
                  placeholder="کد ورود را وارد کنید"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
                <div className={styles.buttons}>
                  <div onClick={submitOtpHandler}>
                    <Button bgColor="#ffe205" type="button" disabled={loading}>
                      {loading && <LoadingButton />}
                      ارسال کد
                    </Button>
                  </div>

                  {!show ? (
                    <div style={{ color: "#fff" }}>{timer}</div>
                  ) : (
                    <div onClick={resendOtpHandle}>
                      <Button
                        bgColor="red"
                        type="button"
                        disabled={loadingResend}
                      >
                        ارسال مجدد
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            <CircleHeader bgColor="white" icon={<IoIosLogIn />} top="-35%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
