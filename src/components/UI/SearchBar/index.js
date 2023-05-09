import styles from "./index.module.scss";
import Input from "@/components/UI/Input";

// searchBar component

const Index = ({ submit, placeholder, setSearchString }) => {
    return (
        <div className={styles.searchBar}>
        <form onSubmit={submit}>
            <Input
            type="search"
            name="search"
            placeholder={placeholder}
            handleChange={(e) => setSearchString(e.target.value)}
            />
        </form>
        </div>
    );
};

export default Index;
