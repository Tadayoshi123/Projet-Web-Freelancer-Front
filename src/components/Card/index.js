import styles from "./index.module.scss";

const Index = ({ children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Index;
