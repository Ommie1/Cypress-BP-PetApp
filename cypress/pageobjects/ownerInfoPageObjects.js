class OwnerInfoPageObjects {
  get addPetButton() {
    return cy.contains("Add New Pet");
  }

  get petAndOwnerInfo() {
    return cy.get("table");
  }
}

export default OwnerInfoPageObjects;
