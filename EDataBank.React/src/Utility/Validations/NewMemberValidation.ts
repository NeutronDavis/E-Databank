import * as yup from "yup";
export const newMemberValidation = yup.object().shape({
    title: yup.string().required("Member's title is required"),
    otherName: yup.string().required("Member's other names are required"),
    lastName: yup.string().required("Member's last names is required"),
    email: yup.string().email().required("Member's email is required"),
    phone: yup.string().required("Member's phone number is required"),
    dateOfBirth:yup.string().required("Member's date of birth is required"),
    gender:yup.string().required("Member's gender is required"),
    address:yup.string().required("Member's address is required"),

    rankId:yup.string().required("Member's current rank is required"),
    branchId:yup.string().required("Member's branch is required"),
    bandId:yup.string().required("Member's band is required"),
    principalBandId:yup.string().required("Member's principal band is required"),
    cPPInChurch:yup.string().required("Member's CPPInChurch is required"),
    ordinationYear:yup.string().required("Member's ordination year is required"),
});
