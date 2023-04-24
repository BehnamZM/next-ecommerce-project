import Layout from "@/components/profile/Layout";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/button/Button";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import { useState } from "react";
import styles from "./ProfilePage.module.css";
import Swal from "sweetalert2";
import StyledLoading from "@/components/ui/styledLoading/StyledLoading";
import axios from "axios";
import { handleError } from "lib/helper";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/info`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "متاسفیم",
      text: handleError(err),
    });
  }

  const changeUserInfosHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/info/edit`,
        { data }
      );
      Swal.fire({
        icon: "success",
        title: "تبریک",
        text: "اطلاعات با موفقیت ویرایش شد:)",
      });
      mutate(res.data);
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

  if (!data)
    return (
      <Layout>
        <StyledLoading />
      </Layout>
    );

  return (
    <>
      <Layout>
        <form
          onSubmit={handleSubmit(changeUserInfosHandler)}
          className={styles.update_infos_form}
        >
          <label>
            نام شما
            <input
              className="styled_input"
              type="text"
              placeholder="نام شما"
              defaultValue={data.name}
              {...register("name", {
                required: "فیلد نام الزامی میباشد!",
              })}
            />
            <p className="error_text">{errors.name?.message}</p>
          </label>
          <label>
            ایمیل شما
            <input
              className="styled_input"
              type="text"
              placeholder="ایمیل شما"
              defaultValue={data.email}
              {...register("email", {
                required: "فیلد ایمیل الزامی میباشد!",
              })}
            />
            <p className="error_text">{errors.email?.message}</p>
          </label>
          <label>
            شماره تماس
            <input
              className="styled_input"
              type="text"
              placeholder="شماره تماس"
              disabled={true}
              defaultValue={data.cellphone}
            />
            <p>{errors.cellphone?.message}</p>
          </label>
          <Button bgColor="red" type="submit">
            ویرایش اطلاعات
            {loading && <LoadingButton />}
          </Button>
        </form>
      </Layout>
    </>
  );
};

export default ProfilePage;
