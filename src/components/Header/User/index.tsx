/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from 'next-auth/react';
import { destroyCookie } from 'nookies';
import { useState } from 'react';

import { FaUserAlt } from "react-icons/fa";
import SignInMenu from './SignInMenu';

import styles from './user.module.scss';

export default function User() {
    const [isSignInMenuOpen, setIsSignInMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    return (
        <>
            <div className={styles.container}>
                <div>
                    {(status === "authenticated") && (
                        <>
                            <p>{session.user.name}</p>
                            <a href="" onClick={(e) => {e.preventDefault(); signOut();}}>Sair</a>
                        </>
                    )}
                </div>
                {(status === "authenticated") ? (
                    <div >
                        <img src={session.user.image} alt="User image" />
                    </div>
                ) : (
                    <div onClick={() => setIsSignInMenuOpen(!isSignInMenuOpen)}>
                        <FaUserAlt />
                    </div>
                )}
            </div>
            <SignInMenu isOpen={isSignInMenuOpen} setIsOpen={setIsSignInMenuOpen} />

        </>

    )
}