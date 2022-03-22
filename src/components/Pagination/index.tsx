import { useContext } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PatientsContext } from "../../contexts/PatientsContext";

import styles from './pagination.module.scss';

export default function Pagination() {
    const { handleNextPage, handlePreviousPage, activePage } = useContext(PatientsContext);

    return (
        <div className={styles.container}>
            <button onClick={handlePreviousPage} disabled={activePage <= 0 ? true : false}><IoIosArrowBack /></button>
            <button onClick={handleNextPage} ><IoIosArrowForward /></button>

        </div>
    )
}