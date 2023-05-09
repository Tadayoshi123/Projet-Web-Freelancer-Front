import styles from "./index.module.scss";
import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import useFetch from "@/hooks/useFetch";

import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Notification from "@/components/UI/Notification";

import UserForm from "@/components/Forms/UserForm";
import FreelanceForm from "@/components/Forms/FreelanceForm";

const Index = ({ setIsOpen }) => {
  const [token, setToken] = useState();
  const [userForm, setUserForm] = useState();
  const { user, updateUser } = useContext(UserContext);
  const {
    data: dataUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    fetchData: fetchDataUpdate,
  } = useFetch({ url: "/user", method: "PUT", body: userForm, token: token });
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
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const addFreelanceList = (e) => {
    let freelance = { ...userForm.freelance };
    if (freelance[e.target.name] === undefined) {
      freelance[e.target.name] = [];
    }
    let addObj = JSON.parse(e.target.value);
    if (freelance[e.target.name].includes(addObj.name) === false) {
      freelance[e.target.name].push(addObj);
      setUserForm({ ...userForm, freelance: freelance });
    } else {
      console.log("Value already exist");
    }
  };

  const removeFreelanceList = (e) => {
    let freelance = { ...userForm.freelance };
    let removeObj = JSON.parse(e.target.value);
    let index = freelance[e.target.name].findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(removeObj)
    );
    if (index > -1) {
      freelance[e.target.name].splice(index, 1);

      setUserForm({ ...userForm, freelance: freelance });
    } else {
      console.log("Value not found");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newToken = localStorage.getItem("token");
    setToken(newToken);
    if (token !== null && token !== undefined && token !== "") {
      fetchDataUpdate();
      if (dataUpdate.success) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      setUserForm(user);
    }
  }, [user]);

  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen(false);
      updateUser(dataUpdate.user);
    }
  }, [dataUpdate]);

  useEffect(() => {
    fetchDataJobs();
    fetchDataSkills();
  }, []);

  if (loadingUpdate || loadingJobs || loadingSkills) return <Loading isLoad={true} />;

  return (
    <Modal title="Modifier mon profil" closeModal={() => setIsOpen(false)}>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <UserForm userForm={userForm} handleChange={handleChange} />
        {user.freelance !== undefined &&
          user.freelance !== null &&
          user.freelance !== {} && (
            <FreelanceForm
              userForm={userForm}
              handleChange={handleChange}
              addFreelanceList={addFreelanceList}
              removeFreelanceList={removeFreelanceList}
              jobs={jobs}
              skills={skills}
            />
          )}
        <Button type="submit" title="Update" className="btn__primary" />
      </form>
      {errorUpdate && <Notification type="danger" message={errorUpdate} />}
      {errorJobs && <Notification type="danger" message={errorJobs} />}
      {errorSkills && <Notification type="danger" message={errorSkills} />}
    </Modal>
  );
};

export default Index;
