import Tabmenu from "@/components/tabmenu/Tabmenu";
import { handleError } from "lib/helper";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Contact from "@/components/contact/Contact";

// import styles from "../styles/Home.module.css";

function Home({ productsTab, error }) {
  useEffect(() => {
    error &&
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: error,
      });
  }, [error]);
  return (
    <div>
      {productsTab && <Tabmenu tabs={productsTab} />}
      <Contact />
    </div>
  );
}

export default Home;

export async function getServerSideProps() {
  try {
    const res = await axios.get("/products/products-tabs");
    return {
      props: {
        productsTab: res.data.data,
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(JSON.parse(JSON.stringify(err))),
      },
    };
  }
}
