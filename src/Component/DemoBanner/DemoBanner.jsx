import React, { useState } from "react";
import styles from "./DemoBanner.module.css";
import { ArrowLeft } from "lucide-react";

const DemoBanner = ({ name }) => {
  const [loading, setLoading] = useState(false);

const endSession = () => {
  if (window.confirm("Are you sure you want to end this demo session?")) {
    setLoading(true);
    sessionStorage.clear();
    localStorage.clear();

    setTimeout(() => {
      // Try to close tab if it was script-opened
      window.open("https://admin.rexpt.in/", "_self"); // fallback redirect
      window.close();
    }, 2000);
  }
};

  return (
    <>
      <div className={styles.banner}>
        <button className={styles.backButton} onClick={endSession} disabled={loading}>
          <ArrowLeft size={16} />
          <span>{loading ? "Exiting..." : "Exit Demo"}</span>
        </button>

        <div className={styles.bannerText}>
          This is demo installation – <b>{name}</b>
        </div>
      </div>

      <div className={styles.content}>
        {/* yahan tumhara app ka main content render hoga */}
      </div>
    </>
  );
};

export default DemoBanner;
