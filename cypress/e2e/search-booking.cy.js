/// <reference types="cypress" />

it('👶 Infant cannot add baggage (UI)', () => {

    //cy.log('**disable booking extension button**')
    //window.localStorage.setItem('bookingcom_extension_default', 'false')

    cy.setCookie('__kwc_agreed', 'true')

    cy.request('https://api.skypicker.com/flights?partner=cypress&fly_from=VIE&fly_to=HND')
        .then(response => {
            const fligths = response.body.data;
            expect(fligths.length, "checking num of flights returned").is.greaterThan(0)

            cy.visit({
                url: 'https://www.kiwi.com/en/booking',
                qs: {
                    token: response.body.data[0].booking_token
                }
            })
        })

    /*
    cy.log('**disable booking extension button**')
        cy.get('[type="checkbox"]')
             .as('checkbox')
             .invoke('is', ':checked') // use jQuery $.is(...)
             .then((initial) => {
                 cy.log(`Initial checkbox: **${initial}**`)
                 if (initial) {
                     cy.get('@checkbox').uncheck({ force: true })
                 }
             }) 

    cy.log('**enter destination**')
    cy.get('[data-test="SearchPlaceField-destination"]')
        .find('[data-test="SearchField-input"]')
        .type('Tokyo')
    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .should('be.visible')
        .contains('Tokyo')
        .click()
    cy.log('**destination chosen**')

    cy.get('[data-test="LandingSearchButton"]')
        .should('have.text', 'Search')
        .click()

    cy.log('**select flight**')

    cy.get('[data-test="ResultCardWrapper"]', { timeout: 10000 })
        .should('be.visible')
        .first()
        .find('[data-test="BookingButton"]')
        .click()
    cy.contains('Continue as a guest').click()
    */

    cy.log('**check behavior**')
    cy.get('[data-test="ReservationPassenger"]', { timeout: 10000 }).should('be.visible').within(() => {
        cy.get('[data-test="passenger-category-select"]').select('infant')
            // cy.get('[data-test=BaggagePickerNewDesign-handBag] > [data-test=BaggagePickerNewDesign-EmptyOption]')
            //  .should('have.text', 'Personal items and cabin baggage are not available for infant passengers.')
        cy.get('[data-test="BaggagePickerNewDesign-holdBag"] > [data-test="BaggagePickerNewDesign-EmptyOption"]')
            .should('have.text', 'Checked baggage is not available for infant passengers.')
    })
})