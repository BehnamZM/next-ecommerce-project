import useSWR from "swr";
import Layout from "@/components/profile/Layout";
import StyledLoading from "@/components/ui/styledLoading/StyledLoading";
// import axios from "axios";
import { handleError, numberFormat } from "lib/helper";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./Orders.module.css";

const OrdersPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/transactions?page=${pageIndex}`
  );

  console.log(data);

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
                <th>قیمت کل</th>
                <th>وضعیت</th>
                <th>شماره پیگیری</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.order_id}</td>
                  <td>{numberFormat(transaction.amount)}</td>
                  <td
                    style={{
                      color: transaction.status === "موفق" ? "green" : "red",
                    }}
                  >
                    {transaction.status}
                  </td>
                  <td>{transaction.trans_id}</td>
                  <td>{transaction.created_at}</td>
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
