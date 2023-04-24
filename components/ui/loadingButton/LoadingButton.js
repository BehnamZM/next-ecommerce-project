import styles from "./LoadingButton.module.css";
import loading from "@/public/images/loading2.gif";
import Image from "next/image";

const LoadingButton = () => {
  return <Image src={loading} alt="" width={20} height={20} />;
};

export default LoadingButton;
