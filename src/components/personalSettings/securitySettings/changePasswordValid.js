export default function changePasswordValid(values) {
  let errors = {};
  if (!values.oldpassword)
    errors.oldpassword = 'Old password email is required';
  if (!values.newpassword) errors.newpassword = 'New password is required';
  else if (values.newpassword.length < 6)
    errors.newpassword = 'Password is too short';
  if (!values.confirmPassword)
    errors.confirmPassword = 'Cinfirmation is required';
  else if (values.confirmPassword !== values.newpassword)
    errors.confirmPassword = 'Different password';
  return errors;
}
