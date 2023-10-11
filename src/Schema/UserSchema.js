import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  status: Yup.boolean(),
  language: Yup.string().nullable(""),
  password: Yup.string()
    .nullable()
    .min(8, "Password must be at least 8 characters long"),
});
