import styles from "./Button.module.css";

const Button = ({ children, bgColor }) => {
  return (
    <button
      className={styles.styled_button}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
};

export default Button;
