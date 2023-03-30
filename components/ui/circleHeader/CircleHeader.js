import styles from "./CircleHeader.module.css";

const CircleHeader = ({ icon, bgColor, top }) => {
  return (
    <div
      className={styles.header_icon}
      style={{ backgroundColor: bgColor, top }}
    >
      {icon}
    </div>
  );
};

export default CircleHeader;
