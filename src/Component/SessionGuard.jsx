import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SessionGuard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // checking | valid | invalid

  useEffect(() => {
    const validateSession = async () => {

      // 1️⃣ Try sessionStorage first
      let encryptedPayload = sessionStorage.getItem("encryptedPayload");
      let signature = sessionStorage.getItem("signature");


      // 2️⃣ Check URL params
      const searchParams = new URLSearchParams(location.search);
      const urlPayload = searchParams.get("sessionId");
      const urlSignature = searchParams.get("signature");


      if (urlPayload && urlSignature) {
        encryptedPayload = urlPayload;
        signature = urlSignature;

        // Save in sessionStorage
        sessionStorage.setItem("encryptedPayload", encryptedPayload);
        sessionStorage.setItem("signature", signature);


        // Remove params from URL
        searchParams.delete("sessionId");
        searchParams.delete("signature");
        const newUrl =
          location.pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : "");
        navigate(newUrl, { replace: true });

      }

      if (!encryptedPayload || !signature) {
        console.log("SessionGuard: No session info found");
        setStatus("invalid");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/demoApp/validate-demoSession`,
          {
            params: { encryptedPayload, signature },
          }
        );

        console.log("SessionGuard: Backend response", res.data);
        
        if (res?.data?.valid) {
          setStatus("valid");
          const sessionData = res.data;
          sessionStorage.setItem("demoSession", JSON.stringify(sessionData));
          console.log("SessionGuard: Session valid ✅");
        } else {
          setStatus("invalid");
          console.log("SessionGuard: Session invalid ❌");
        }
      } catch (err) {
        console.error("SessionGuard: Session validation failed", err);
        sessionStorage.removeItem("encryptedPayload");
        sessionStorage.removeItem("signature");
        setStatus("invalid");
      }
    };

    validateSession();
  }, []); // only initial mount

  if (status === "checking") {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        Checking session...
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#f8f8f8",
        }}
      >
        <h2>⛔ Demo access denied</h2>
        <p>Your demo session is invalid or expired.</p>
      </div>
    );
  }

  return children; // valid session
};

export default SessionGuard;
