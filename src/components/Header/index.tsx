import { BsImage } from "react-icons/bs";
import styles from './header.module.scss';
import User from "./User";

export default function Header() {
    return (
        <div className={styles.container}>
            <div>
                <div>
                    <BsImage />
                </div>
                <p>Pharma Inc</p>
            </div>
            <User />
        </div>
    )
}