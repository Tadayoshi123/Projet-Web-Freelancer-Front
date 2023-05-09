import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";

const Index = ({ setIsOpen, Company, updateCompany, isAdmin }) => {
  const [token, setToken] = useState();
  const [CompanyForm, setCompanyForm] = useState(); // on
  const {
    data: dataAdminUpdate,
    error: errorAdminUpdate,
    loading: loadingAdminUpdate,
    fetchData: fetchDataAdminUpdate,
  } = useFetch({
    url: `/user/company/admin/${Company?._id}`,
    method: "PUT",
    body: CompanyForm,
    token: token,
  });
  const {
    data: dataUserUpdate,
    error: errorUserUpdate,
    loading: loadingUserUpdate,
    fetchData: fetchDataUserUpdate,
  } = useFetch({
    url: `/user/company/`,
    method: "PUT",
    body: CompanyForm,
    token: token,
  });

  const handleChange = (e) => {
    setCompanyForm({ ...CompanyForm, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (token !== undefined && token !== null && token !== "") {
      if (isAdmin) {
        fetchDataAdminUpdate();
      } else {
        fetchDataUserUpdate();
      }
    }
  };

  useEffect(() => {
    const newToken = localStorage.getItem("token");
    if (newToken) {
      setToken(newToken);
    }
  }, []);

  useEffect(() => {
    if (Company !== undefined && Company !== null) {
      setCompanyForm(Company);
    }
  }, [Company]);

  useEffect(() => {
    if (dataAdminUpdate.success) {
      updateCompany(dataAdminUpdate.company);
      setIsOpen(false);
    }
  }, [dataAdminUpdate]);

  useEffect(() => {
    if (dataUserUpdate.success) {
      updateCompany(dataUserUpdate.company);
      setIsOpen(false);
    }
  }, [dataUserUpdate]);

  if (loadingUserUpdate || loadingAdminUpdate) {
    return <Loading isLoad={true} />;
  }

  return (
    <Modal title="Edit Company" closeModal={() => setIsOpen(false)}>
      <form onSubmit={(e) => submitForm(e)}>
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder={"Enter the name of your company"}
          value={CompanyForm?.name}
          isRequired={true}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Siret"
          type="text"
          name="siret"
          placeholder={"Enter the siret number of your company"}
          value={CompanyForm?.siret}
          isRequired={true}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Address"
          type="text"
          name="address"
          placeholder={"Enter the address of your company"}
          value={CompanyForm?.address}
          isRequired={true}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="City"
          type="text"
          name="city"
          placeholder={"Enter the city of your company"}
          value={CompanyForm?.city}
          isRequired={true}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Postal Code"
          type="text"
          name="postcode"
          placeholder={"Enter the postal code of your company"}
          value={CompanyForm?.postcode}
          isRequired={true}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Status"
          type="text"
          name="status"
          placeholder={"Enter the status of your company"}
          value={CompanyForm?.status}
          isRequired={true}
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit" title="Edit" className="btn__primary" />
      </form>
      {errorAdminUpdate && (
        <Notification type="danger" message={errorAdminUpdate} />
      )}
      {errorUserUpdate && (
        <Notification type="danger" message={errorUserUpdate} />
      )}
    </Modal>
  );
};

export default Index;
