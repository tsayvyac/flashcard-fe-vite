import * as yup from "yup";

export interface ErrorStateRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  existence: string;
}

export interface ErrorStateLogin {
  username: string;
  password: string;
  serverError: string;
}

const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=<>?])[A-Za-z\d!@#$%^&*()-_+=<>?]{8,}$/;
const usernamePattern = /^(?=.{5,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const usernamePatternNotMatch =
  'Username cannot contain any special characters. Except "." and "_".';
const passwordPatternNotMatch =
  "Password must contain minimum eight characters, at least one letter and one number";

export const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(20)
    .matches(usernamePattern, usernamePatternNotMatch)
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8)
    .max(64)
    .matches(passwordPattern, passwordPatternNotMatch)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(20)
    .matches(usernamePattern, usernamePatternNotMatch)
    .required("Username is required"),
  password: yup
    .string()
    .min(8)
    .max(64)
    .matches(passwordPattern, passwordPatternNotMatch)
    .required("Password is required"),
});
