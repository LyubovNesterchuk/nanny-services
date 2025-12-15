import * as yup from "yup";

export const authSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});