import { useState, useCallback } from 'react';

/**
 * Hook untuk mengelola state dan validasi form
 * @param {Object} options - Opsi konfigurasi
 * @param {Object} options.initialValues - Nilai awal form
 * @param {Function} options.validate - Fungsi validasi (opsional)
 * @param {Function} options.onSubmit - Fungsi yang dipanggil saat form valid dan disubmit
 * @returns {Object} - { values, errors, touched, handleChange, handleBlur, handleSubmit, reset, isSubmitting }
 */
export const useForm = (options = {}) => {
  const {
    initialValues = {},
    validate = () => ({}),
    onSubmit = () => {}
  } = options;
  
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validasi form
  const validateForm = useCallback(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);
  
  // Handler untuk perubahan input
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);
  
  // Handler untuk input yang kehilangan fokus
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
    
    validateForm();
  }, [validateForm]);
  
  // Handler untuk submit form
  const handleSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    
    setTouched(
      Object.keys(values).reduce((touched, field) => {
        touched[field] = true;
        return touched;
      }, {})
    );
    
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitting(true);
      
      // Panggil onSubmit dengan values dan helper functions
      const submitResult = onSubmit(values, {
        setValues,
        setErrors,
        setIsSubmitting,
        resetForm
      });
      
      // Handle jika onSubmit mengembalikan Promise
      if (submitResult && typeof submitResult.then === 'function') {
        submitResult
          .then(() => {
            setIsSubmitting(false);
          })
          .catch(error => {
            setIsSubmitting(false);
            // Jika error adalah object, gunakan sebagai error form
            if (error && typeof error === 'object') {
              setErrors(prev => ({ ...prev, ...error }));
            } else {
              setErrors(prev => ({ ...prev, form: error?.message || 'Terjadi kesalahan' }));
            }
          });
      } else {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit]);
  
  // Reset form ke nilai awal
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Set nilai form secara manual
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);
  
  // Set error form secara manual
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset: resetForm,
    isSubmitting,
    isValid: Object.keys(errors).length === 0
  };
};