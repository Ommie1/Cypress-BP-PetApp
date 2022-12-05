class FindOwnerPageObject {
  get searchBox() {
    return cy.get("#lastName");
  }

  get findOwnerButton() {
    return cy.get(".col-sm-offset-2 > .btn");
  }
}

export default FindOwnerPageObject;
