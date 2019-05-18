import React from 'react';
import Sidebar from './sidebar';
import { render, fireEvent, cleanup } from 'react-testing-library';
import renderer from 'react-test-renderer';

const menuLinks = {
    "Management Consoles": [],
    "Visit Management": [],
    "Campus Safety": [],
    "Document Management": [],
    "Applicant Missing Items": [],
    "Email Management": [],
    "Mailing Management": [],
    "Codes Management": [],
    "Report Tools": [],
    "Portal Management": [],
    "Data Imports & Exports": [],
    "System Management": [],
    "AdmissionPros Only": [],
};

test('Sidebar loads links when provided data.', () => {
    const { getByText } = render(
        <Sidebar collapsed={false} menuLinks={menuLinks} />
    );
    Object.keys(menuLinks).forEach(key => {
        expect(getByText(key)).toBeTruthy();
    })
});

test('Sidebar renders correctly.', () => {
    const tree = renderer
        .create(<Sidebar collapsed={false} menuLinks={menuLinks} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});