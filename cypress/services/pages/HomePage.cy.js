import * as googleSelectors from '/cypress/selectors/google-selectors.json'
class HomePage
{
    getInputField(){
        return cy.get(googleSelectors.searchInput)
    }

    getInputTextField(){
        return cy.xpath(googleSelectors.searchByXpath)
    }

}
export default new HomePage()