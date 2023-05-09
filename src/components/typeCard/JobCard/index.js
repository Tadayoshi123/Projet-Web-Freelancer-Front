import styles from "./index.module.scss";

const Index = ({ title}) => {
  return (
    <div className={styles.card}>
      <p>{title}</p>
    </div>
  );
}

export default Index;