import Button from "../ui/button/Button";
import styles from "./Contact.module.css";
import { BiDish } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import CircleHeader from "../ui/circleHeader/CircleHeader";
import LoadingButton from "../ui/loadingButton/LoadingButton";

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
              <input
                className="styled_input"
                type="text"
                placeholder="نام شما"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                className="styled_input"
                type="email"
                placeholder="ایمیل شما"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                className="styled_input"
                type="text"
                placeholder="موضوع پیام"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
              <textarea
                className="styled_input"
                placeholder="پیام شما"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <Button bgColor="red" type="submit">
                ارسال پیام
                {loading && <LoadingButton />}
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
