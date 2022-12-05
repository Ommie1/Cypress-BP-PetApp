class HomePageObjects {
  get homeImage() {
    return cy.get(".img-responsive");
  }

  get veterinariansLink() {
    return cy.contains("Veterinarians");
  }

  get findOwnerLink() {
    return cy.contains("Find owners");
  }
}

export default HomePageObjects;
