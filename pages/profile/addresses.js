import EditAddress from "@/components/profile/editAddress/EditAddress";
import Layout from "@/components/profile/Layout";
import NewAddress from "@/components/profile/newAddress/NewAddress";
import Button from "@/components/ui/button/Button";
import StyledLoading from "@/components/ui/styledLoading/StyledLoading";
import { handleError } from "lib/helper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useSWR from "swr";
import styles from "./Addresses.module.css";

const AddressesPage = () => {
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses`
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
      text: handleError(error),
    });
  }
  if (!data)
    return (
      <Layout>
        <StyledLoading />
      </Layout>
    );
  return (
    <Layout>
      <div onClick={() => setShowNewAddress(!showNewAddress)}>
        <Button bgColor="blue">
          {!showNewAddress ? "ایجاد آدرس جدید" : "پشیمون شدم!"}
        </Button>
      </div>
      {showNewAddress && (
        <NewAddress cities={data.cities} provinces={data.provinces} />
      )}
      <div className={styles.addresses_list_layout}>
        {data.addresses.map((address) => (
          <EditAddress
            key={address.id}
            address={address}
            cities={data.cities}
            provinces={data.provinces}
          />
        ))}
      </div>
    </Layout>
  );
};

export default AddressesPage;
