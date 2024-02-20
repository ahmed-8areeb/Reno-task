import styles from './Error.module.css'

function Error({ children }) {
  return (
    <p className={styles.error}>
      {children}
    </p>
  );
}

export default Error;
