import styles from "./index.module.scss";
import ArrowImage from "../../../../public/images/arrow.svg";

const Index = ({ image, title, text, handleClick, disabled }) => {
  return (
    <div
      className={styles.wrapper}
      onClick={handleClick}
      disabled={disabled ? true : false}
    >
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.arrow}>
        <img src={ArrowImage.src} alt="arrow" />
      </div>
    </div>
  );
};

export default Index;
