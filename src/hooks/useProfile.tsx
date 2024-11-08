import { useState, useEffect } from "react";

export const UseProfile = () => {
    const [userData, setUserData] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
      const handlar = () => {
        setNotification(false);
      };
  

      document.addEventListener("mousedown", handlar);
    }, []);

    const userHandler = () => {
      setUserData(!userData);
    };

    return {
        userData,
        notification,
        userHandler,
        setNotification,
        authenticated, 
        setAuthenticated
    }
}