import Product from "../product/Product";
import styles from "./Tabmenu.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Tabmenu = ({ tabs }) => {
  return (
    <div className="container">
      <div className={styles.tabmenu_container}>
        <h2>منوی محصولات</h2>
        <Tabs selectedTabClassName={"active"}>
          <div className={styles.tabmenu_inner}>
            <TabList>
              <ul className={styles.menus}>
                {tabs.tabList.map((item, index) => (
                  <Tab key={index}>{item}</Tab>
                ))}
              </ul>
            </TabList>
            <div>
              {tabs.tabPanel.map((item, index) => (
                <TabPanel key={index} className={styles.products_list}>
                  {item.map((product) => (
                    <Product productInfos={product} key={product.id} />
                  ))}
                </TabPanel>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Tabmenu;
