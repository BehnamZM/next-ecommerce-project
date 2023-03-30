import Input from "@/components/ui/input/Input";
import styles from "./Menu.module.css";
import { RiSearch2Line } from "react-icons/ri";
import Product from "@/components/product/Product";
import axios from "axios";
import { handleError } from "lib/helper";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Menu = ({ categories, error, products }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    error &&
      Swal.fire({
        icon: "error",
        title: "ای بابا",
        text: error,
      });
  }, [error]);

  const ShowProductsHandle = async (value) => {
    let query = { ...router.query, ...value };

    if (!value.hasOwnProperty("page")) {
      delete query.page;
    }
    try {
      setLoading(true);
      const newProducts = await axios.get(
        `/menu?${new URLSearchParams(query).toString()}`
      );
      setFilteredProducts(newProducts.data.data);
      router.push(`/menu?${new URLSearchParams(query).toString()}`, undefined, {
        shallow: true,
      });
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

  return (
    <>
      <div className={styles.menu_container}>
        <div className="container">
          <div className={styles.menu_inner}>
            <div className={styles.menu_sidebar}>
              <div className={styles.filter_items}>
                <div className={styles.searchbox}>
                  <input
                    type="text"
                    placeholder="سرچ کنید"
                    className={styles.searchbox_input}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                  />
                  <button
                    className={styles.search_btn}
                    onClick={() =>
                      searchInput !== "" &&
                      ShowProductsHandle({ search: searchInput })
                    }
                  >
                    <RiSearch2Line />
                  </button>
                </div>
                <ul className={styles.categories}>
                  <h5>دسته بندی ها:</h5>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={
                        router.query.hasOwnProperty("category") &&
                        router.query.category == category.id
                          ? `${styles.category_item} active`
                          : `${styles.category_item}`
                      }
                      onClick={() =>
                        ShowProductsHandle({ category: category.id })
                      }
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
                <div className={styles.sort_items}>
                  <div className={styles.radio_container}>
                    <h5>مرتب سازی براساس:</h5>
                    <label className="checkcontainer">
                      ارزانترین
                      <input
                        type="radio"
                        checked={
                          router.query.hasOwnProperty("sortBy") &&
                          router.query.sortBy == "min"
                        }
                        name="radio"
                        onChange={() => ShowProductsHandle({ sortBy: "min" })}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      گرانترین
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          router.query.hasOwnProperty("sortBy") &&
                          router.query.sortBy == "max"
                        }
                        onChange={() => ShowProductsHandle({ sortBy: "max" })}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      پرفروشترین
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          router.query.hasOwnProperty("sortBy") &&
                          router.query.sortBy == "bestseller"
                        }
                        onChange={() =>
                          ShowProductsHandle({ sortBy: "bestseller" })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      با تخفیف
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          router.query.hasOwnProperty("sortBy") &&
                          router.query.sortBy == "sale"
                        }
                        onChange={() => ShowProductsHandle({ sortBy: "sale" })}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.products_part}>
              {filteredProducts.products.length ? (
                <>
                  {loading ? (
                    <div>loading</div>
                  ) : (
                    <div className={styles.product_list}>
                      {filteredProducts &&
                        filteredProducts.products.map((product) => (
                          <Product productInfos={product} key={product.id} />
                        ))}
                    </div>
                  )}

                  <ul className="pagination">
                    {filteredProducts.meta.links.slice(1, -1).map((link) => (
                      <li
                        key={link.label}
                        className={
                          link.active
                            ? "pagination_item active"
                            : "pagination_item"
                        }
                        onClick={() => ShowProductsHandle({ page: link.label })}
                      >
                        {link.label}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div>محصولی یافت نشد!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

export async function getServerSideProps({ resolvedUrl }) {
  try {
    const resCate = await axios.get("/categories");
    const resProducts = await axios.get(`${resolvedUrl}`);
    return {
      props: {
        categories: resCate.data.data,
        products: resProducts.data.data,
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
}
