import RegistrationPageObjects from "../pageobjects/userRegistrationPageObject.js";

const registrationObj = new RegistrationPageObjects();

describe("User Registration scenarios", () => {
  beforeEach(function () {
    cy.fixture("registrationTestdata").then(function (data) {
      this.testData = data;
      cy.visit(this.testData.baseURL);
    });
  });

  it("To verify that username field should accept minimum 5 characters", function () {
    registrationObj.userNameInput.type(this.testData.minCharacter);
    registrationObj.userNameErrorMsg.should(
      "not.have.value",
      this.testData.usernameErrorMessage
    );
  });

  it("To verify that username field should not accept less than 5 characters", function () {
    registrationObj.userNameInput.type(this.testData.lessThanMinCharacter);
    registrationObj.userNameErrorMsg
      .should("have.text", this.testData.usernameErrorMessage)
      .and("be.visible");
  });

  it("To verify that username field should accept maximum 30 characters ", function () {
    registrationObj.userNameInput.type(this.testData.maxCharacter);
    registrationObj.userNameErrorMsg
      .should("not.have.value", this.testData.usernameErrorMessage)
      .and("not.be.visible");
  });

  it("To verify that username field should not accept greater than 30 characters", function () {
    registrationObj.userNameInput.type(this.testData.greaterThanMaxCharacter);
    registrationObj.userNameErrorMsg
      .should("not.have.value", this.testData.usernameErrorMessage)
      .and("not.be.visible");
  });

  it("To verify that username field should accept alphanumeric character only", function () {
    registrationObj.userNameInput.type(this.testData.alphnumericCharacter);
    registrationObj.userNameErrorMsg
      .should("not.have.value", this.testData.usernameErrorMessage)
      .and("not.be.visible");
  });

  it("To verify that username field should not accept special characters", function () {
    registrationObj.userNameInput.type(this.testData.specialCharacter);
    registrationObj.userNameErrorMsg
      .should("be.visible")
      .and("have.text", this.testData.usernameErrorMessage);
  });

  it("To verify that username field should not accept combination of numeric, alphabets and special character", function () {
    registrationObj.userNameInput.type(this.testData.combineCharacter);
    registrationObj.userNameErrorMsg
      .should("be.visible")
      .and("have.text", this.testData.usernameErrorMessage);
  });

  it("To verify that email field should accept valid email address format", function () {
    registrationObj.emailAddress.type(this.testData.email);
    registrationObj.emailErrMsg
      .should("not.be.visible")
      .and("not.have.value", this.testData.usernameErrorMessage);
  });

  it("To verify that email field should not accept invalid email address format", function () {
    registrationObj.emailAddress.type(this.testData.invalidEmail);
    registrationObj.emailErrMsg
      .should("be.visible")
      .and("have.text", this.testData.emailErrorMessage);
  });

  it("To verify that password length should be atleast 5 character", function () {
    registrationObj.password.type(this.testData.password);
    registrationObj.passwordSuggestion.should("be.visible");
  });

  it("To verify that password field will show error message if the character length is less than 5", function () {
    registrationObj.password.type(this.testData.passMinCharachter);
    registrationObj.passwordErrMsg
      .should("be.visible")
      .and("have.text", this.testData.passwordErrorMessage);
  });

  it("To verify that password should be hidden when user enters the input", function () {
    registrationObj.password.type(this.testData.password);
    registrationObj.hiddenPassTag.should("be.visible");
  });

  it("To verify that validation message appears when user enter different inputs in password and confirm password field", function () {
    registrationObj.password.type(this.testData.password);
    registrationObj.confirmPassword.type(this.testData.unmatchPass);
    registrationObj.matchPassErrMsg
      .should("be.visible")
      .and("have.text", this.testData.passwordMismatchError);
  });

  it("To verify that term and condition checkbox is present", function () {
    registrationObj.termsAndCondition
      .should("be.visible")
      .and("include.text", this.testData.termsAndConditionText);
  });

  it("To verify that when user does not check the term and condition then validation message will appear", function () {
    registrationObj.submitButton.click();
    cy.scrollTo("bottom");
    registrationObj.termsAndConditionErrMsg
      .should("be.visible")
      .and("include.text", this.testData.termAndConditionError);
  });

  it("To verify that news letter checkbox is present", function () {
    registrationObj.subscription
      .should("be.visible")
      .and("include.text", this.testData.newLetterText);
  });

  it("To verify that already account text is present with sign in link", function () {
    registrationObj.alreadyAccountText
      .should("be.visible")
      .and("include.text", this.testData.newLetterText);
    registrationObj.signInLink.should("be.visible");
  });

  it("To verify that captch is present.", function () {
    registrationObj.captach.should("be.visible");
  });
});
