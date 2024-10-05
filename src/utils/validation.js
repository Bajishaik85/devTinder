const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a Strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const allowEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => {
    allowEditFields.includes(field);
  });
  return isEditAllowed;
};
module.exports = { validateSignUpData, validateEditProfileData };
