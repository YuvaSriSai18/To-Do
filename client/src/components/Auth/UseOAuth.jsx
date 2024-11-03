import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUserData, clearUserData } from "../../reducers/auth/authSlice";

// Custom hook for handling OAuth authorization code
function useOAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      // Exchange authorization code for token
      fetch("http://localhost:5530/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("User token:", data.token);
          localStorage.setItem("accessToken", data.token);

          // Decode token and dispatch user data to Redux
          const userData = jwtDecode(data.token);
          dispatch(setUserData(userData));
        })
        .catch((error) => console.error("Error exchanging auth code:", error))
        .finally(() => {
          // Remove authCode from the URL after handling
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState(null, "", newUrl);
        });
    }
  }, [dispatch]);
}

export default useOAuth;
