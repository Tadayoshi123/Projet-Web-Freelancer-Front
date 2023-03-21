import styles from "./index.module.scss";

const Index = ({ product }) => {
  console.log(product, "props product")
  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail}>
        <img src={product.thumbnail} alt={product.name} />
      </div>
      <div className={styles.content}>
        <p>{product.name}</p>
        <p>{product.price} €</p>
      </div>
    </div>
  );
}

export default Index;
