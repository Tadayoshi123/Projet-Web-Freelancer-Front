import styles from "./index.module.scss";

// Custom Select component with a label, a list of options and a default value

const Index = ({ label, name, options, onChange }) => {
  if (options === undefined || options === null || options.length == 0 || Array.isArray(options) == false) {
    return (
      <div className={styles.wrapper}>
        <label>{label}</label>
        <select name={name} onChange={onChange}>
          <option value="">No options available</option>
        </select>
      </div>
    )
  } else {
    return (
      <div className={styles.wrapper}>
        <label>{label}</label>
        <select name={name} onChange={onChange}>
          <option value="">Select a {label}</option>
          {options.map((option, index) => (
            <option key={index} value={JSON.stringify(option)} disabled={option.disabled}>{option.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default Index;
