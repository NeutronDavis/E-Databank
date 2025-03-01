import * as yup from "yup";

export const ProfileValidationSchema = yup.object().shape({
      otherName: yup.string().required("Your other names is required"),
      lastName:yup.string().required("Your last name is required"),
      email : yup.string().email("Please enter a valid email").required("Your email is required").min(8, 'invalid phone number'),   
      phoneNumber: yup.number().required("Your phone number is required").nullable(),
      dateOfBirth: yup.string().required("Your year of birth is required")
  })
export const ResetEmailValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Your email is required")
})

export const ResetPhoneNumberValidation = yup.object().shape({
  phoneNumber: yup.string().required("Your phone number is required").min(8, 'invalid phone number')
})
  export const ResetPasswordValidationSchema = yup.object().shape({
      oldPassword: yup.string().required("enter your password"),
      newPassword: yup.string().required("enter your password"),
      confirmPassword: yup.string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });
  export const FeedbackValidationSchema = yup.object().shape({
    feedbackCategory: yup.string().required("Category is required"),
    feedbackText: yup.string().required("message is required"),
  });
  export const FeedbackActionTakenValidationSchema = yup.object().shape({
    feedbackActionTaken: yup.string().required("An action message is required"),
  });
export interface IProfile{
  firstName:string,
  lastName:string,
  email:string,
  phoneNumber:string,
  title: string,
  gender: string,
  genoType: string,
  bloodGroup: string
}


export interface IImage{
	ProfilePics:string
}