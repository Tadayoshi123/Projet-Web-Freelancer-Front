import styles from "./index.module.scss";
import { useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import Button from "@/components/UI/Button";
import Title from "@/components/UI/Title";

import EditProfile from "@/components/EditModals/EditProfile";
import EditCompany from "@/components/EditModals/EditCompany";

const Index = () => {
  const { isLogged, user, fetchUser } = useContext(UserContext);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenCompany, setIsOpenCompany] = useState(false);

  return (
    <div className={styles.wrapper}>
      {isOpenUser && <EditProfile setIsOpen={setIsOpenUser} />}
      {isOpenCompany && (
        <EditCompany
          setIsOpen={setIsOpenCompany}
          Company={user?.company}
          isAdmin={false}
          updateCompany={fetchUser}
        />
      )}
      <Title title="Profile" Level="h1" />
      <div className={styles.wrapperContent}>
        <div className={styles.info}>
          {user && (
            <div className={styles.infoContainer}>
              <Title title="User information" Level="h2" />
              <div className={styles.infoContent}>
                <div className={styles.part1}>
                  <p>First Name : {user?.firstName}</p>
                  <p>Last Name : {user?.lastName}</p>
                  <p>Email : {user?.email}</p>
                  <p>Phone : {user?.phone}</p>
                </div>
                <div className={styles.part2}>
                  <p>Address : {user?.address}</p>
                  <p>Postal Code : {user?.postcode}</p>
                  <p>City : {user?.city}</p>
                </div>
              </div>
            </div>
          )}
          {user?.freelance != null && (
            <div className={styles.infoContainer}>
              <Title title="Freelance information" Level="h2" />
              <div className={styles.infoContent}>
                <div className={styles.part1}>
                  <p>
                    Years of experience : {user?.freelance.experience_years}{" "}
                  </p>
                  <p>Price : {user?.freelance.price}</p>
                </div>
                <div className={styles.part2}>
                  <p>
                    Jobs :
                    {user?.freelance.jobs.map((job) => {
                      return <p key={job.id}>{job.name}</p>;
                    })}
                  </p>
                  <p>
                    Skills :
                    {user?.freelance.skills.map((skill) => {
                      return <p key={skill.id}>{skill.name}</p>;
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
          <Button
            title="Edit User"
            className="btn__primary"
            type="button"
            handleClick={() => {
              setIsOpenUser(true);
            }}
          />
        </div>
        {user?.company != null && (
          <>
            <div className={styles.info}>
              <div className={styles.infoContainer}>
                <Title title="Company information" Level="h2" />
                <div className={styles.infoContent}>
                  <div className={styles.part1}>
                    <p>Name : {user?.company.name}</p>
                    <p>Status : {user?.company.status}</p>
                    <p>Siret : {user?.company.siret}</p>
                  </div>
                  <div className={styles.part2}>
                    <p>Address : {user?.company.address}</p>
                    <p>City : {user?.company.city}</p>
                    <p>Postal Code : {user?.company.postcode}</p>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                title="Edit Company"
                className="btn__primary"
                handleClick={() => {
                  setIsOpenCompany(true);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
