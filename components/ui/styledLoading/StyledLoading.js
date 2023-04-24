import styles from "./StyledLoading.module.css";
import loading from "@/public/images/loading.gif";
import Image from "next/image";

const StyledLoading = () => {
  return (
    <div className={styles.loading_part}>
      <Image src={loading} alt="loading..." width={100} height={100} />
    </div>
  );
};

export default StyledLoading;
