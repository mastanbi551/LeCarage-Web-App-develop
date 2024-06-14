import {
  FieldArray,
  Formik,
} from 'formik';
import React, { useState} from 'react';
import { ConstantStrings } from '../../../../utils/constants';
import {
  CardContainer,
  CustomCheckBox,
  CheckBoxList,
  CustomButton,
  DetailsContainer,
  InputTextField,
  Loader,
  PageContainer,
  PageHeader,
} from '../../../../components';
import './ManageCustomers.scss';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Table, Collapse } from 'reactstrap';
import {
  CreateCustomerPageSchema,
  EditCustomerPageSchema,
} from '../../../../utils/ValidationSchemas';
import _, { map, pick } from 'lodash';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiEye } from 'react-icons/hi';
import { profile } from 'console';
import { CarIProps, CustomerInfoProps } from './ManageCustomerContainer';

interface ManageCustomerInterface {
  backButtonHandler: () => void;
  statusDropDownData: { label: string; value: string }[];
  isDisable: boolean;
  isEditable: boolean;
  handleUserDetailsCollapse: () => void;
  handleCarsDetailsCollapse: () => void;
  userDetailsCollapse: boolean;
  carsDetailsCollapse: boolean;
  saveUpdateButtonHandler: (values: {
    uId: string | undefined;
    profile: {
      email: string;
      phoneNumber: string;
      password: string;
      firstName: string;
      lastName: string;
      statusId: string;
      photoURL: string
    };
    address: {
      addressLineOne: string;
      streetName: string;
      houseNumber: string;
      postalCode: string;
      cityName: string;
    }[] | undefined;
    carDetails: {
      carId: string;
    }[] | undefined;
  }) => void;
  passwordType: string;
  handlePasswordTypeChange: () => void;
  customerData: {
    uId: string,
    profile: {
      email: string,
      phoneNumber: string,
      password: string,
      firstName: string,
      lastName: string,      
      statusId: string,
      photoURL: string
    },
    address: {
      addressLineOne: string,
      streetName: string,
      houseNumber: string,
      postalCode: string,
      cityName: string,
      }[],
    cars: {
        carId: string,
        additionalNotes: string,
        Make: string,
        Color: string,
        Model: string,
        'Number Plate': string,
      }[],
  };
  isCreate: boolean;
  handleModalClose: () => void;
  handleModalOpen: () => void;
  modalShow: boolean;
  unlinkedCars: CarIProps[];
  linkedCars: CarIProps[];
  checkedCars: CarIProps[];
  handleCheckedCars: (e: React.ChangeEvent<HTMLInputElement>, unlinked: CarIProps) => void;
  handleEditPageCheckedCars: (e: React.ChangeEvent<HTMLInputElement>, unlinked: CarIProps) => void;
  handleSave: () => void;
  handleReset: () => void;
  editCheckedCars: CarIProps[];
  onDrop:(e: File) => void;
  photoURL: string;
  searchValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ManageCustomers: React.FC<ManageCustomerInterface> = ({
  backButtonHandler,
  statusDropDownData,
  isDisable,
  isEditable,
  handleUserDetailsCollapse,
  handleCarsDetailsCollapse,
  userDetailsCollapse,
  carsDetailsCollapse,
  saveUpdateButtonHandler,
  customerData,
  isCreate,
  handleModalClose,
  handleModalOpen,
  modalShow,
  unlinkedCars,
  checkedCars,
  handleCheckedCars,
  handleEditPageCheckedCars,
  handleSave,
  handleReset,
  editCheckedCars,
  passwordType,
  handlePasswordTypeChange,
  onDrop,
  photoURL,
  searchValue,
  handleSearch
}) => {
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [checked, setChecked] = useState(true);
  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInputTouched(true);
  };

