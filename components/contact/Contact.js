import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import styles from "./Contact.module.css";
import { BiDish } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import CircleHeader from "../ui/circleHeader/CircleHeader";

const Map = dynamic(() => import("@/components/contact/Map"), { ssr: false });

const Contact = () => {
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
      <div className={styles.contact_container}>
        <div className="container">
          <div className={styles.contact_inner}>
            <form className={styles.contact_form} onSubmit={submitFormHandler}>
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
            <Map />
          </div>
        </div>
        <CircleHeader icon={<BiDish />} bgColor="#ffe205" top="-12%" />
      </div>
    </>
  );
};

export default Contact;
