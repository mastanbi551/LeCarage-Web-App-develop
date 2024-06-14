import * as Yup from 'yup';

const nameRegex =
  /^(?!.*(?:^[\s.'’‘\^`-]|[.'’‘\^`-]{2,}))(?!.*\s{2,})[\p{L}\s.'’‘\^`-]*(?<![\s'])$/u;
const licenseNoExp = /^[A-Za-z0-9]{1,3}-[A-Za-z0-9]{2,3}-[A-Za-z0-9]{1,2}$/;
const postalCodeRegex = /^[A-Za-z0-9-. ]+$/;///^([0-9]{4} |[0-9]{4})[A-Za-z]{2}$/;
const letterAndSpace = /^[A-Za-z ]+$/;
const phoneNumberRegex = /^(\+\d{1,3})\d{10}$/;
const emailRegex = /^[a-zA-Z0-9]+([a-zA-Z0-9+_.-]*[a-zA-Z0-9])*@[a-zA-Z.]+$/;
const lowercaseNotAllowedRegex = /^[^a-z]*$/;
const specialCharacterNotAllowedRegex = /^[a-zA-Z0-9\s\-\/.,()`]+$/;
const cityNameRegex = /^[A-Za-z\s\^\`\-]*$/;
const alphanumericAndDiacriticsAllowed =
  /^[a-zA-Z0-9\p{L}\p{M}\p{N}\p{P}\p{S}\p{Z}]*$/u;
const alphanumericAllowed = /^[a-zA-Z0-9\s]+$/;

export const OtpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('enter OTP')
    .matches(/^\d+$/, 'only digits allowed')
    .min(6, 'must be 6 digits')
    .max(6, 'must be 6 digits'),
});

export const EmailValidation = Yup.string()
  .required('enter email address')
  .matches(emailRegex, 'enter correct email address');

export const ForgotPasswordEmailValidation = Yup.string().required(
  'enter email address'
);

export const PasswordValidation = Yup.string()
  .required('enter valid password')
  .min(8, 'minimum 8 characters')
  .matches(/[0-9]/, 'should contain atleast 1 number')
  .matches(/[a-z]/, 'should contain atleast 1 lower case letter')
  .matches(/[A-Z]/, 'should contain atleast 1 uppercase letter')
  .matches(/[^\w]/, 'should contain atleast 1 special character');

export const MobileValidation = Yup.string()
  .required('enter correct mobile number')
  .matches(phoneNumberRegex, 'enter valid mobile number');

export const CustomerPasswordValidation = Yup.string()
  .required('enter valid password')
  .matches(/^\+?\d{11,}$/, 'enter valid password');

export const ForgotPasswordSchema = Yup.object().shape({
  email: ForgotPasswordEmailValidation,
});

export const LoginSchema = Yup.object().shape({
  email: EmailValidation,
  password: Yup.string().required('enter password'),
});

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: PasswordValidation,
  confirmNewPassword: Yup.string()
    .required('confirm new password')
    .oneOf([Yup.ref('newPassword'), null], 'passwords must match'),
});

export const FirstNameValidation = Yup.string()
  .required('enter first name')
  .matches(nameRegex, 'character not allowed')
  .min(2, 'minimum 2 characters required');

export const LastNameValidation = Yup.string()
  .required('enter first name')
  .matches(nameRegex, 'character not allowed')
  .min(2, 'minimum 2 characters required');

export const AddressDetailsSchema = Yup.array().of(
  Yup.object().shape({
    addressLineOne: Yup.string()
      .required('enter a short name')
      .matches(
        alphanumericAndDiacriticsAllowed,
        'special characters not allowed'
      ),
    streetName: Yup.string()
      .required('enter street name')
      .matches(
        alphanumericAndDiacriticsAllowed,
        'special characters not allowed'
      ),
    houseNumber: Yup.string()
      .required('enter house number')
      .matches(
        alphanumericAllowed,
        'special characters not allowed'
      ).notOneOf(['0', '00'], 'enter valid house number'),
    postalCode: Yup.string()
      .required('enter postal code')
      .min(6, 'minimum 6 characters required')
      .matches(postalCodeRegex, 'incorrect postal code'),
    cityName: Yup.string()
      .required('enter city')
      .matches(alphanumericAndDiacriticsAllowed, 'special characters not allowed'),
  })
);

export const CreateCustomerPageSchema = Yup.object().shape({
  profile: Yup.object().shape({
    firstName: FirstNameValidation,
    lastName: LastNameValidation,
    email: EmailValidation,
    phoneNumber: MobileValidation,
    password: PasswordValidation,
    statusId: Yup.number().required('select status'),
  }),
  address: Yup.array().of(
    Yup.object().shape({
      addressLineOne: Yup.string()
      .required('enter address type')
      .matches(
        alphanumericAndDiacriticsAllowed,
        'special characters not allowed'
      ),
    streetName: Yup.string()
      .required('enter street name')
      .matches(
        alphanumericAndDiacriticsAllowed,
        'special characters not allowed'
      ),
    houseNumber: Yup.string()
      .required('enter house number')
      .matches(
        alphanumericAllowed,
        'special characters not allowed'
      ).notOneOf(['0', '00'], 'enter valid house number'),
    postalCode: Yup.string()
      .required('enter postal code')
      .min(6, 'minimum 6 characters required')
      .matches(postalCodeRegex, 'incorrect postal code'),
    cityName: Yup.string()
      .required('enter city')
      .matches(alphanumericAndDiacriticsAllowed, 'special characters not allowed'),
    })
  ),
});

export const EditCustomerPageSchema = Yup.object().shape({
  profile: Yup.object().shape({
    firstName: FirstNameValidation,
    lastName: LastNameValidation,
    email: Yup.string().email('invalid email address').required('enter email'),
    phoneNumber: MobileValidation,
    statusId: Yup.number().required('select status'),
  }),
  address: Yup.array().of(
    Yup.object().shape({
      addressLineOne: Yup.string()
      .required('enter address type')
      .matches(
        alphanumericAndDiacriticsAllowed,
        'special characters not allowed'
      ),
    streetName: Yup.string()
      .required('enter street name')
      .matches(
        alphanumericAndDiacriticsAllowed,
        'special characters not allowed'
      ),
    houseNumber: Yup.string()
      .required('enter house number')
      .matches(
        alphanumericAllowed,
        'special characters not allowed'
      ).notOneOf(['0', '00'], 'enter valid house number'),
    postalCode: Yup.string()
      .required('enter postal code')
      .min(6, 'minimum 6 characters required')
      .matches(postalCodeRegex, 'incorrect postal code'),
    cityName: Yup.string()
      .required('enter city')
      .matches(alphanumericAndDiacriticsAllowed, 'special characters not allowed'),
    })
  ),
});

export const UserTypesPageValidation = Yup.object().shape({
  userType: Yup.string()
    .required('enter user type')
    .min(2, 'minimum 2 characters required'),
  description: Yup.string().required('enter description'),
  statusId: Yup.string().required('select status'),
  // features: Yup.array()
  //   .min(1, 'At least one feature is required')
  //   .of(
  //     Yup.object().shape({
  //       featureId: Yup.number().required('Feature ID is required'),
  //       accessId: Yup.number().required('Access ID is required'),
  //     })
  //   ),
});

export const EditUsersPageValidation = Yup.object().shape({
  firstname: FirstNameValidation,
  lastname: LastNameValidation,
  email: EmailValidation,
  userStatusId: Yup.string().required('select status'),
  userTypeId: Yup.string().required('select a user type'),
  cellPhoneNumber: MobileValidation,
});

export const CreateUsersPageValidation = Yup.object().shape({
  firstname: FirstNameValidation,
  lastname: LastNameValidation,
  email: EmailValidation,
  cellPhoneNumber: MobileValidation,
  password: PasswordValidation,
  userStatusId: Yup.string().required('select status'),
  userTypeId: Yup.string().required('select a user type'),
});

export const CarsPageValidation = Yup.object().shape({
  carMakeName: Yup.string()
    .required('car make required')
    .test('carMakeId', 'car make required', function (value) {
      const carMakeId = this.parent.carMakeId;
      return !!value || !!carMakeId;
    }),

  carModelName: Yup.string()
    .required('car model required')
    .test('carModelId', 'car model required', function (value) {
      const carModelId = this.parent.carModelId;
      return !!value || !!carModelId;
    }),

  carColorName: Yup.string()
    .required('car color required')
    .test('carColorId', 'car color required', function (value) {
      const carColorId = this.parent.carColorId;
      return !!value || !!carColorId;
    }),

  licensePlateNumber: Yup.string()
    .required('license number plate required')
    // .matches(specialCharacterNotAllowedRegex, 'invalid license plate number')
    // .matches(licenseNoExp, 'Invalid (i.e: xx-xx-xx or x-xxx-xx or xxx-xx-x)')
    // .min(8, '8 Characters required')
    // .max(8, 'only 8 characters allowed')
    .matches(postalCodeRegex, 'invalid license number plate'),

  carStatusId: Yup.string().required('select status'),
  //locationId: Yup.string().required('select location'),
  additionalNotes: Yup.string().matches(
    specialCharacterNotAllowedRegex,
    'special characters not allowed'
  ),
});

export const BookingPageSchema = Yup.object().shape({
  warehouseLocation: Yup.string().required('select warehouse'),
  uId: Yup.string().required('select customer'),
  serviceId: Yup.string().required('select service'),
  carId: Yup.string().required('select car'),
  bookingStatus: Yup.string().required('select status'),

  // bookingDate: Yup.string().required('select booking date'),

  bookingTimeSlot: Yup.string().required('select time slot'),
  representativePhone: Yup.string().matches(
    phoneNumberRegex,
    'enter valid mobile number'
  ),
});
