const faker = require("faker");

describe("Learner portal - Infographics UI suite", () => {
  beforeEach(function () {
    cy.fixture("shop.json").then(function (data) {
      cy.visit(data.baseURL);
    });
  });

  const firstName = faker.Name.findName();
  const lastName = faker.Name.lastName();

  it("Resigtration Flow", function () {
    console.log("Hello");
    cy.get(":nth-child(2) > .dropdown > .dropdown-toggle > .d-none").click();
    cy.get(
      ":nth-child(2) > .dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item"
    ).click();
    cy.get("#input-firstname").type(firstName);
    cy.get("#input-lastname").type(lastName);
    cy.get("#input-email").type(firstName + "@gmail.com");
    cy.get("#input-password").type("test123");
    cy.scrollTo("bottom");
    cy.wait(2000);
    cy.get(".float-end > .form-check > .form-check-input").click();
    cy.get(".float-end > .btn").click();
    cy.get("h1")
      .should("have.text", "Your Account Has Been Created!")
      .and("be.visible");
  });
});
