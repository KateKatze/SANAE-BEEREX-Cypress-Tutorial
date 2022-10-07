describe('frontend part of habit workshop', () => {

    it('should test search form', () => {
        const finalDestination = "Honolulu"
        cy.visit("https://www.kiwi.com/en/")
        cy.log("Accept cookies pop up ")
        cy.get("[data-test=CookiesPopup-Accept]").click()
        cy.get("[data-test=CookiesPopup] div").should("not.exist")

        cy.log("Type city into search field, wait for results and select destination")
        cy.get("[data-test=SearchPlaceField-destination]").type(finalDestination)
        cy.intercept({
            method: "GET",
            url: /featureName=StationsQuery/,
        }).as("results")
        cy.wait("@results")
        cy.get("[data-test=PlacePickerRow-wrapper]").first().click()

        cy.log("check that changes occured")
        cy.get("[data-test=PlacePickerInput-destination]").should("contain", finalDestination)
        cy.url().should("contain", finalDestination.toLowerCase())

        cy.log("Uncheck Booking.com checkbox and look for results")
        cy.get("[type=checkbox]").uncheck({ force: true })
        cy.get("[data-test=LandingSearchButton]").click()
        cy.url().should("contain", "/search/results/")
    })

})