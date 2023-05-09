import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";

import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import Loading from "@/components/UI/Loading";

import CompanyForm from "@/components/Forms/CompanyForm";
import UserForm from "@/components/Forms/UserForm";


const Index = () => {
  const router = useRouter();

  const [registerStep, setRegisterStep] = useState(0);
  const [formError, setFormError] = useState(null);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { fetchData, data, error, loading } = useFetch({
    url: "/auth/register/company",
    method: "POST",
    body: userForm,
    token: null,
  });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    setFormError(null);
    setRegisterStep(registerStep + 1);
    if (registerStep === 2) {
      fetchData();
      setRegisterStep(1);
    }
  };

  useEffect(() => {
    if (
      data !== undefined &&
      data !== null &&
      data !== {} &&
      data.token !== undefined
    ) {
      localStorage.setItem("token", data.token);
      router.push("/account/profil");
    } else {
      setRegisterStep(1);
    }
  }, [data, error]);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div className={styles.wrapper}>
      <Title title="Sign up" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        {registerStep === 1 && (
          <>
            <UserForm userForm={userForm} handleChange={handleChange} />
          </>
        )}
        {registerStep === 2 && (
          <>
            <CompanyForm userForm={userForm} handleChange={handleChange} />
          </>
        )}
        <div className={styles.btnWrapper}>
          {registerStep > 1 && (
            <Button
              type="button"
              title="Previous"
              className="btn__secondary"
              handleClick={() => setRegisterStep(registerStep - 1)}
            />
          )}
          <Button type="submit" title="Next" className="btn__primary" />
        </div>
      </form>
      <p>
        Already have an account ? <Link href="/auth/login">Sign in now</Link>
      </p>
      {error && <Notification type="warning" message={error?.message} />}
      {formError && <Notification type="warning" message={formError} />}
    </div>
  );
};

export default Index;
