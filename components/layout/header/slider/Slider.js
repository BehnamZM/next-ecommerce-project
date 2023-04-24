// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";

import Image from "next/image";

import slideOne from "@/public/images/slide1.png";
import slideTwo from "@/public/images/slide2.png";
import slideThree from "@/public/images/slide3.png";
import Button from "@/components/ui/button/Button";
import Link from "next/link";

const Slider = () => {
  return (
    <div className="slider_header">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide
          style={{
            background:
              "linear-gradient(41deg, rgba(195,0,0,1) 0%, rgba(255,51,0,1) 69%)",
          }}
        >
          <div className={styles.slide_header}>
            <div className={styles.slide_inner}>
              <div className={styles.slide_infos}>
                <h3>انواع برگر</h3>
                <p>لذیذترین برگرها را در اینجا امتحان کنید :)</p>
                <Link href="/menu?category=2">
                  <Button bgColor="blue">کلیک کنید</Button>
                </Link>
              </div>
              <div className={styles.slide_img}>
                <Image
                  src={slideOne}
                  alt="slide-one"
                  layout="responsive"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            background:
              "linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(4,123,147,1) 66%)",
          }}
        >
          <div className={styles.slide_header}>
            <div className={styles.slide_inner}>
              <div className={styles.slide_infos}>
                <h3>اسلاید دوم</h3>
                <p>توضیحات مربوط به اسلاید دوم</p>
                <Button bgColor="green">کلیک کنید</Button>
              </div>
              <div className={styles.slide_img}>
                <Image
                  src={slideTwo}
                  alt="slide-two"
                  layout="responsive"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            background:
              "linear-gradient(41deg, rgba(195,0,95,1) 0%, rgba(255,0,253,1) 75%)",
          }}
        >
          <div className={styles.slide_header}>
            <div className={styles.slide_inner}>
              <div className={styles.slide_infos}>
                <h3>اسلاید سوم</h3>
                <p>توضیحات مربوط به اسلاید سوم</p>
                <Button bgColor="red">کلیک کنید</Button>
              </div>
              <div className={styles.slide_img}>
                <Image
                  src={slideThree}
                  alt="slide-three"
                  layout="responsive"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
