// import { ThemeProvider } from "@mui/material/styles";
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { prefixer } from "stylis";
// import { theme } from "@/components/ui/theme";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import "@/styles/globals.css";
import axios from "axios";
import { AuthProvider } from "@/context/AuthContext";

// const cacheRTL = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin],
// });

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default MyApp;
