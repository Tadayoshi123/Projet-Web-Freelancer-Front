import styles from "./index.module.scss";

import Input from "../../UI/Input";

const Index = ({ userForm, handleChange }) => {
  return (
    <div className={styles.formContent}>
      <div className={styles.part1}>
        <Input
          label="First name"
          type="firstName"
          name="firstName"
          placeholder="Enter your first name"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.firstName}
        />
        <Input
          label="Last name"
          type="lastName"
          name="lastName"
          placeholder="Enter your last name"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.lastName}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.password}
        />
      </div>
      <div className={styles.part2}>
        <Input
          label="Phone"
          type="phone"
          name="phone"
          placeholder="Enter your phone number"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.phone}
        />
        <Input
          label="Address"
          type="address"
          name="address"
          placeholder="Enter your address"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.address}
        />
        <Input
          label="Postal Code"
          type="postcode"
          name="postcode"
          placeholder="Enter your postal code"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.postcode}
        />
        <Input
          label="City"
          type="city"
          name="city"
          placeholder="Enter your city"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.city}
        />
      </div>
    </div>
  );
};

export default Index;
