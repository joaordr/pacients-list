import React, { useEffect, useRef } from "react";
import { BsFacebook, } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { signIn } from 'next-auth/react';

import styles from './signInMenu.module.scss'

export default function SignInMenu({ isOpen, setIsOpen }) {
    const componentRef = useRef();    

    useEffect(() => { // Detecta clicks externos e fecha o menu
        let IgnoreOutsideClick = true;
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e: any) {
            if (componentRef && componentRef.current) {
                const ref: any = componentRef.current
                if (!ref.contains(e.target)) {
                    if (IgnoreOutsideClick) {
                        IgnoreOutsideClick = false;
                    } else {
                        IgnoreOutsideClick = true;
                        setIsOpen(false);
                    }
                }
            }
        }
    }, []);

    return (
        <div className={`${styles.container} ${isOpen ? styles.open : ""}`} ref={componentRef as any}>
            <div className={styles.arrow_up}></div>
            <div className={styles.content}>
                <button type="button" className={styles.google} onClick={() => signIn('google')}><FcGoogle />Fazer login com Google</button>
                <button type="button" className={styles.facebook} onClick={() => signIn('facebook')}><BsFacebook />Fazer login com Facebook</button>
            </div>
        </div>
    )
}