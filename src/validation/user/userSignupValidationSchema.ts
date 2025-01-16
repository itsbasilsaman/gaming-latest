import * as Yup from "yup";


export const userSignupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.string().required("Country is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string()
  .email("Invalid email address")
  .required("Email is required"),
  gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
});