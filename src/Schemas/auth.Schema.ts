import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "min length is 3 chars")
      .max(10, "max length is 10 chars"),
    email: zod
      .string()
      .nonempty("email is required")
      .pipe(zod.email("invalid email")),
    dateOfBirth: zod
      .string()
      .nonempty("date is required")
      .refine((dateOfBirthValue) => {
        const userDate = new Date(dateOfBirthValue).getFullYear();
        const nowDate = new Date().getFullYear();
        return nowDate - userDate > 10 ? true : false;
      }, "Date should be more than 2015"),
    gender: zod.enum(["male", "female"]),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
        "min 8 chars with upper, lower and a number",
      ),
    rePassword: zod.string().nonempty("repassword is required"),
  })
  .refine(
    (obj) => {
      if (obj.password === obj.rePassword) {
        return true;
      } else {
        return false;
      }
    },
    {
      path: ["rePassword"],
      error: "password and repassword not match",
    },
  );
export type registerSchemaType = zod.infer<typeof registerSchema>;



////////////////////////////////////////////////////////////////////////



export const LoginSchema = zod
  .object({
    email: zod
      .string()
      .nonempty("email is required")
      .pipe(zod.email("invalid email")),

    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
        "min 8 chars with upper, lower and a number",
      )
   
  })
 
export type LoginSchemaType = zod.infer<typeof LoginSchema>;