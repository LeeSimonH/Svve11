/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/svelte'

import Accordion from '../components/Accordion/Accordion'
import AccordionItem from '../components/Accordion/AccordionItem'
import AccordionHeader from '../components/Accordion/AccordionHeader'
import AccordionButton from '../components/Accordion/AccordionButton'
import AccordionPanel from '../components/Accordion/AccordionPanel'

// List of Accordion Parts:
    // - Accordion: contains accordion item(s)
        // - Accordion Item: contains header and panel
            // - Accordion Header: contains button
                // - Accordion Button: labels header
            // - Accordion Panel: contains contents



describe('Accessible Accordion Unit Tests', () => {

    const options =  {
        multiselectable: true,
        headerLevel: 4,
        styles: ['background-color: coral', 'background-color: coral', 'border: 1px solid blue', 'border: 1px solid yellow'],
        panelInfo: [
            {
            id: 1,
            panelContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Cursus eget nunc scelerisque viverra mauris. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Nisl vel pretium lectus quam id. Ultrices eros in cursus turpis massa. Mauris pharetra et ultrices neque. Tristique senectus et netus et malesuada fames ac turpis. Turpis tincidunt id aliquet risus feugiat in ante metus. Pellentesque habitant morbi tristique senectus et netus et malesuada.",
            headerTitle: "First Section",
            },
            {
            id: 2,
            panelContent: "Et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Ut enim blandit volutpat maecenas volutpat blandit. Mi ipsum faucibus vitae aliquet nec. Dui ut ornare lectus sit amet est placerat in. Convallis convallis tellus id interdum. Vitae aliquet nec ullamcorper sit amet risus. Eu mi bibendum neque egestas congue quisque egestas diam in. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Ullamcorper a lacus vestibulum sed. Vitae purus faucibus ornare suspendisse. Curabitur gravida arcu ac tortor dignissim convallis. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Id leo in vitae turpis massa sed. Faucibus interdum posuere lorem ipsum dolor.",
            headerTitle: "Second Section",
            }
        ]
    }
    
    describe('Button Unit Tests', () => {

        it('should have a role attribute set to button', () => {
            const {getAllByRole} = render(Accordion, {options})
            const buttons = getAllByRole('button')
            expect(buttons.length).toEqual(options.panelInfo.length)
        })

        it('should have no siblings', () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.nextElementSibling).toEqual(null)
        })

        it('should have an attribute aria-expanded initialized to false', () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.getAttribute('aria-expanded')).toEqual('false')
        })

        it('should toggle aria-expanded when clicked', async () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.getAttribute('aria-expanded')).toEqual('false')
            await fireEvent.click(button)
            expect(button.getAttribute('aria-expanded')).toEqual('true')
            await fireEvent.click(button)
            expect(button.getAttribute('aria-expanded')).toEqual('false')
        })

        it('should have an attribute aria-label that toggles between an empty string and panel contents when clicked', async () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.getAttribute('aria-label')).toEqual('')
            await fireEvent.click(button)
            expect(button.getAttribute('aria-label')).toEqual(options.panelInfo[0].panelContent)
            await fireEvent.click(button)
            expect(button.getAttribute('aria-label')).toEqual('')
        })

        it('should have a class name set to header-button', () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.getAttribute('class')).toContain('header-button')
        })

        it('should habe an id attribute set to button and the id number', () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.getAttribute('id')).toEqual(`button${options.panelInfo[0].id}`)
        })

        it('should have an attribute aria-controls set to the panel it controls', () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.getAttribute('aria-controls')).toEqual(`panel${options.panelInfo[0].id}`)
        })

        it('should be passed the styles string in the 0th index of the styles array', () => {
            const {getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            expect(button.getAttribute('style')).toEqual(options.styles[0])
        })
    })

    describe('Header Unit Tests', () => {

        it('should have a role attribute set to heading', () => {
            const {getAllByRole} = render(Accordion, {options})
            const headers = getAllByRole("heading")
            expect(headers.length).toEqual(options.panelInfo.length)
        })

        it('should have a class attribute set to accordion-header', () => {
            const {getAllByRole, getByText} = render(Accordion, {options})
            const heading = getAllByRole('heading')[0]
            expect(heading.getAttribute('class')).toContain('accordion-header')
        })

        it('should have a child that is a button', () => {
            const {getAllByRole, getByText} = render(Accordion, {options})
            const button = getByText('First Section')
            const heading = getAllByRole('heading')[0]
            expect(heading.firstChild).toBe(button)
        })

        it('should have an aria-level attribute set to appropriate header level number', () => {
            const {getAllByRole} = render(Accordion, {options})
            const heading = getAllByRole("heading")[0]
            expect(heading.getAttribute('aria-level')).toEqual(options.headerLevel.toString())
        })

        it('should be passed the styles string in the 0th index of the styles array', () => {
            const {getAllByRole} = render(Accordion, {options})
            const heading = getAllByRole("heading")[0]
            expect(heading.getAttribute('style')).toEqual(options.styles[0])
        })

    })    

    describe('Panel Unit Tests', () => {

        it('should have a role attribute set to region', () => {
            const {getAllByRole} = render(Accordion, {options})
            const panels = getAllByRole('region')
            expect(panels.length).toEqual(options.panelInfo.length)
        })

        it('should have an id attribute set to panel and the appropriate id number', () => {
            const {getAllByRole} = render(Accordion, {options})
            const panels = getAllByRole('region')
            expect(panels[0].getAttribute('id')).toEqual(`panel${options.panelInfo[0].id}`)
        })

        it('should have an aria-labelledby attribute set to the button labeling it', () => {
            const {getAllByRole} = render(Accordion, {options})
            const panels = getAllByRole('region')
            expect(panels[0].getAttribute('aria-labelledby')).toEqual(`button${options.panelInfo[0].id}`)
        })

        it('should have a class attribute set to accordion-panel', () => {
            const {getAllByRole} = render(Accordion, {options})
            const panels = getAllByRole('region')
            expect(panels[0].getAttribute('class')).toContain('accordion-panel')
        })

        it('should be passed the appropriate styles', () => {
            const {getAllByRole} = render(Accordion, {options})
            const panels = getAllByRole('region')
            expect(panels[0].getAttribute('style')).toEqual(options.styles[1])
        })

    })

    describe('Item Unit Tests', () => {

        it('should render one item for each panelInfo in options object', () => {
            const {} = render(Accordion, {options});
            const items = document.getElementsByClassName('accordion-item')
            expect(items.length).toEqual(options.panelInfo.length)
        })

        it('should have a data-state attribute set to collapsed initially, and should toggle to expanded when corresponding button is clicked', async () => {
            const {getByText} = render(Accordion, {options})
            const item = document.querySelector('.accordion-item')
            expect(item.getAttribute('data-state')).toBe('collapsed')
            await fireEvent.click(getByText('First Section'))
            expect(item.getAttribute('data-state')).toBe('expanded')
        })

        it('should have two children, the first being the button and the second the panel', () => {
            const {getByText, getAllByRole} = render(Accordion, {options})
            const item = document.querySelector('.accordion-item')
            const button = document.querySelector('#button1')
            const panel = document.querySelector('#panel1')
            const header = document.querySelectorAll('.accordion-header')[0]
            expect(item.firstChild).toBe(header)
            expect(item.firstChild.firstChild).toBe(button)
            expect(item.firstChild.nextElementSibling).toBe(panel)
            expect(item.firstChild.nextElementSibling.nextElementSibling).toEqual(null)
        })
    })

    describe('Accordion Unit Tests', () => {

        it('should have an aria-multiselectable attribute corresponding to that passed into the options object', () => {
            const {} = render(Accordion, {options})
            const accordion = document.getElementsByClassName('accordion-main')[0]
            expect(accordion.getAttribute('aria-multiselectable')).toEqual(`${options.multiselectable}`)
        })
    })

})