  const EditFilteredCheckedCars = editCheckedCars.filter(
    (car) =>
      car['Number Plate'].toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Make.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Model.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Color.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredCheckedCars = checkedCars.filter(
    (car) =>
      car['Number Plate'].toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Make.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Model.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Color.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredUnlinkedCars = unlinkedCars.filter(
    (car) =>
      car['Number Plate'].toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Make.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Model.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.Color.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    //Page Container
    <>
      {((isEditable || isDisable) && customerData && customerData.uId !== '') || isCreate ? (
        <PageContainer
          mainHeadingName={ConstantStrings.manageCustomer.mainHeading}
          backIcon={true}
          backIconOnClick={backButtonHandler}
        >
          <Formik
            initialValues={{
              uId: _.get(customerData, 'uId') ? _.get(customerData, 'uId') : '',
              profile: _.get(customerData, 'profile')
                ? _.omit(customerData.profile, 'uId')
                : {
                  firstName: '',
                  lastName: '',
                  email: '',
                  phoneNumber: '',
                  password: '',
                  statusId: '',
                  photoURL: '',
                },
              address: _.get(customerData, 'address')
                ? _.get(customerData, 'address')
                : [
                  {
                    addressLineOne: '',
                    streetName: '',
                    houseNumber: '',
                    postalCode: '',
                    cityName: '',
                  },
                ],
              carDetails: _.get(customerData, 'cars')
                ? map(customerData.cars, (car) => pick(car, 'carId'))
                : [
                  {
                    carId: '',
                  },
                ],
            }}
            validationSchema={isEditable ? EditCustomerPageSchema : CreateCustomerPageSchema }
            onSubmit={(values) => {
              values.carDetails = [];
              values.carDetails = [
                {
                  carId: '',
                },
              ];
              if(isEditable){                
                editCheckedCars && editCheckedCars.length > 0 &&
                  editCheckedCars.map((car: CarIProps) => {
                    values && values.carDetails && values.carDetails.push({ carId: car.carId });
                  });
                _.remove(
                  values.carDetails,
                  (obj: {carId: string}) => obj.carId === ''
                );
              }
              else {
                checkedCars && checkedCars.length > 0 &&
                  checkedCars.map((car: CarIProps) => {
                    values && values.carDetails && values.carDetails.push({ carId: car.carId });
                  });
                _.remove(
                  values.carDetails,
                  (obj: {carId: string}) => obj.carId === ''
                );
              }  
              values.profile.photoURL = photoURL;            
              saveUpdateButtonHandler(values);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              resetForm,
              isValid,
              handleBlur,
              touched,
            }) => (
              <form className='container-fluid' onSubmit={handleSubmit}>
                <div className='row '>
                  <div className='col-md-8 manage-customers-page'>
                    <div className='col-md-12'>
                      <DetailsContainer
                        heading='Customer Details'
                        isCollapsible={true}
                        collapseOnClick={handleUserDetailsCollapse}
                      >
                        <Collapse isOpen={userDetailsCollapse}>
                          <div className='manage-customers-page__customer-info'>
                            <div className='row pdtopbtm'>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {ConstantStrings.manageCustomer.firstName}
                                </label>
                                <InputTextField
                                  dataTestId='input-field'
                                  name='firstName'
                                  id='firstname_field'
                                  placeholder=''
                                  value={
                                    values.profile && values.profile.firstName
                                  }
                                  inputType='text'
                                  requiredOrNot={true}
                                  isDisable={isDisable}
                                  onChangeText={handleChange(
                                    'profile.firstName'
                                  )}
                                  onBlur={(
                                    handleBlur('profile.firstName')
                                  )}
                                  error={errors.profile?.firstName}
                                  touched={touched.profile?.firstName}
                                />
                              </div>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {ConstantStrings.manageCustomer.lastName}
                                </label>
                                <InputTextField
                                  name='lastName'
                                  id='lastname_field'
                                  placeholder=''
                                  value={values.profile.lastName}
                                  inputType='text'
                                  isDisable={isDisable}
                                  requiredOrNot={true}
                                  onChangeText={handleChange(
                                    'profile.lastName'
                                  )}
                                  onBlur={(
                                    handleBlur('profile.lastName'))}
                                  error={errors.profile?.lastName}
                                  touched={touched.profile?.lastName}
                                />
                              </div>
                            </div>

                            <div className='row pdtopbtm'>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {ConstantStrings.manageCustomer.emailAddress}
                                </label>
                                <InputTextField
                                  name='email'
                                  id='email_field'
                                  placeholder=''
                                  value={values.profile.email}
                                  inputType='text'
                                  isDisable={isDisable}
                                  requiredOrNot={true}
                                  onChangeText={handleChange('profile.email')}
                                  onBlur={(
                                    handleBlur('profile.email'))}
                                  error={errors.profile?.email}
                                  touched={touched.profile?.email}
                                />
                              </div>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {
                                    ConstantStrings.manageCustomer
                                      .cellPhoneNumber
                                  }
                                </label>
                                <InputTextField
                                  name='phoneNumber'
                                  id='cell-phone_field'
                                  placeholder=''
                                  value={values.profile.phoneNumber}
                                  inputType='text'
                                  isDisable={isDisable}
                                  requiredOrNot={true}
                                  onChangeText={handleChange(
                                    'profile.phoneNumber'
                                  )}
                                  onBlur={(
                                    handleBlur('profile.phoneNumber'))}
                                  error={errors.profile?.phoneNumber}
                                  touched={touched.profile?.phoneNumber}
                                />
                              </div>
                            </div>

                            <div className='row pdtopbtm'>
                              <div className='col-md-6 customerspassword'>
                                <label className='label'>
                                  {ConstantStrings.manageCustomer.password}
                                </label>
                                <InputTextField
                                  name='password password-field'
                                  id='password_field'
                                  placeholder=''
                                  value={values.profile?.password}
                                  inputType={passwordType}
                                  isDisable={isDisable || isEditable ? true : false}
                                  requiredOrNot={true}
                                  onChangeText={handleChange(
                                    'profile.password'
                                  )}
                                  onBlur={(
                                    handleBlur('profile.password'))}
                                  error={errors.profile?.password}
                                  touched={touched.profile?.password}
                                >
                                  {isDisable===false && isEditable ===false?
                                  <span className='multiple-icons'>
                                    <i aria-disabled={isDisable}
                                      onClick={() => {
                                        handlePasswordTypeChange();
                                      }}
                                    >
                                      {passwordType ? (
                                        <HiEye />
                                      ) : (
                                        <AiOutlineEyeInvisible />
                                      )}
                                    </i>
                                  </span>:<span className='multiple-icons'>
                                    
                                  </span>}</InputTextField>
                              </div>
                            </div>

                            <div className='details-card-containers__user-address-container'>
                              <PageHeader
                                text={
                                  ConstantStrings.manageCustomer
                                    .userAddressDetails.userAddressHeading
                                }
                                name='details-card-containers__user-address-container__heading'
                              />
                              <div className='details-card-containers__user-address-container__address-details'>
                                <FieldArray
                                  name='address'
                                  render={({ insert, remove, push }) => (
                                    <>
                                      {values &&
                                        values.address &&
                                        values.address.length > 0 &&
                                        values.address.map(
                                          (
                                            userAddressDetails: {
                                              addressLineOne: string;
                                              streetName: string;
                                              houseNumber: string;
                                              postalCode: string;
                                              cityName: string;
                                            },
                                            index: number
                                          ) => {
                                            return (
                                              userAddressDetails && (
                                                <div key={index}>
                                                  <div className='details-card-containers__user-address-container__address-details__delete-icon'>
                                                    <RiDeleteBinLine
                                                      onClick={() =>
                                                        index !== 0 &&
                                                        remove(index)
                                                      }
                                                    />
                                                  </div>
                                                  {/* 1st row */}
                                                  <div className='row pdtopbtm'>
                                                    <div className='col-md-6'>
                                                      <label className='label'>
                                                        {
                                                          ConstantStrings
                                                            .manageCustomer
                                                            .userAddressDetails
                                                            .address
                                                        }
                                                      </label>

                                                      <InputTextField
                                                        name=''
                                                        id='address_field'
                                                        placeholder=''
                                                        value={
                                                          userAddressDetails.addressLineOne
                                                        }
                                                        inputType='text'
                                                        isDisable={isDisable}
                                                        requiredOrNot={true}
                                                        onChangeText={handleChange(
                                                          `address.${index}.addressLineOne`
                                                        )}
                                                        onBlur={(

                                                          handleBlur(`address.${index}.addressLineOne`)

                                                        )}
                                                        error={
                                                          errors.address &&
                                                          errors.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            errors.address[
                                                            index
                                                            ],
                                                            'addressLineOne'
                                                          )
                                                        }
                                                        touched={
                                                          touched.address &&
                                                          touched.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            touched.address[
                                                            index
                                                            ],
                                                            'addressLineOne'
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                    <div className='col-md-6'>
                                                      <label className='label'>
                                                        {
                                                          ConstantStrings
                                                            .manageCustomer
                                                            .userAddressDetails
                                                            .streetName
                                                        }
                                                      </label>
                                                      <InputTextField
                                                        name=''
                                                        id='street_field'
                                                        placeholder=''
                                                        value={
                                                          userAddressDetails.streetName
                                                        } //{`useraddress.${index}.address`}
                                                        inputType='text'
                                                        isDisable={isDisable}
                                                        requiredOrNot={true}
                                                        onChangeText={handleChange(
                                                          `address.${index}.streetName`
                                                        )}
                                                        onBlur={(
                                                          handleBlur(`address.${index}.streetName`)
                                                        )}
                                                        error={
                                                          errors.address &&
                                                          errors.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            errors.address[
                                                            index
                                                            ],
                                                            'streetName'
                                                          )
                                                        }
                                                        touched={
                                                          touched.address &&
                                                          touched.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            touched.address[
                                                            index
                                                            ],
                                                            'streetName'
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>

                                                  {/* 2nd row */}

                                                  <div className='row pdtopbtm'>
                                                    <div className='col-md-6'>
                                                      <label className='label'>
                                                        {
                                                          ConstantStrings
                                                            .manageCustomer
                                                            .userAddressDetails
                                                            .houseApartmentNo
                                                        }
                                                      </label>
                                                      <InputTextField
                                                        name=''
                                                        id='houseapratment_field'
                                                        placeholder=''
                                                        value={
                                                          userAddressDetails.houseNumber
                                                        } //{`useraddress.${index}.address`}
                                                        inputType='text'
                                                        isDisable={isDisable}
                                                        requiredOrNot={true}
                                                        onChangeText={handleChange(
                                                          `address.${index}.houseNumber`
                                                        )}
                                                        onBlur={(
                                                          handleBlur(`address.${index}.houseNumber`)
                                                        )}
                                                        error={
                                                          errors.address &&
                                                          errors.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            errors.address[
                                                            index
                                                            ],
                                                            'houseNumber'
                                                          )
                                                        }
                                                        touched={
                                                          touched.address &&
                                                          touched.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            touched.address[
                                                            index
                                                            ],
                                                            'houseNumber'
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                    <div className='col-md-6'>
                                                      <label className='label'>
                                                        {
                                                          ConstantStrings
                                                            .manageCustomer
                                                            .userAddressDetails
                                                            .postalCode
                                                        }
                                                      </label>
                                                      <InputTextField
                                                        name=''
                                                        id='postalcode_field'
                                                        placeholder=''
                                                        value={
                                                          userAddressDetails.postalCode
                                                        } //{`useraddress.${index}.address`}
                                                        inputType='text'
                                                        isDisable={isDisable}
                                                        requiredOrNot={true}
                                                        onChangeText={handleChange(
                                                          `address.${index}.postalCode`
                                                        )}
                                                        onBlur={(
                                                          handleBlur(`address.${index}.postalCode`)
                                                        )}
                                                        error={
                                                          errors.address &&
                                                          errors.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            errors.address[
                                                            index
                                                            ],
                                                            'postalCode'
                                                          )
                                                        }
                                                        touched={
                                                          touched.address &&
                                                          touched.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            touched.address[
                                                            index
                                                            ],
                                                            'postalCode'
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>

                                                  {/* 3rd row */}

                                                  <div className='row pdtopbtm'>
                                                    <div className='col-md-6'>
                                                      <label className='label'>
                                                        {
                                                          ConstantStrings
                                                            .manageCustomer
                                                            .userAddressDetails
                                                            .cityName
                                                        }
                                                      </label>
                                                      <InputTextField
                                                        name=''
                                                        id='streetname_field'
                                                        placeholder=''
                                                        value={
                                                          userAddressDetails.cityName
                                                        } //{`useraddress.${index}.address`}
                                                        inputType='text'
                                                        isDisable={isDisable}
                                                        requiredOrNot={true}
                                                        onChangeText={handleChange(
                                                          `address.${index}.cityName`
                                                        )}
                                                        onBlur={(
                                                          handleBlur(`address.${index}.cityName`)
                                                        )}
                                                        error={
                                                          errors.address &&
                                                          errors.address[
                                                          index
                                                          ] &&
                                                          _.get(
                                                            errors.address[
                                                            index
                                                            ],
                                                            'cityName'
                                                          )
                                                        }
                                                        touched={
                                                          touched.address &&
                                                          touched.address[index] &&
                                                          _.get(
                                                            touched.address[
                                                            index
                                                            ],
                                                            'cityName'
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className='details-card-containers__user-address-container__address-details__add-Address'>
                                                    <CustomButton
                                                      title={
                                                        ConstantStrings
                                                          .manageCustomer
                                                          .userAddressDetails
                                                          .addAddressButton
                                                      }
                                                      name='add-button'
                                                      buttonOnClick={() =>
                                                        push({
                                                          addressLineOne: '',
                                                          streetName: '',
                                                          houseNumber: '',
                                                          postalCode: '',
                                                          cityName: '',
                                                        })
                                                      }
                                                      isDisable={isDisable}
                                                    />
                                                  </div>
                                                </div>
                                              )
                                            );
                                          }
                                        )}
                                    </>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </DetailsContainer>
                      <DetailsContainer
                        heading={
                          ConstantStrings.manageCustomer.carsDetails
                            .carsLinkedHeading
                        }
                        isCollapsible={true}
                        collapseOnClick={handleCarsDetailsCollapse}
                      >
                        <Collapse isOpen={carsDetailsCollapse}>
                          <div className='details-card-containers__cars-container__cars-details'>
                            <div className='modal-view'>
                              <Modal
                                show={modalShow}
                                onHide={() => {
                                  handleModalClose();
                                  handleReset();
                                }}
                                size='lg'
                                aria-labelledby='contained-modal-title-vcenter'
                                centered
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title className='col-md-7' id='contained-modal-title-vcenter'>
                                    Cars List                                    
                                  </Modal.Title>
                                  <div className='col-md-3'>
                                    <input type='text' className='table-header__search-field car_Search' placeholder='Search' value={searchValue} onChange={handleSearch} />
                                    </div>
                                </Modal.Header>

                                <Modal.Body className='show-grid overflwtable' >
                                  <Container >
                                    <h6>Cars currently linked:</h6>
                                    <Table striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Number Plate</th>
                                          <th>Make</th>
                                          <th>Model</th>
                                          <th>Colour</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody >
                                        {
                                          isEditable ?
                                          editCheckedCars && EditFilteredCheckedCars.map((unlinked: CarIProps, index: number) =>  {
                                              const check = _.filter(editCheckedCars, (obj: CarIProps) => obj.carId === unlinked.carId);
                                              return (
                                                <tr key={index}>
                                                  <td>{_.get(unlinked, 'Number Plate')}</td>
                                                  <td>{unlinked.Make}</td>
                                                  <td>{unlinked.Model}</td>
                                                  <td>{unlinked.Color}</td>
                                                  <td>
                                                    <CustomCheckBox
                                                      name='form-checkbox col-md-12'
                                                      onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleCheckedCars(e, unlinked);
                                                      }
                                                      }
                                                      value={unlinked.carId}
                                                      checkBoxText='Link'
                                                      checkedOrNot={unlinked.checked || check.length > 0 ? true : false}
                                                      LinkedCarsList={editCheckedCars}
                                                    />
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )
                                          :checkedCars && filteredCheckedCars.map(
                                            (unlinked: CarIProps, index: number) => {
                                              const check = _.filter(checkedCars, (obj: CarIProps) => obj.carId === unlinked.carId);
                                              return (
                                                <tr key={index}>
                                                  <td>{_.get(unlinked, 'Number Plate')}</td>
                                                  <td>{unlinked.Make}</td>
                                                  <td>{unlinked.Model}</td>
                                                  <td>{unlinked.Color}</td>
                                                  <td>
                                                    <CustomCheckBox
                                                      name='form-checkbox col-md-12'
                                                      onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleEditPageCheckedCars(e, unlinked);
                                                      }
                                                      }
                                                      value={unlinked.carId}
                                                      checkBoxText='Link'
                                                      checkedOrNot={unlinked.checked || check.length > 0 ? true : false}
                                                      LinkedCarsList={checkedCars}
                                                    />
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )

                                        }
                                        
                                      </tbody>
                                    </Table>
                                  </Container>
                                  <Container >
                                    <h6>Cars currently unlinked:</h6>
                                    <Table striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Number Plate</th>
                                          <th>Make</th>
                                          <th>Model</th>
                                          <th>Colour</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody >
                                        {filteredUnlinkedCars.map(
                                          (unlinked: CarIProps, index: number) => {

                                            const length = _.filter(
                                              checkedCars,
                                              (obj: CarIProps) => obj.carId === unlinked.carId
                                            ).length;
                                            
                                            if (length === 0) {
                                              return (
                                                <tr key={unlinked['Number Plate']}>
                                                  <td>{_.get(unlinked, 'Number Plate')}</td>
                                                  <td>{unlinked.Make}</td>
                                                  <td>{unlinked.Model}</td>
                                                  <td>{unlinked.Color}</td>
                                                  <td>
                                                    <CustomCheckBox
                                                      name='form-checkbox col-md-12'
                                                      onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        handleCheckedCars(
                                                          e,
                                                          unlinked
                                                        )
                                                      }
                                                      checkBoxText='Link'
                                                      // LinkedCarsList={unlinkedCars}
                                                      // checkedOrNot={unlinked.checked}
                                                    />
                                                  </td>
                                                </tr>
                                              );
                                            }

                                          }
                                        )}
                                      </tbody>
                                    </Table>
                                  </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                  {/* <CustomButton title='ADD CAR' name='add-car-btn'/> */}
                                  <Button
                                    variant='secondary'
                                    className='modal-cancel-btn'
                                    onClick={() => {
                                      handleModalClose();
                                      handleReset();
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant='success'
                                    className='modal-save-btn mgrght'
                                    onClick={() => {
                                      handleSave();
                                      handleModalClose();
                                    }}
                                    
                                  >
                                    Save
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>

                            <Container>
                              
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Number Plate</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Color</th>

                                  </tr>
                                </thead>
                                <tbody >
                                  {
                                    isEditable || isDisable ?
                                    editCheckedCars.map(
                                      (unlinked: CarIProps, index: number) => {
                                        return (
                                          <tr key={index}>
                                            <td>{_.get(unlinked, 'Number Plate')}</td>
                                            <td>{unlinked.Make}</td>
                                            <td>{unlinked.Model}</td>
                                            <td>{unlinked.Color}</td>
  
                                          </tr>
                                        );
                                      }
                                    )
                                    :
                                    checkedCars.map(
                                      (unlinked: CarIProps, index: number) => {
  
                                        return (
                                          <tr key={index}>
                                            <td>{_.get(unlinked, 'Number Plate')}</td>
                                            <td>{unlinked.Make}</td>
                                            <td>{unlinked.Model}</td>
                                            <td>{unlinked.Color}</td>
  
                                          </tr>
                                        );
                                      }                                 
                                  )}
                                </tbody>
                              </Table>
                            </Container>


                            <div className='details-card-containers__cars-container__cars-details__add-car'>
                              <CustomButton
                                title={ConstantStrings.manageCustomer.carsDetails.addCarButton}
                                name='add-button'
                                buttonOnClick={() => handleModalOpen()}
                                isDisable={isDisable}
                              />
                            </div>
                          </div>
                        </Collapse>
                      </DetailsContainer>                      
                    </div>
                  </div>
                  <div className='col-md-4 details-card-containers'>
                    <div className='col-md-12'>
                      <CardContainer
                        heading='Customer Actions'
                        isUserImageAvailable={true}
                        photoURL={photoURL}    
                        isFileUpload={true} 

                        statusDropDownList={statusDropDownData}
                        statusDropDownOnChange={handleChange('profile.statusId')}
                        statusDefaultValue={isEditable ? values.profile?.statusId : values.profile?.statusId !== '' ? values.profile?.statusId : ''}
                        showStatusSelectText={isEditable ? false : true}
                        errorStatus={errors.profile?.statusId}
                        touchedStatus={touched.profile?.statusId}
                        onBlurStatus={handleBlur('profile.statusId')}

                        onSaveAndUpdateButtonOnClick={handleSubmit}
                        onDiscardButtonOnClick={() => {
                          resetForm();
                          handleReset();                      
                        
                        }}
                        isValid={isValid}
                        isDisable={isDisable}
                        onDrop={onDrop}
                        isEditable={isEditable}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </PageContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
