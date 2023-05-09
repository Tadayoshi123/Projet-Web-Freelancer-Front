import styles from "./index.module.scss";

import Input from "../../UI/Input";

const Index = ({ userForm, handleChange }) => {
  return (
    <div className={styles.formContent}>
      <Input
        label="Company name"
        type="companyName"
        name="companyName"
        placeholder="Enter the name of your company"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm?.companyName}
      />
      <Input
        label="Siret"
        type="companySiret"
        name="companySiret"
        placeholder="Enter the siret number of your company"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm?.companySiret}
      />
      <Input
        label="Company address"
        type="companyAddress"
        name="companyAddress"
        placeholder="Enter the address of your company"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm?.companyAddress}
      />
        <Input
          label="Company city"
          type="companyCity"
          name="companyCity"
          placeholder="Enter the city of your company"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.companyCity}
        />
      <Input
        label="Company postal code"
        type="companyPostcode"
        name="companyPostcode"
        placeholder="Enter the postal code of your company"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm?.companyPostcode}
      />
      <Input
        label="Company status"
        type="companyStatus"
        name="companyStatus"
        placeholder="Enter the status of your company"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm?.companyStatus}
      />
    </div>
  );
};

export default Index;
