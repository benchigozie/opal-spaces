import * as Yup from "yup";

export const checkoutSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),

  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),

  city: Yup.string().required("City is required"),
  
  postalCode: Yup.string()
    .matches(/^[0-9]{4,6}$/, "Postal code must be 4–6 digits")
    .required("Postal code is required"),
});
