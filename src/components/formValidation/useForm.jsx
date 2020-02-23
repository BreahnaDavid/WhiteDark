import { useState, useEffect } from 'react';

const useFrom = (callback, validation, initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onHandleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    setErrors(validation(values));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setValues(initialValues);
      callback();
    }
  }, [errors]);
  return {
    values,
    onHandleChange,
    onHandleSubmit,
    errors
  };
};

export default useFrom;
