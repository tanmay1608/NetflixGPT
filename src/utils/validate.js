import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
import { validateName } from "./validateName";

export const checkValidData = (email, password, name) => {
  const isEmailValid = validateEmail(email);
  if (isEmailValid !== null) return isEmailValid;

  const isPasswordValid = validatePassword(password);
  if (isPasswordValid !== null) return isPasswordValid;

  const isNameValid = validateName(name);
  if (isNameValid !== null) return isNameValid;

  return null;
};
