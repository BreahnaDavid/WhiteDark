const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function validateRegister(values) {
  let errors = {};
  if (!values.email) errors.email = 'Email is required';
  else if (!emailValidation.test(values.email))
    errors.email = 'Email is invalid';
  if (!values.password) errors.password = 'Password is required';
  else if (values.password.length < 6)
    errors.password = 'Password is too short';
  return errors;
}
