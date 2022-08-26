import { mount } from '@cypress/react'
import * as React from 'react'
import SimpleReactFooter from './SimpleReactFooter'

it("Test About Page",()=>{
    mount(<SimpleReactFooter/>)
    cy.log("This is a test cypress");
})