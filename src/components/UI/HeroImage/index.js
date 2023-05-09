import styles from "./index.module.scss";

const Index = ({title, text, image}) => {
    return (
        <div className={styles.content}>
            <img src={image} alt="hero"/>
            <h1>{title}</h1>
            <h2>{text}</h2>
        </div>
    );
}

export default Index;
