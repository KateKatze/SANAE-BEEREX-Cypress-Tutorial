describe('frontend part of habit workshop', () => {

    it('should test interaction with elements', () => {
        cy.visit("https://www.kiwi.com/en/")

        cy.log("Cookies pop up appeared and accepted")
        cy.get("[data-test=CookiesPopup-Accept]").click()
        cy.get("[data-test=CookiesPopup").should("not.exist")

        cy.log("Type and select destination")
        cy.get("[data-test=SearchPlaceField-destination]").type("Honolulu")
        cy.get("[data-test=PlacePickerRow-wrapper]").first().click()
    })

    it("should test search button", () => {

        cy.log("Unchecking the checkbox and look for a flight")
        cy.get("[type=checkbox]").uncheck({ force: true })
        cy.get("[data-test=LandingSearchButton]").click()
    })

})