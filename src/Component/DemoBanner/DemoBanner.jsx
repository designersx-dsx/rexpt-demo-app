import React from "react";
import styles from "./DemoBanner.module.css";

const DemoBanner = ({ name }) => {
  return (
    <>
      <div className={styles.banner}>
        This is demo installation – <b>{name}</b>
      </div>
      <div className={styles.content}>
        {/* yahan tumhara app ka main content render hoga */}
      </div>
    </>
  );
};

export default DemoBanner;
