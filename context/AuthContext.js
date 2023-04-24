import axios from "axios";
import { handleError } from "lib/helper";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (phone) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,
        { cellphone: phone }
      );
      Swal.fire({
        icon: "success",
        title: "عالی شد",
        text: "رمز ورود برای شما ارسال شد",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: handleError(JSON.parse(JSON.stringify(err))),
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/logout`
      );

      setUser(null);
      router.push("/");
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const checkOtp = async (otp) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/checkOtp`,
        { otp }
      );
      Swal.fire({
        icon: "success",
        title: "عالی شد",
        text: "ورود با موفقیت انجام شد:)",
      });
      setUser(res.data.user);
      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: handleError(err),
      });
    } finally {
      setLoading(false);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/me`
      );
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/resendOtp`
      );
      Swal.fire({
        icon: "success",
        title: "ارسال مجدد",
        text: "رمز ورود دوباره برای شما ارسال شد",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "متاسفیم",
        text: handleError(err),
      });
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, checkOtp, user, resendOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
