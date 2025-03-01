

import * as yup from "yup";
export const PasswordResetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Your email is required"),
});

export const RegisterValidationSchema = yup.object().shape({
  otherName: yup.string().required("Your other names is required"),
  lastName: yup.string().required("Your Last Name  is required"),
  gender: yup.string().required("Your gender  is required"),
  branchId: yup.number().required("Branch is not selected").nullable(),
  bandId: yup.number().required("Band / association is not selected").nullable(),
  principalBandId: yup.number().required("principalBand is not selected").nullable(),
  rankId: yup.number().required("Rank is not selected").nullable(),
  nationality1Id: yup.number().required("nationality 1 is not selected").nullable(),
  nationality2Id: yup.number().required("nationality 2 is not selected").nullable(),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Your email is required"),
    phoneNumber: yup.string().required("Your phone number is required").min(8, 'invalid phone number'),
    password: yup.string().required("enter your password"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const LoginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Your full name is required"),

  password: yup.string().required("Your password is required"),
});

export const TokenValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Your email is required"),

  password: yup.string().required("Your password is required"),
  token: yup.string().required("Your one-time password verification token (OTP) is required"),
});

export interface ILogin{
    username:string,
    password: string,
  }

export interface IRegister{
    title:string,
    otherName:string,
    lastName: string,
    gender: string,
    email: string,
    phoneNumber: string,
    branchId:number | undefined,
    bandId:number | undefined,
    principalBandId:number | undefined,
    rankId:number | undefined,
    nationality1Id:number | undefined,
    nationality2Id:number | undefined,
    professionId:number | undefined,
    qualificationId:number | undefined,
    password:string,
    confirmPassword:string,
    acceptTerms:boolean

   }

   export interface IResetPassword{
    email: string,
   }
   export interface ITokenValidation {
    email: string;
    password: string;
    token: string;
  }