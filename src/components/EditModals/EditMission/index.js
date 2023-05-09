import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import Notification from "@/components/UI/Notification";

const Index = ({ setIsOpen, mission, updateMissions }) => {
  const [token, setToken] = useState();
  const [missionForm, setMissionForm] = useState();
  const [edit, setEdit] = useState(false);
  const {
    data: dataUpdate,
    error: errorMission,
    loading: loadingMission,
    fetchData: fetchDataUpdate,
  } = useFetch({
    url: `/mission/${mission?._id}`,
    method: "PUT",
    body: missionForm,
    token: token,
  });
  const {
    data: dataAdd,
    error: errorAdd,
    loading: loadingAdd,
    fetchData: fetchDataAdd,
  } = useFetch({
    url: `/mission`,
    method: "POST",
    body: missionForm,
    token: token,
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
    if (e.target.name === "start" || e.target.name === "end") {
      if (missionForm.date === undefined) {
        setMissionForm({ ...missionForm, date: {} });
      }
      let newDate = { ...missionForm.date };
      newDate[e.target.name] = e.target.value;
      setMissionForm({ ...missionForm, date: newDate });
    } else {
      setMissionForm({ ...missionForm, [e.target.name]: e.target.value });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (token != undefined && token != null && token != "") {
      if (edit) {
        fetchDataUpdate();
      } else {
        fetchDataAdd();
      }
    }
  };

  const addMissionList = (e) => {
    let mission = { ...missionForm };
    if (mission[e.target.name] === undefined) {
      mission[e.target.name] = [];
    }
    let addObj = JSON.parse(e.target.value);
    if (mission[e.target.name].includes(addObj.name) === false) {
      mission[e.target.name].push(addObj);
      setMissionForm(mission);
    } else {
      console.log("Value already exist");
    }
  };

  const missionRemoveList = (e) => {
    let mission = { ...missionForm };
    let removeObj = JSON.parse(e.target.value);
    let index = mission[e.target.name].findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(removeObj)
    );
    if (index > -1) {
      mission[e.target.name].splice(index, 1);
      setMissionForm(mission);
    } else {
      console.log("value doesn't exist");
    }
  };

  useEffect(() => {
    const newToken = localStorage.getItem("token");
    if (newToken) {
      setToken(newToken);
    }
  }, []);

  useEffect(() => {
    if (mission !== undefined) {
      mission.date.start = new Date(mission.date.start)
        .toISOString()
        .split("T")[0];
      mission.date.end = new Date(mission.date.end).toISOString().split("T")[0];
      setMissionForm(mission);
      setEdit(true);
    } else {
      setMissionForm();
      setEdit(false);
    }
  }, [mission]);

  useEffect(() => {
    if (dataUpdate.success || dataAdd.success) {
      updateMissions();
      setIsOpen(false);
    }
  }, [dataUpdate, dataAdd]);

  useEffect(() => {
    if (mission === undefined) {
      setMissionForm({ date: {} });
    }
    fetchDataJobs();
    fetchDataSkills();
  }, []);

  if (loadingMission || loadingAdd || loadingJobs || loadingSkills) {
    return (
      <Loading
        isLoad={loadingMission || loadingAdd || loadingJobs || loadingSkills}
      />
    );
  }

  return (
    <Modal title="Edit Mission" closeModal={() => setIsOpen(false)}>
      <form onSubmit={(e) => submitForm(e)}>
        <Input
          label="Mission title"
          type="text"
          name="title"
          placeholder="Enter the title of the mission"
          value={missionForm?.title}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Description"
          type="text"
          name="description"
          placeholder="Enter the description of the mission"
          value={missionForm?.description}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Price"
          type="number"
          name="price"
          placeholder="Enter the price of the mission"
          value={missionForm?.price}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Starting date"
          type="date"
          name="start"
          placeholder="Enter the starting date of the mission"
          value={missionForm?.date?.start}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Ending date"
          type="date"
          name="end"
          placeholder="Enter the ending date of the mission"
          value={missionForm?.date?.end}
          onChange={(e) => handleChange(e)}
        />
        {jobs !== undefined && jobs !== null && (
          <Select
            label="Jobs"
            name="jobs"
            isRequired={true}
            placeholder="Select your jobs"
            onChange={(e) => addMissionList(e)}
            value={missionForm?.jobs}
            options={jobs}
          />
        )}
        <p>
          Jobs: {missionForm?.jobs?.map((job) => (
            <Button
              type="button"
              title={job.name}
              key={job.id}
              name="jobs"
              value={JSON.stringify(job)}
              onClick={(e) => missionRemoveList(e)}
            />
          ))}
          {errorJobs && <Notification type="error" message={errorJobs} />}
        </p>
        {skills !== undefined && skills !== null && (
          <Select
            label="Skills"
            name="skills"
            isRequired={true}
            placeholder="Select your skills"
            onChange={(e) => addMissionList(e)}
            value={missionForm?.skills}
            options={skills}
          />
        )}
        <p>
          Skills: {missionForm?.skills?.map((skill) => (
            <Button
              type="button"
              key={skill.id}
              title={skill.name}
              name="skills"
              value={JSON.stringify(skill)}
              onClick={(e) => missionRemoveList(e)}
              className="btn__primary"
            />
          ))}
          {errorSkills && <Notification type="error" message={errorSkills} />}
        </p>
        {(edit && (
          <Button type="submit" title="Edit" className="btn__primary" />
        )) || <Button type="submit" title="Add" className="btn__primary" />}
      </form>
      {errorMission && <Notification type="error" message={errorMission} />}
      {errorAdd && <Notification type="error" message={errorAdd} />}
    </Modal>
  );
};

export default Index;
