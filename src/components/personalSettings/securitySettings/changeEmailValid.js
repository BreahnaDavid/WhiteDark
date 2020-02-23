const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function validateRegister(values) {
  let errors = {};
  if (!values.oldemail) errors.oldemail = 'Old email is required';
  if (!values.newemail) errors.newemail = 'Newemail is required';
  else if (!emailValidation.test(values.newemail))
    errors.newemail = 'Newemail is invalid';
  return errors;
}
