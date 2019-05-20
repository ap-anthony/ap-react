import React from 'react';
import Sidebar from './sidebar';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '../../font-awesome-library.js';

Enzyme.configure({ adapter: new Adapter() });

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

jest.mock('../../contexts/token', () => {
    const token = { unique_name: 'Unit Testing', personId: 0 }
    return {
        Consumer: ({ children }) => children({ token })
    };
});

beforeEach(() => {
    jest.resetModules();
});

test('Sidebar renders without crashing.', () => {
    let sidebar = mount(<Sidebar />);
    expect(sidebar).toBeTruthy();    
})

test('Sidebar loads no links when provided no data.', () => {
    let sidebar = mount(<Sidebar />);

    // 4 icons in the footer
    expect(sidebar.find('svg').length).toBe(4);
});

test('Sidebar loads links when provided data.', () => {
    let sidebar = mount(<Sidebar menuLinks={menuLinks} />);
    // 13 icons for menu links
    // 13 icons for caret down
    // 4 icons for footer
    expect(sidebar.find('svg').length).toBe(26 + 4);
})