import { useContext } from "react";
import { RiFolderUserFill } from "react-icons/ri";
import { PatientsContext } from "../../../contexts/PatientsContext";

import styles from './tableRow.module.scss';

export default function TableRow({ pacient }) {
    const { handleSelectPatient } = useContext(PatientsContext);
    let birth = new Date(pacient.dob.date).toLocaleTimeString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).split(" ")[0];

    return (
        <tr className={styles.container}>
            <td>{`${pacient.name.first} ${pacient.name.last}`}</td>
            <td>{pacient.gender === "male" ? "Masculino" : "Feminino"}</td>
            <td>{birth}</td>
            <td><button onClick={() => { handleSelectPatient(pacient) }}><RiFolderUserFill /></button></td>
        </tr>
    )
}