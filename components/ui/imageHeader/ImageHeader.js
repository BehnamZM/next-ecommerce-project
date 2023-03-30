import styles from "./ImageHeader.module.css";

const ImageHeader = ({ bgSrc, pageName }) => {
  return (
    <div
      className={styles.image_header}
      style={{ background: `url(${{ bgSrc }})` }}
    >
      <div className={styles.image_header_inner}>
        {/* <Image src={bgSrc} alt={pageName} className={styles.image} /> */}
        <div className={styles.page_infos}>
          <h4 className={styles.image_header_h4}>{pageName}</h4>
        </div>
      </div>
      <div className={styles.image_header_overlay}></div>
    </div>
  );
};

export default ImageHeader;
