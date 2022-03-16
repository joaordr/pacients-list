/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';

import { useRouter } from 'next/router';
import ReactModal from 'react-modal';


import { RiCloseLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsGenderFemale, BsGenderMale, BsFillFlagFill, BsFillShareFill } from "react-icons/bs";
import { IoCalendarNumberSharp, IoCopy } from "react-icons/io5";


import { PacientsContext } from '../../contexts/PacientsContext';

import styles from './pacientModal.module.scss';
import Map from './Map';

export default function PacientModal() {
    const router = useRouter();

    const { activePacient, setActivePacient, activeSeed } = useContext(PacientsContext);
    let birth;
    if (activePacient != null) {
        birth = new Date(activePacient.dob.date).toLocaleTimeString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).split(" ")[0];
    }

    function onRequestClose() {
        setActivePacient(null);
        router.replace(`/${activeSeed}`, undefined, { shallow: true });
    }

    function handleCopyText() {
        var copyText = document.getElementById("share_link") as HTMLInputElement;

        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile */

        navigator.clipboard.writeText(copyText.value);

        var message = document.getElementById("copied_message") as HTMLInputElement;
        message.style.visibility = "visible";
        setTimeout(() => {
            message.style.visibility = "hidden"
        }, 1500);

    }

    ReactModal.setAppElement('body');
    return (
        <>
            <ReactModal
                isOpen={activePacient != null}
                onRequestClose={onRequestClose}
                overlayClassName={styles.ReactModal__Overlay}
                className={styles.ReactModal__Content}
            >

                {activePacient != null ? (
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <div>
                                <img src={activePacient.picture.large} alt="Profile picture" />
                            </div>
                            <button onClick={onRequestClose}><RiCloseLine /></button>
                        </div>
                        <div className={styles.content}>
                            <p className={styles.name}>{activePacient.name.first} {activePacient.name.last}</p>
                            <div>
                                <div className={styles.infos}>
                                    <p><IoCalendarNumberSharp /> {birth}</p>
                                    <p>{activePacient.gender === "male" ? <><BsGenderMale /> Masculino</> : <><BsGenderFemale /> Feminino</>}</p>
                                    <p><BsFillFlagFill /> {activePacient.nat}</p>
                                </div>

                                <div className={styles.contacts}>
                                    <p><MdEmail /> {activePacient.email}</p>
                                    <p><BsFillTelephoneFill /> {activePacient.phone}</p>
                                </div>

                                <div className={styles.adress}>
                                    <div className={styles.adress_description}>
                                        <div>
                                            <p>Endereço: </p>
                                        </div>
                                        <div>
                                            <p>{activePacient.location.country} - {activePacient.location.state} - {activePacient.location.city} - código postal: {activePacient.location.postcode}</p>
                                            <p>{activePacient.location.street.name}, n° {activePacient.location.street.number}</p>
                                        </div>
                                    </div>

                                    <Map />
                                </div>

                                <div className={styles.share}>
                                    <p><BsFillShareFill /></p>
                                    <input readOnly type="text" id="share_link" value={window.location.href} />
                                    <button onClick={handleCopyText}><IoCopy /></button>
                                </div>
                            </div>

                        </div>
                        <div id="copied_message" className={styles.copied_message}>
                            <p>Copiado Para área de transferência</p>
                        </div>
                    </div>

                ) : (<></>)}
            </ReactModal>
        </>

    )
}