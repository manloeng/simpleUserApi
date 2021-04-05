const { validateEmail } = require("../src/utils/validator");

describe("Validation Unit test", () => {
  describe("validateEmail", () => {
    it("Returns false when passed with an valid email", () => {
      const isEmailValid = validateEmail("test@test.com");
      expect(isEmailValid).toBeTruthy();
    });

    it("Returns false when passed with an valid email", () => {
      const isEmailValid = validateEmail("test@test.com.hk");
      expect(isEmailValid).toBeTruthy();
    });

    it("Returns false when passed with no data", () => {
      const isEmailValid = validateEmail();
      expect(isEmailValid).toBeFalsy();
    });

    it("Returns false when passed with an invalid email", () => {
      const isEmailValid = validateEmail("a");
      expect(isEmailValid).toBeFalsy();
    });

    it("Returns false when passed with an invalid email", () => {
      const isEmailValid = validateEmail("adsaad@adsad");
      expect(isEmailValid).toBeFalsy();
    });
  });
});
