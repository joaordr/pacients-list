import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signOut, useSession } from 'next-auth/react';

import User from '.';

jest.mock('next-auth/react');

describe('User component', () => {
    it('Renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce({
            data: {
                user: { name: "John Doe", email: "john.doe@example.com" },
                expires: "fake-expires",
            }, status: "authenticated"
        });

        render(<User />)

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('Signing out correctly', () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce({
            data: {
                user: { name: "John Doe", email: "john.doe@example.com" },
                expires: "fake-expires",
            }, status: "authenticated"
        });
        const signOutMocked = mocked(signOut);

        render(<User />)

        const signOutButton = screen.getByText('Sair');

        fireEvent.click(signOutButton);

        expect(signOutMocked).toHaveBeenCalled();
    });

})