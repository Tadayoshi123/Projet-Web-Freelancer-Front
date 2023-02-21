import React from 'react';
import styles from "./index.module.scss";

const Index = ({children}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left__part}>
        {children}
      </div>
      <div className={styles.right__part}></div>
    </div>
  );
}

export default Index;
