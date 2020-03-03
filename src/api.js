import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://immense-spire-51689.herokuapp.com',
  withCredentials: true
});

export const userAPI = {
  userLogin: (email, password) => instance.post('/signin', { email, password }),
  userLogout: () => instance.delete('/logout'),
  userRegister: data => instance.post('/signup', data),
  userCheckAuth: () => instance.post('/auth/me', { status: 'checkauth' }),
  updateUserData: data => instance.post('/update/data', data),
  changePassword: data => instance.post('/update/password', data),
  changeEmail: data => instance.post('/update/email', data),
  deleteAccount: password => instance.post('/delete', { password }),
  saveFormSchema: data => instance.post('/save/form-schema', data),
  getFromsData: () => instance.get('/get-forms'),
  saveFormData: data => instance.post('/save/form-data', data),
  deleteFormSchema: id => instance.post('/delete/form-schema', { id: id })
};
