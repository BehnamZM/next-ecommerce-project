import useSWR from "swr";
import Layout from "@/components/profile/Layout";
import StyledLoading from "@/components/ui/styledLoading/StyledLoading";
// import axios from "axios";
import { handleError, numberFormat } from "lib/helper";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./Orders.module.css";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineIssuesClose } from "react-icons/ai";

const customStyles = {
  content: {
    width: "70%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const OrdersPage = () => {
  // let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  function closeModal() {
    setIsOpen(false);
  }
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/orders?page=${pageIndex}`
  );

  if (error) {
    Swal.fire({
      icon: "error",
      title: "متاسفیم",
      text: handleError(error),
    });
  }

  if (!data) {
    return (
      <Layout>
        <StyledLoading />
      </Layout>
    );
  }
  return (
    <Layout>
      <div className={styles.orders_layout}>
        <div className={styles.orders_inner}>
          <table>
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>آدرس</th>
                <th>وضعیت</th>
                <th>وضعیت پرداخت</th>
                <th>قیمت کل</th>
                <th>تاریخ</th>
                <th>محصولات</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.address_title}</td>
                  <td>{order.status}</td>
                  <td
                    style={{
                      color: order.payment_status === "موفق" ? "green" : "red",
                    }}
                  >
                    {order.payment_status}
                  </td>
                  <td>{numberFormat(order.paying_amount)}</td>
                  <td>{order.created_at}</td>
                  <td>
                    <button
                      onClick={openModal}
                      className={styles.table_button}
                      style={{ backgroundColor: "gray" }}
                      id={`${order.id - "element"}`}
                    >
                      محصولات
                    </button>
                    <Modal
                      isOpen={modalIsOpen}
                      // onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel={`#${order.id - "element"}`}
                      ariaHideApp={false}
                    >
                      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                      <div
                        onClick={closeModal}
                        style={{
                          fontSize: "50px",
                          cursor: "pointer",
                          color: "red",
                        }}
                      >
                        <AiOutlineIssuesClose />
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>شناسه</th>
                            <th>نام محصول</th>
                            <th>تعداد</th>
                            <th>قیمت</th>
                            <th>قیمت با تخفیف</th>
                            <th>تصویر</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.order_items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.product_name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.subtotal}</td>
                              <td>{item.price}</td>
                              <td>
                                <Image
                                  alt="product-image"
                                  src={item.product_primary_image}
                                  width={150}
                                  height={100}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            {data.meta.links.slice(1, -1).map((link) => (
              <li
                key={link.label}
                className={
                  link.active ? "pagination_item active" : "pagination_item"
                }
                onClick={() => setPageIndex(link.label)}
              >
                {link.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
