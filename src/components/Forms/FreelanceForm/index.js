import styles from "./index.module.scss";

import Input from "../../UI/Input";
import Select from "../../UI/Select";
import Button from "../../UI/Button";

const Index = ({
  userForm,
  handleChange,
  addFreelanceList,
  removeFreelanceList,
  skills,
  jobs,
}) => {
  return (
    <div className={styles.formContent}>
      <div className={styles.part1}>
        <Input
          label="Price"
          type="price"
          name="price"
          placeholder="Enter your price"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.price}
        />
        <Input
          label="Years of experience"
          type="experience_years"
          name="experience_years"
          placeholder="Enter your years of experience"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.experience_years}
        />
      </div>
      <div className={styles.part2}>
        <Select
          label="Jobs"
          name="jobs"
          value={userForm?.jobs}
          isRequired={true}
          placeholder="Select a job"
          onChange={(e) => addFreelanceList(e)}
          options={jobs}
        />
        <div className={styles.list}>
          {userForm?.jobs?.map((job, index) => (
            <div key={index} className={styles.listItem}>
              <p>{job.name}</p>
              <Button
                type="button"
                title="X"
                name="jobs"
                key={job.id}
                value={JSON.stringify(job)}
                onClick={(e) => removeFreelanceList(e)}
              />
            </div>
          ))}
        </div>
        <Select
          label="Skills"
          name="skills"
          value={userForm?.skills}
          isRequired={true}
          placeholder="Select a skill"
          options={skills}
          onChange={(e) => addFreelanceList(e)}
        />
        <div className={styles.list}>
          {userForm?.skills?.map((skill, index) => (
            <div key={index} className={styles.listItem}>
              <p>{skill.name}</p>
              <Button
                type="button"
                name="skills"
                key={skill.id}
                value={JSON.stringify(skill)}
                onClick={(e) => removeFreelanceList(e)}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
