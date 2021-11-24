export const isInfo = (values) => {
  let errors = {};
  if (!values.companyName) {
    errors.companyName = "Company name is required";
  }
  if (!values.employerName) {
    errors.employerName = "Employer name is required";
  }
  if (!values.employerRole) {
    errors.employerRole = "Role is required";
  }
  if (!values.city) {
    errors.city = "city is required";
  }
  if (!values.state) {
    errors.state = "State is required";
  }
  if (!values.streetAddress) {
    errors.streetAddress = "Street Address is required";
  }
  if (!values.zipCode) {
    errors.zipCode = "Zip code is required";
  }
  if (!values.country) {
    errors.country = "Country is required";
  }

  // if (!values.aboutTheCompany.companySize) {
  //   errors.companySize = "Company Size is required";
  // }
  // if (!values.website) {
  //   errors.website = "Website is required";
  // }
  // if (!values.companyType) {
  //   errors.companyType = "Company Type is required";
  // }
  // if (values.phoneNumber && values.phoneNumber.length < 11) {
  //   errors.phoneNumber = "Enter valid phone number";
  // }
  // if (!values.email) {
  //   errors.email = "Email address is required";
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = "Email address is invalid";
  // }
  return errors;
};
