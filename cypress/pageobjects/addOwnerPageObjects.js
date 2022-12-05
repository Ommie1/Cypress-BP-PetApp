class AddOwnerPageObjects {
  get firstName() {
    return cy.get("#firstName");
  }

  get lastName() {
    return cy.get("#lastName");
  }

  get address() {
    return cy.get("#address");
  }

  get city() {
    return cy.get("#city");
  }

  get telephone() {
    return cy.get("#telephone");
  }

  get addOwnerButton() {
    return cy.contains("Add Owner");
  }
}

export default AddOwnerPageObjects;
