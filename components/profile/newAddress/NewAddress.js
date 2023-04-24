import Button from "@/components/ui/button/Button";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import axios from "axios";
import { handleError } from "lib/helper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSWRConfig } from "swr";
import styles from "./NewAddress.module.css";

const NewAddress = ({ provinces, cities }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { mutate } = useSWRConfig();
  const addNewAddressHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/create`,
        { data }
      );
      Swal.fire({
        icon: "success",
        title: "تبریک",
        text: "آدرس با موفقیت ایجاد شد :)",
      });
      mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/adresses`);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "متاسفیم",
        text: handleError(err),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.new_address_layout}>
      <form
        className={styles.new_address_form}
        onSubmit={handleSubmit(addNewAddressHandler)}
      >
        <label>
          عنوان
          <input
            type="text"
            className="styled_input"
            placeholder="عنوان"
            {...register("title", {
              required: "فیلد عنوان الزامی میباشد!",
            })}
          />
          <p className="error_text">{errors.title?.message}</p>
        </label>
        <label>
          شماره تماس
          <input
            type="text"
            className="styled_input"
            placeholder="شماره تماس"
            {...register("cellphone", {
              required: "فیلد شماره تماس الزامی میباشد!",
              pattern: {
                value: /^(\+98|0)?9\d{9}$/i,
                message: "شماره تماس معتبر نیست!",
              },
            })}
          />
          <p className="error_text">{errors.cellphone?.message}</p>
        </label>
        <label>
          کدپستی
          <input
            type="text"
            className="styled_input"
            placeholder="کدپستی"
            {...register("postal_code", {
              required: "فیلد کدپستی الزامی میباشد!",
              pattern: {
                value: /^\d{5}[ -]?\d{5}$/i,
                message: " کد پستی معتبر نیست!",
              },
            })}
          />
          <p className="error_text">{errors.postal_code?.message}</p>
        </label>
        <label>
          استان
          <select
            className="styled_input"
            defaultValue=""
            {...register("province_id", {
              required: "فیلد استان الزامی میباشد!",
            })}
          >
            <option value="" disabled>
              انتخاب استان
            </option>
            {provinces.map((province) => (
              <option value={province.id} key={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          <p className="error_text">{errors.province_id?.message}</p>
        </label>
        <label>
          شهر
          <select
            className="styled_input"
            defaultValue=""
            {...register("city_id", {
              required: "فیلد شهر الزامی میباشد!",
            })}
          >
            <option value="" disabled>
              انتخاب شهر
            </option>
            {cities
              .filter((item) => item.province_id == watch("province_id"))
              .map((city) => (
                <option value={city.id} key={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
          <p className="error_text">{errors.city_id?.message}</p>
        </label>
        <label>
          آدرس
          <textarea
            rows="5"
            className="styled_input"
            placeholder="آدرس"
            {...register("address", {
              required: "فیلد آدرس الزامی میباشد!",
            })}
          />
          <p className="error_text">{errors.address?.message}</p>
        </label>
        <Button type="submit" bgColor="green">
          ایجاد آدرس
          {loading && <LoadingButton />}
        </Button>
      </form>
      <hr />
    </div>
  );
};

export default NewAddress;
