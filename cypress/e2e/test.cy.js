import HomePageObjects from "../pageobjects/homePageObjects";
import VeterianiansPageObjects from "../pageobjects/veteriniansPageObjects";
import OwnerPageObjects from "../pageobjects/ownerPageObjects";
import AddOwnerPageObjects from "../pageobjects/addOwnerPageObjects";
import OwnerInfoPageObjects from "../pageobjects/ownerInfoPageObjects";
import AddPetPageObjects from "../pageobjects/addPetPageObjects";
import FindOwnerPageObjects from "../pageobjects/findOwnerPageObjects";

const faker = require("faker");
const homeObj = new HomePageObjects();
const veterObj = new VeterianiansPageObjects();
const ownerObj = new OwnerPageObjects();
const addOwnerObj = new AddOwnerPageObjects();
const ownerInfoObj = new OwnerInfoPageObjects();
const addPetObj = new AddPetPageObjects();
const findOwnerObj = new FindOwnerPageObjects();

describe("Learner portal - Infographics UI suite", () => {
  beforeEach(function () {
    cy.fixture("project.json").then(function (data) {
      cy.visit(data.baseURL);
    });
  });

  const firstName = faker.Name.findName();
  const lastName = faker.Name.lastName();
  const ownerAddress = faker.Address.streetAddress();
  const ownerCity = faker.Address.city();
  const ownerPhoneNumber = 1234567890;
  const petName = "Tommy";
  const petDOB = "2011-02-23";
  const petType = "dog";

  it("Verify image on home page", function () {
    // Added assertion on home image class
    homeObj.homeImage.should("be.visible");
  });

  it("Find all the Veterinarians which are added in the application", function () {
    // Get all the verterians list and added assertion in verterians section class
    let veterinariansList = [
      "James Carter",
      "Helen Leary",
      "Linda Douglas",
      "Rafael Ortega",
      "Henry Stevens",
      "Sharon Jenkins",
    ];
    homeObj.veterinariansLink.click();
    for (let i = 0; i < veterinariansList.length; i++) {
      veterObj.veteriniansSection.contains(veterinariansList[i]);
    }
  });

  it("Find all the existing owners which are added in application", function () {
    // All the owner name will be stores in ownername.txt file on cypress root folder
    cy.fixture("alphabet.json").then(function (data) {
      let ownersInfo = [];
      for (const name in data.alphabet) {
        homeObj.findOwnerLink.click();
        addOwnerObj.lastName.clear().type(`${data.alphabet[name]}`);
        findOwnerObj.findOwnerButton.click();
        cy.get("body").then(($body) => {
          if (!$body.text().includes("has not been found")) {
            if ($body.text().includes("Owner Information")) {
              cy.get("td")
                .first()
                .then(($el) => {
                  ownersInfo.push($el.text());
                });
            } else {
              cy.get("tbody > tr").each(($el) => {
                ownersInfo.push($el.find("td").first().text());
              });
            }
          }
        });
      }
      cy.log(ownersInfo);
      cy.writeFile("cypress/ownername.txt", ownersInfo);
    });
  });

  it("Add a new owner, add pet for that owner", function () {
    // Used faker js for generating test data
    homeObj.findOwnerLink.click();
    ownerObj.addOwnerButton.click();
    addOwnerObj.firstName.type(firstName);
    addOwnerObj.lastName.type(lastName);
    addOwnerObj.address.type(ownerAddress);
    addOwnerObj.city.type(ownerCity);
    addOwnerObj.telephone.type(ownerPhoneNumber);
    addOwnerObj.addOwnerButton.click();
    ownerInfoObj.addPetButton.click();
    addPetObj.petName.type(petName);
    addPetObj.petBirthDate.type(petDOB);
    addPetObj.petType.select(petType);
    addPetObj.addPetButton.click();
  });

  it("Check all the information added for the newly created owner and pet is correct", function () {
    homeObj.findOwnerLink.click();
    findOwnerObj.searchBox.type(lastName);
    findOwnerObj.findOwnerButton.click();
    ownerInfoObj.petAndOwnerInfo
      .should("contain", `${firstName} ${lastName}`)
      .and("contain", ownerAddress)
      .and("contain", ownerCity)
      .and("contain", ownerPhoneNumber)
      .and("contain", petName)
      .and("contain", petDOB)
      .and("contain", petType);
  });
});
