import { useContext } from 'react';
import { PacientsContext } from '../../contexts/PacientsContext';
import styles from './loader.module.css';

export default function Loader() {
    const { isLoading, isFetching } = useContext(PacientsContext);

    if (!isLoading && !isFetching) {
        return <></>;
    }
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    )
}