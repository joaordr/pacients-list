import Image from 'next/image';
import { FaUserAlt } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import styles from './header.module.scss';

export default function Header() {
    return (
        <div className={styles.container}>
            <div>
                <div>
                    <BsImage />
                </div>
                {/* <Image src="/images/without_logo.png" alt="" height={45} width={45} /> */}
                <p>Pharma Inc</p>
            </div>
            <div>
                <div>
                    <p>User Name</p>
                    <a href="">Sair</a>
                </div>
                <div>
                    <FaUserAlt />
                </div>
            </div>
        </div>
    )
}