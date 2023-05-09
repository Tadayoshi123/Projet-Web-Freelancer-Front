import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import Loading from "@/components/UI/Loading";
import Link from "next/link";

import FreelanceForm from "@/components/Forms/FreelanceForm";
import UserForm from "@/components/Forms/UserForm";

import useFetch from "@/hooks/useFetch";

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
    url: "/auth/register/freelance",
    method: "POST",
    body: userForm,
    token: null,
  });
  const {
    data: jobs,
    error: errorJobs,
    loading: loadingJobs,
    fetchData: fetchDataJobs,
  } = useFetch({ url: "/job", method: "GET", body: null, token: null });
  const {
    data: skills,
    error: errorSkills,
    loading: loadingSkills,
    fetchData: fetchDataSkills,
  } = useFetch({ url: "/skill", method: "GET", body: null, token: null });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchDataJobs();
    fetchDataSkills();
  }, []);

  const addFreelanceList = (e) => {
    let freelance = { ...userForm };
    if (freelance[e.target.name] === undefined) {
      freelance[e.target.name] = [];
    }
    let addObj = JSON.parse(e.target.value);
    let index = freelance[e.target.name].findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(addObj)
    );
    if (index === -1) {
      freelance[e.target.name].push(addObj);
      setUserForm(freelance);
    } else {
      console.log("Value already exist");
    }
  };

  const removeFreelanceList = (e) => {
    let freelance = { ...userForm };
    if (freelance[e.target.name] === undefined) {
      freelance[e.target.name] = [];
    }
    let removeObj = JSON.parse(e.target.value);
    let index = freelance[e.target.name].findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(removeObj)
    );
    if (index > -1) {
      freelance[e.target.name].splice(index, 1);
      setUserForm(freelance);
    } else {
      console.log("Value not found");
    }
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

  if (loading) return <Loading isLoad={loading} />;
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
            <FreelanceForm
              userForm={userForm}
              handleChange={handleChange}
              addFreelanceList={addFreelanceList}
              removeFreelanceList={removeFreelanceList}
              skills={skills}
              jobs={jobs}
            />
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
      {formError && <Notification message={formError} />}
    </div>
  );
};

export default Index;
