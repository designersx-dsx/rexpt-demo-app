import React, { useEffect, useState } from "react";
import styles from "./DemoBanner.module.css";
import { ArrowLeft } from "lucide-react";
import PopUp from "../Popup/Popup";

const DemoBanner = () => {
  const [loading, setLoading] = useState(false);
  const [popupType2, setPopupType2] = useState("");
    const [popupMessage2, setPopupMessage2] = useState();
    const [name,setName]=useState("")

const endSession = () => {
    setPopupType2("confirm");
    setPopupMessage2("Are you sure you want to end this demo session?");
//   if (window.confirm("Are you sure you want to end this demo session?")) {

//   }
};
console.log(popupType2,popupMessage2)

  const tempdemoSession = sessionStorage.getItem("demoSession") || "";
  const demoSession = tempdemoSession ? JSON.parse(tempdemoSession) : null;

  useEffect(()=>{
    setName(demoSession?.name ||"User")
  },[demoSession])

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
    {popupMessage2 && (
        <PopUp
        type={popupType2}
        message={popupMessage2}
        onClose={() => {
        setPopupMessage2("");
        setPopupType2("");
        }}
        onConfirm={() => {
         setLoading(true);
            sessionStorage.clear();
            localStorage.clear();

            setTimeout(() => {
              if(demoSession?.isUserType==1){
                window.location.href = "https://admin.rexpt.in/"; 
              }else if(demoSession?.isUserType==2 ||demoSession?.isUserType==3){
                 window.location.href = "https://partner.rxpt.us/"; 
              }
    
            window.close();
            }, 2000);
        }} />   )} 
      </div>

    
    </>
  );
};

export default DemoBanner;
