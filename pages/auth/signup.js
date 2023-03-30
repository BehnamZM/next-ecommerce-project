import Button from "@/components/ui/button/Button";
import CircleHeader from "@/components/ui/circleHeader/CircleHeader";
import Input from "@/components/ui/input/Input";
import { useState } from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import Swal from "sweetalert2";
import styles from "./Signup.module.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (
      (name.trim() !== "",
      email.trim() !== "",
      subject.trim() !== "",
      text.trim() !== "")
    ) {
      try {
        setLoading(true);
        await axios.post("/contact-us", { name, email, subject, text });
        Swal.fire({
          icon: "success",
          title: "خیلیم خوب",
          text: "پیام شما با موفقیت ارسال شد :)",
        });
        setName("");
        setEmail("");
        setSubject("");
        setText("");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "ای بابا",
          text: err,
        });
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: "تمام فیلدها رو پر کنید!",
      });
      return;
    }
  };
  return (
    <>
      <div className={styles.signup_container}>
        <div className="container">
          <div className={styles.signup_inner}>
            <form className={styles.signup_form} onSubmit={submitFormHandler}>
              <Input
                type="text"
                placeholder="نام شما"
                tagName="input"
                setValue={setName}
                value={name}
              />
              <Input
                type="email"
                placeholder="ایمیل شما"
                tagName="input"
                setValue={setEmail}
                value={email}
              />
              <Input
                type="text"
                placeholder="موضوع پیام"
                tagName="input"
                setValue={setSubject}
                value={subject}
              />
              <Input
                placeholder="پیام شما"
                tagName="texterea"
                setValue={setText}
                value={text}
              />
              <Button bgColor="red" type="submit">
                ارسال پیام
              </Button>
            </form>
            <CircleHeader
              bgColor="white"
              icon={<SiGnuprivacyguard />}
              top="-12%"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
