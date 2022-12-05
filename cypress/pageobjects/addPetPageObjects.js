class AddPetPageObjects {
  get petName() {
    return cy.get("#name");
  }

  get petBirthDate() {
    return cy.get("#birthDate");
  }

  get petType() {
    return cy.get("select");
  }

  get addPetButton() {
    return cy.contains("Add Pet");
  }
}

export default AddPetPageObjects;
