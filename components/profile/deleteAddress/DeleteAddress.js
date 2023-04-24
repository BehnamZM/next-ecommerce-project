import Button from "@/components/ui/button/Button";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import axios from "axios";
import { handleError } from "lib/helper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSWRConfig } from "swr";

const DeleteAddress = ({ id }) => {
  const { mutate } = useSWRConfig();

  const deleteAddressHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/delete`,
        { address_id: id }
      );
      Swal.fire({
        icon: "success",
        title: "تبریک",
        text: "آدرس با موفقیت حذف شد :)",
      });
      mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses`);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "متاسفیم",
        text: handleError(err),
      });
    }
  };

  return (
    <div>
      <button
        onClick={deleteAddressHandler}
        type="button"
        className="styled_button"
        style={{ backgroundColor: "red" }}
      >
        حذف
      </button>
    </div>
  );
};

export default DeleteAddress;
