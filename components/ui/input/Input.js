import styles from "./Input.module.css";

const Input = ({ tagName, placeholder, type, value, setValue }) => {
  return (
    <>
      {tagName === "input" ? (
        <input
          type={type}
          placeholder={placeholder}
          className={styles.styledInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <textarea
          cols="30"
          rows="10"
          placeholder={placeholder}
          className={styles.styledInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      )}
    </>
  );
};

export default Input;
