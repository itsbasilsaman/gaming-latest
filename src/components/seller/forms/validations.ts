import * as Yup from 'yup';

export const SellerCreationValidationSchema = Yup.object({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string()
      .matches(/^\d{5}$/, 'Zip code must be exactly 5 digits')
      .required('Zip code is required'),
    dob: Yup.date()
      .required('Date of Birth is required')
      .test('age', 'You must be at least 18 years old', (value) => {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }),
  });