import AboutPage from './AboutPage';
import * as React from 'react'
import { mount } from '@cypress/react'

it("Test About Page",()=>{
    mount(<AboutPage/>)
    cy.log("This is a test cypress");
})