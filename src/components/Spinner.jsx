import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles["spinner-overlay"]}>
      <div className={styles["spinner-container"]}></div>
    </div>
  );
};

export default Spinner;