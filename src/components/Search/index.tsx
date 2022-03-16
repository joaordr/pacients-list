import { useContext, useEffect } from "react";
import { RiUserSearchFill } from "react-icons/ri";
import { PacientsContext } from "../../contexts/PacientsContext";

import styles from './search.module.scss';

export default function Search() {
    const { handleFilterByName, isLoading } = useContext(PacientsContext);
    useEffect(() => {
        if (isLoading) {
            let input = document.getElementById("search_box") as HTMLInputElement;
            input.value = '';
        }
    }, [isLoading])

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Pesquisar" id="search_box" onChange={e => handleFilterByName(e.target.value)} />
            <RiUserSearchFill />
        </div>
    )
}