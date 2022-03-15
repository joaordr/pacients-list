import { RiUserSearchFill } from "react-icons/ri";

import styles from './search.module.scss';

export default function Search() {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Pesquisar" />
            <RiUserSearchFill />
        </div>
    )
}