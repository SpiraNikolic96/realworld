import homePage from '../pages/HomePage'
class GoogleSteps {
    searchInGoogle(searchTestData) {
        homePage.getInputTextField()
            .type(searchTestData)
            .type('{enter}')
    };

    searchInGoogleCss(searchData) {
        homePage.getInputField()
            .type(searchData)
            .type('{enter}')
    }


}
export default new GoogleSteps()