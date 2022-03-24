import { render, screen } from '@testing-library/react';

import PacientModal from '.';
import { PatientsContext } from '../../contexts/PatientsContext';

jest.mock("next/router");

const setActivePatient = jest.fn()
const activePatient = {
    name: {
        first: 'Jhon',
        last: 'Doe'
    },
    picture: {
        large: 'http://img.test',
    },
    dob: {
        date: '1989-01-12T22:34:41.344Z'
    },
    location: {
        country: 'fake-country',
        state: 'fake-state',
        city: 'fake-city',
        postcode: 'fake-postcode',
        street: {
            number: 'fake-number',
            name: 'fake-name',
        },
        coordinates: {
            latitude: 0,
            longitude: 0
        }
    }
}
const activeSeed = 'fake-active-seed';

describe('PacientModal component', () => {
    it('Renders correctly', () => {
        render(
            <PatientsContext.Provider value={{ activePatient, setActivePatient, activeSeed } as any}>
                <PacientModal />
            </PatientsContext.Provider>
        )

        expect(screen.getByText(activePatient.name.first, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(activePatient.location.postcode, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(activePatient.location.street.name, { exact: false })).toBeInTheDocument();
    });

    it('Converting date correctly', () => {
        render(
            <PatientsContext.Provider value={{ activePatient, setActivePatient, activeSeed } as any}>
                <PacientModal />
            </PatientsContext.Provider>
        )

        expect(screen.getByText('12/01/1989', { exact: false })).toBeInTheDocument();
    });

    it('Renders correctly if do not have patient selected', () => {
        let activePatient = null;
        const { container, debug } = render(
            <PatientsContext.Provider value={{ activePatient, setActivePatient, activeSeed } as any}>
                <PacientModal />
            </PatientsContext.Provider>
        )
        expect(screen.queryByText('Jhon', { exact: false })).not.toBeInTheDocument();
    });

})