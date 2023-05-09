import styles from "./index.module.scss";
import Link from 'next/link';

const Index = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.menuItem}>
                <Link href="admin/user">Users</Link>
            </div>
            <div className={styles.menuItem}>
                <Link href="admin/job">Jobs</Link>
            </div>
            <div className={styles.menuItem}>
                <Link href="admin/skill">Skills</Link>
            </div>
        </div>
    );
}

export default Index;