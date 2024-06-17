import * as yup from "yup";

export const createUserValidation = yup.object({
  body: yup.object({
    name: yup.string().required("NAME_REQUIRED"),
    email: yup.string().required("EMAIL_REQUIRED"),
    cpf: yup.string().required("CPF_REQUIRED"),
    password: yup.string().required("PASSWORD_REQUIRED").min(8, "PASSWORD_MINIMUM_8_CHARACTERS"),
    biography: yup.string().optional(),
    img: yup.string().optional(),
  }),
});


