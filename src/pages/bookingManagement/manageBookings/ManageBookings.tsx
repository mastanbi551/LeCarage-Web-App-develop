import React, { useEffect, useState } from 'react';
import { ConstantStrings } from '../../../utils/constants';
import {
  CardContainer,
  CustomDropDown,
  DetailsContainer,
  GooglePlaces,
  InputTextField,
  Loader,
  PageContainer,
} from '../../../components';
import './ManageBooking.scss';

//import { RiDeleteBinLine } from 'react-icons/ri';
import { Collapse, Button, Label } from 'reactstrap';
import { BookingPageSchema } from '../../../utils/ValidationSchemas';
//import { ImagesPath } from '../../../assets/constants';
import { Form, Formik } from 'formik';
import {
  TimeSlotForBookingProps,
  TimeSlotsListProps,
  WarehouseIProps,
} from '../bookingsManagementPageState/BookingsManagementStateInterface';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import _ from 'lodash';
import ReusableModal from '../../../components/reUsableModal/ReusableModal';
import { ManageBookingsInterface } from '../BookingManagementInterface';
import { ActionMeta, SingleValue } from 'react-select';
import { strict, string } from 'yargs';

interface dropdownListInfo {
  value: string;
  label: string;
}

export const ManageBookings: React.FC<ManageBookingsInterface> = ({
  statusDropDownData,
  handleCustomerDetailsCollapse,
  handlePickupRequestsDetailsCollapse,
  handleLimoServiceCollapse,
  customerDetailsCollapse,
  pickUpRequestDetailsCollapse,
  limoServiceCollapse,
  backButtonHandler,
  isDisable,
  isEditable,
  saveUpdateButtonHandler,
  timeslotList,
  serviceTypeInfo,
  carsList,
  getCustomerInfoByEmail,
  handleServiceType,
  getbookingsByDate,
  isPickUp,
  isDropOff,
  WarehousesList,
  bookingData,
  isCreate,
  handleDateChange,
  handleNewDateChange,
  toggleModal,
  modalOpen,
  customersList,
  handleReset,
  place,
  handlePlace
}) => {
  const footer = (
    <>
      <Button color='success' onClick={toggleModal}>
        Confirm
      </Button>
      <Button color='secondary' onClick={toggleModal}>
        Cancel
      </Button>
    </>
  );

 

  return (
    <>
      {((isEditable || isDisable) && bookingData.uId !== '') || isCreate ? (
        //Page Container
        <PageContainer
          mainHeadingName={ConstantStrings.manageBookings.mainHeading}
          backIcon={true}
          backIconOnClick={backButtonHandler}
        >
          <Formik
            initialValues={{
              warehouseLocation: _.get(bookingData, 'warehouseId')
                ? _.get(bookingData, 'warehouseId')
                : '',
              uId: _.get(bookingData, 'uId') ? _.get(bookingData, 'uId') : '',
              serviceId: _.get(bookingData, 'serviceId')
                ? _.get(bookingData, 'serviceId')
                : '',
              carId: _.get(bookingData, 'carId')
                ? _.get(bookingData, 'carId')
                : '',

              bookingStatus: _.get(bookingData, 'bookingStatusId')
                ? _.get(bookingData, 'bookingStatusId')
                : '',

              bookingDate: _.get(bookingData, 'date')
                ? _.get(bookingData, 'date')
                : new Date(),

              bookingTimeSlot: _.get(bookingData, 'slot')
                ? _.get(bookingData, 'slot')
                : '',
              additionalNote: _.get(bookingData, 'additionalNote')
                ? _.get(bookingData, 'additionalNote')
                : '',
              representativeName: _.get(bookingData, 'representativeName')
                ? _.get(bookingData, 'representativeName')
                : '',
              representativePhone: _.get(bookingData, 'representativeContact')
                ? _.get(bookingData, 'representativeContact')
                : '',
              limoPickupLocation: _.get(bookingData, 'limoPickupLocation')
                ? _.get(bookingData, 'limoPickupLocation')
                : '',
              limoDropOffLocation: _.get(bookingData, 'limoDropOffLocation')
                ? _.get(bookingData, 'limoDropOffLocation')
                : '',
              limoServiceDate: _.get(bookingData, 'limoServiceDate')
                ? _.get(bookingData, 'limoServiceDate')
                : '',
              limoServiceTimeSlot: _.get(bookingData, 'limoServiceTimeSlot')
                ? _.get(bookingData, 'limoServiceTimeSlot')
                : '',

              deniedReason: '',
              newDate: _.get(bookingData, 'newDate')
                ? _.get(bookingData, 'newDate')
                : new Date(),

              newSlot: '',
            }}
            validationSchema={BookingPageSchema}
            onSubmit={(values) => {
              saveUpdateButtonHandler(values);
            }}
            onReset={(values) => {
              values.warehouseLocation = _.get(bookingData, 'warehouseId')
                ? _.get(bookingData, 'warehouseId')
                : '';
                values.uId = _.get(bookingData, 'uId') ? _.get(bookingData, 'uId') : '';
                values.limoPickupLocation = _.get(bookingData, 'limoPickupLocation') ? _.get(bookingData, 'limoPickupLocation') : '';
                values.limoDropOffLocation = _.get(bookingData, 'limoDropOffLocation') ? _.get(bookingData, 'limoDropOffLocation') : '';
                values.serviceId = _.get(bookingData, 'serviceId') ? _.get(bookingData, 'serviceId') : '';
              handlePlace(null);
              handleReset();
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
              setFieldValue,
            }) => (
              <form className='container-fluid' onSubmit={handleSubmit}>
                <div className='row '>
                  <div className='col-sm-12 col-md-8 manage-customers-page '>
                    <div className='col-md-12'>
                      <DetailsContainer
                        heading='Customer Details'
                        isCollapsible={true}
                        collapseOnClick={handleCustomerDetailsCollapse}
                      >
                        <Collapse isOpen={customerDetailsCollapse}>
                          <div className='row pdtopbtm'>
                            <div className='col-md-6'>
                              {/* warehouse location */}
                              {WarehousesList && (
                                <CustomDropDown
                                  name='status-dropdown'
                                  dropdownList={WarehousesList}
                                  labelName={
                                    ConstantStrings.manageBookings
                                      .warehouseLocation
                                  }
                                  showSelectText={true}
                                  isDisable={
                                    isEditable || isDisable ? true : false
                                  }
                                  onBlur={handleBlur('warehouseLocation')}
                                  onValueSelect={handleChange(
                                    'warehouseLocation'
                                  )}
                                  //getCustomerInfoByEmail(e.target.value);
                                  error={errors.warehouseLocation}
                                  touched={touched.warehouseLocation}
                                  defaultValue={values.warehouseLocation}
                                />
                              )}
                            </div>
                            <div className='col-md-6'>
                              {/* customers List */}

                              {customersList && (
                                <CustomDropDown
                                  name='status-dropdown'
                                  dropdownList={customersList}
                                  labelName={
                                    ConstantStrings.manageBookings.customers
                                  }
                                  showSelectText={true}
                                  isDisable={
                                    isEditable || isDisable ? true : false
                                  }
                                  searchOnBlur={handleBlur('uId')}
                                  //getCustomerInfoByEmail(e.target.value);
                                  error={errors.uId}
                                  touched={touched.uId}
                                  defaultValue={values.uId.toString()}
                                  isSearchable={true}
                                  searchOnChange={(
                                    newValue: SingleValue<dropdownListInfo>,
                                    actionMeta: ActionMeta<dropdownListInfo>
                                  ) => {
                                    setFieldValue(
                                      'uId',
                                      newValue ? newValue.value : ''
                                    );
                                    values.uId = newValue ? newValue.value : '';
                                    getCustomerInfoByEmail(
                                      newValue ? newValue.value : ''
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </Collapse>
                      </DetailsContainer>
                      <DetailsContainer
                        heading={
                          ConstantStrings.manageBookings.pickUpRequestDetails
                        }
                        isCollapsible={true}
                        collapseOnClick={handlePickupRequestsDetailsCollapse}
                      >
                        <Collapse isOpen={pickUpRequestDetailsCollapse}>
                          <div className='details-card-containers__booking-address-container__address-details'>
                            {/* service and Car*/}
                            <div className='row pdtopbtm'>
                              <div className='col-md-6'>
                                {serviceTypeInfo && (
                                  <CustomDropDown
                                    name='status-dropdown'
                                    dropdownList={serviceTypeInfo}
                                    labelName={
                                      ConstantStrings.manageBookings
                                        .bookingDetails.serviceType
                                    }
                                    showSelectText={true}
                                    isDisable={
                                      isEditable || isDisable ? true : false
                                    }
                                    onValueSelect={(e) => {
                                      values.serviceId = e.target.value;
                                      handleServiceType(e.target.value);
                                    }}
                                    onBlur={handleBlur('serviceId')}
                                    error={errors.serviceId}
                                    touched={touched.serviceId}
                                    defaultValue={values.serviceId.toString()}
                                  />
                                )}
                              </div>
                              <div className='col-md-6'>
                                {isEditable || isDisable ? (
                                  <div className='dropdown mgtp'>
                                    <label className='dropDown-label'>
                                      {
                                        ConstantStrings.manageBookings
                                          .bookingDetails.customerCars
                                      }
                                    </label>
                                    <select
                                      className='custom-select status-dropdown'
                                      onChange={handleChange('carId')}
                                      disabled={isDisable}
                                      onBlur={handleBlur('carId')}
                                      defaultValue={bookingData.label}
                                    >
                                      <option
                                        value={values.carId}
                                        disabled={
                                          isEditable || isDisable ? true : false
                                        }
                                        selected
                                      >
                                        <span>{bookingData.label}</span>
                                      </option>
                                    </select>
                                  </div>
                                ) : (
                                  carsList && (
                                    <CustomDropDown
                                      name='status-dropdown'
                                      dropdownList={carsList}
                                      labelName={
                                        ConstantStrings.manageBookings
                                          .bookingDetails.customerCars
                                      }
                                      showSelectText={true}
                                      error={errors.carId}
                                      touched={touched.carId}
                                      onBlur={handleBlur('carId')}
                                      defaultValue={values.carId}
                                      isDisable={
                                        isEditable || isDisable ? true : false
                                      }
                                      onValueSelect={handleChange('carId')}
                                    />
                                  )
                                )}
                              </div>
                            </div>

                            {/* DatePicker and TimeSlots */}
                            <div className='row '>
                              <div className='col-md-6 pdtopbtm'>
                                <label className='label'>
                                  {
                                    ConstantStrings.manageBookings
                                      .bookingDetails.bookingDate
                                  }
                                </label>
                                <div>
                                  {' '}
                                  <DatePicker
                                    className='input-text-field static customedatetime'
                                    selected={new Date(values.bookingDate)}
                                    onChange={(e) => {
                                      handleDateChange(e, values);
                                    }}
                                    shouldCloseOnSelect={true}
                                    dateFormat='yyyy-MM-dd'
                                    onBlur={handleBlur('bookingDate')}
                                    minDate={new Date()}
                                    disabled={isDisable}
                                    onKeyDown={(e) => {
                                      if (
                                        e &&
                                        typeof e.preventDefault === 'function'
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                  {errors.bookingDate && touched.bookingDate ? (
                                    <div className='validation-error-message text-align-left'>
                                      {errors.bookingDate}
                                    </div>
                                  ) : null}
                                 </div>
                              </div>
                              <div className='col-md-6 pdtopbtm'>
                                {timeslotList && (
                                  <div className='dropdown mgtp input-text-field'>
                                    <label className='dropDown-label'>
                                      {
                                        ConstantStrings.manageBookings
                                          .bookingDetails.bookingTimeSlots
                                      }
                                    </label>
                                    <select
                                      className='custom-select status-dropdown customedatetime'
                                      onChange={handleChange('bookingTimeSlot')}
                                      disabled={isDisable}
                                      onBlur={handleBlur('bookingTimeSlot')}
                                      defaultValue={values.bookingTimeSlot}
                                    >
                                      {timeslotList &&
                                        values.bookingTimeSlot === '' && (
                                          <option value='' selected>
                                            {isEditable || isDisable
                                              ? values.bookingTimeSlot
                                              : 'Select'}
                                          </option>
                                        )}
                                      {timeslotList.map(
                                        (
                                          item: TimeSlotForBookingProps,
                                          index: number
                                        ) => {
                                          if(item?.isDisable){
                                            return (
                                              <option
                                                disabled={true}
                                                value={item.slot}
                                                key={index}
                                                defaultValue={
                                                  values.bookingTimeSlot
                                                }
                                              >
                                                <span>{item.slot}</span>
                                              </option>
                                            );
                                          }
                                          else {
                                            return (
                                              <option
                                                value={item.slot}
                                                key={index}
                                                defaultValue={
                                                  values.bookingTimeSlot
                                                }
                                              >
                                                <span>{item.slot}</span>
                                              </option>
                                            );
                                          }
                                          
                                        }
                                      )}
                                    </select>

                                    {errors.bookingTimeSlot &&
                                    touched.bookingTimeSlot ? (
                                      <div className='validation-error-message text-align-left'>
                                        {errors.bookingTimeSlot}
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </div>
                              <div className=''>
                                <div className='col-md-12 pdtopbtm'>
                                  <label className='label'>
                                    {
                                      ConstantStrings.manageBookings
                                        .bookingDetails.additionalNotes
                                    }
                                  </label>
                                  <textarea
                                    name='cars-description-inputField'
                                    id=''
                                    title='Additional Notes'
                                    value={values.additionalNote}
                                    onChange={handleChange('additionalNote')}
                                    disabled={isDisable}
                                  ></textarea>
                                </div>
                              </div>

                              <div className='col-md-6 pdtopbtm'>
                                <label className='label'>
                                  {
                                    ConstantStrings.manageBookings
                                      .bookingDetails.representativeName
                                  }
                                </label>
                                <InputTextField
                                  name='representativeName'
                                  id='representative_field'
                                  placeholder=''
                                  value={values.representativeName}
                                  inputType='text'
                                  requiredOrNot={true}
                                  onChangeText={handleChange(
                                    'representativeName'
                                  )}
                                  isDisable={isDisable}
                                />
                              </div>
                              <div className='col-md-6 pdtopbtm'>
                                <label className='label'>
                                  {
                                    ConstantStrings.manageBookings
                                      .bookingDetails.representativePhoneNumber
                                  }
                                </label>
                                <InputTextField
                                  name='representativeContact'
                                  id='representative-phone_field'
                                  placeholder=''
                                  value={values.representativePhone}
                                  inputType='text'
                                  requiredOrNot={true}
                                  onChangeText={handleChange(
                                    'representativePhone'
                                  )}
                                  isDisable={isDisable}
                                  error={errors.representativePhone}
                                  touched={touched.representativePhone}
                                  onBlur={handleBlur('representativePhone')}
                                />
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </DetailsContainer>
                      {/* Limo Service */}
                      <DetailsContainer
                        heading={
                          ConstantStrings.manageBookings.limoDetailsHeading
                        }
                        isCollapsible={true}
                        collapseOnClick={handleLimoServiceCollapse}
                      >
                        <Collapse isOpen={limoServiceCollapse}>
                          <div className='details-card-containers__cars-container__cars-details'>
                            <>
                              <div className='row pdtopbtm'>
                                <div className='col-md-6'>
                                  {isPickUp || values.serviceId === 1 && values.serviceId.toString() !== '' ? (
                                    <GooglePlaces
                                    dataTestId='google-places-input'
                                      place={
                                        values.limoPickupLocation !== ''
                                          ? values.limoPickupLocation
                                          : place
                                      }
                                      setPlace={(e: {
                                        label: string;
                                      }) => {
                                        handlePlace(e.label);
                                        setFieldValue(
                                          'limoPickupLocation',
                                          e.label
                                        );
                                      }}
                                      error={errors.limoPickupLocation}
                                      touched={touched.limoPickupLocation}
                                      handleOnBlur={handleBlur(
                                        'limoPickupLocation'
                                      )}
                                      label={
                                        ConstantStrings.manageBookings
                                          .limoServiceDetails.pickUpLocation
                                      }
                                      defaultValue={values.limoPickupLocation}
                                      isDisable={isDisable}
                                      handlePlace={handlePlace}
                                    />
                                  ) : (
                                    <>
                                      {WarehousesList && (
                                        <CustomDropDown
                                          name='status-dropdown'
                                          dropdownList={WarehousesList}
                                          labelName={
                                            ConstantStrings.manageBookings
                                              .limoServiceDetails.pickUpLocation
                                          }
                                          showSelectText={true}
                                          isDisable={
                                            isEditable || isDisable
                                              ? true
                                              : false
                                          }
                                          onBlur={handleBlur(
                                            'limoPickupLocation'
                                          )}
                                          onValueSelect={handleChange(
                                            'limoPickupLocation'
                                          )}
                                          //getCustomerInfoByEmail(e.target.value);
                                          error={errors.limoPickupLocation}
                                          touched={touched.limoPickupLocation}
                                          defaultValue={
                                            values.limoPickupLocation
                                          }
                                        />
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className='col-md-6'>
                                  {isDropOff || values.serviceId === 2 && values.serviceId.toString() !== '' ? (
                                    <GooglePlaces
                                    dataTestId='google-places-input'
                                      place={
                                        values.limoDropOffLocation !== ''
                                          ? values.limoDropOffLocation
                                          : place
                                      }
                                      setPlace={(e: {
                                        label: string;
                                      }) => {
                                        handlePlace(e.label);
                                        setFieldValue(
                                          'limoDropOffLocation',
                                          e.label
                                        );
                                      }}
                                      error={errors.limoDropOffLocation}
                                      touched={touched.limoDropOffLocation}
                                      handleOnBlur={handleBlur(
                                        'limoDropOffLocation'
                                      )}
                                      label={
                                        ConstantStrings.manageBookings
                                          .limoServiceDetails.dropOffLocation
                                      }
                                      defaultValue={values.limoDropOffLocation}
                                      isDisable={isDisable}
                                      handlePlace={handlePlace}
                                    />
                                  ) : (
                                    <>
                                      {WarehousesList && (
                                        <CustomDropDown
                                          name='status-dropdown'
                                          dropdownList={WarehousesList}
                                          labelName={
                                            ConstantStrings.manageBookings
                                              .limoServiceDetails
                                              .dropOffLocation
                                          }
                                          showSelectText={true}
                                          isDisable={
                                            isEditable || isDisable
                                              ? true
                                              : false
                                          }
                                          onBlur={handleBlur(
                                            'limoDropOffLocation'
                                          )}
                                          onValueSelect={handleChange(
                                            'limoDropOffLocation'
                                          )}
                                          //getCustomerInfoByEmail(e.target.value);
                                          error={errors.limoDropOffLocation}
                                          touched={touched.limoDropOffLocation}
                                          defaultValue={
                                            values.limoDropOffLocation
                                          }
                                        />
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                              {/* DatePicker and TimeSlots */}
                              <div className='row pdtopbtm'>
                                <div className='col-md-6'>
                                  <label className='label'>
                                    {
                                      ConstantStrings.manageBookings
                                        .bookingDetails.bookingDate
                                    }
                                  </label>
                                  <div>
                                    <DatePicker
                                      className='input-text-field static customedatetime'
                                      selected={new Date(values.bookingDate)}
                                      onChange={(e) => {
                                        handleDateChange(e, values);
                                      }}
                                      dateFormat='yyyy-MM-dd'
                                      onBlur={handleBlur('date')}
                                      disabled={true}
                                    />
                                  </div>
                                </div>
                                <div className='col-md-6'>
                                  {timeslotList && (
                                    <div className='dropdown mgtp'>
                                      <label className='dropDown-label'>
                                        {
                                          ConstantStrings.manageBookings
                                            .bookingDetails.bookingTimeSlots
                                        }
                                      </label>
                                      <select
                                        className='custom-select status-dropdown'
                                        onChange={handleChange(
                                          'bookingTimeSlot'
                                        )}
                                        disabled={true}
                                        onBlur={handleBlur('bookingTimeSlot')}
                                        value={values.bookingTimeSlot}
                                      >
                                        {timeslotList && (
                                          <option value=''>Select</option>
                                        )}
                                        {timeslotList.map(
                                          (
                                            item: TimeSlotForBookingProps,
                                            index: number
                                          ) => {
                                            return (
                                              <option
                                                value={item.slot}
                                                key={index}
                                              >
                                                <span>{item.slot}</span>
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          </div>
                        </Collapse>
                      </DetailsContainer>
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-4 details-card-containers'>
                    <div className='col-md-12'>
                      <CardContainer
                        heading='Booking Actions'
                        statusDropDownList={statusDropDownData}
                        statusDropDownOnChange={(e) => {
                          setFieldValue('bookingStatus', e.target.value);
                          if (e.target.value === '5') {
                            toggleModal();
                          }
                        }}
                        showStatusSelectText={true}
                        statusDefaultValue={
                          isEditable || isDisable
                            ? values.bookingStatus
                            : values.bookingStatus !== ''
                            ? values.bookingStatus
                            : ''
                        }
                        isDisable={isDisable}
                        errorStatus={errors.bookingStatus}
                        touchedStatus={touched.bookingStatus}
                        onBlurStatus={handleBlur('bookingStatus')}
                        onSaveAndUpdateButtonOnClick={handleSubmit}
                        onDiscardButtonOnClick={() => {
                          resetForm();
                          values.warehouseLocation = _.get(
                            bookingData,
                            'warehouseId'
                          )
                            ? _.get(bookingData, 'warehouseId')
                            : '';
                          values.uId = _.get(bookingData, 'uId') ? _.get(bookingData, 'uId') : '';
                          values.limoPickupLocation = _.get(bookingData, 'limoPickupLocation') ? _.get(bookingData, 'limoPickupLocation') : '';
                          values.limoDropOffLocation = _.get(bookingData, 'limoDropOffLocation') ? _.get(bookingData, 'limoDropOffLocation') : '';
                          values.serviceId = _.get(bookingData, 'serviceId') ? _.get(bookingData, 'serviceId') : '';
                          handlePlace(null);
                          handleReset();
                        }}
                        isValid={isValid}
                      />
                      <ReusableModal
                        isOpen={modalOpen}
                        toggle={toggleModal}
                        header='Booking Request Denied'
                        footer={footer}
                      >
                        <Form onSubmit={handleSubmit}>
                          <div className='row'>
                            <div className='col-md-12'>
                              <strong className='modalFieldLabel'>
                                {ConstantStrings.manageBookings.message}
                              </strong>

                              <textarea
                                name='cars-description-inputField'
                                id=''
                                placeholder='Message to send out to customer...'
                                value={values.deniedReason}
                                onChange={handleChange('deniedReason')}
                                disabled={isDisable}
                              ></textarea>
                            </div>
                          </div>
                          <div className='row'>
                            <strong className='modalFieldLabel'>
                              {ConstantStrings.manageBookings.dateTime}
                            </strong>
                            <div className='col-md-6 details-card-containers__booking-id-name-details__booking-type-id-container'>
                              <label className='label'>Date:</label>
                              <div>
                                <DatePicker
                                  className='input-text-field static customedatetime p-2'
                                  selected={new Date(values.newDate)}
                                  onChange={(e) => {
                                    handleNewDateChange(e, values);
                                  }}
                                  dateFormat='yyyy-MM-dd'
                                  onBlur={handleBlur('newDate')}
                                  minDate={new Date()}
                                  disabled={isDisable}
                                />
                              </div>
                            </div>
                            <div className='col-md-6 details-card-containers__booking-id-name-details__booking-type-id-container'>
                              {timeslotList && (
                                <div className='dropdown mgtp'>
                                  <label className='dropDown-label'>
                                    {
                                      ConstantStrings.manageBookings
                                        .bookingDetails.bookingTimeSlots
                                    }
                                  </label>
                                  <select
                                    className='custom-select status-dropdown'
                                    onChange={handleChange('newSlot')}
                                    disabled={isDisable}
                                    onBlur={handleBlur('newSlot')}
                                  >
                                    {timeslotList && (
                                      <option value=''>Select</option>
                                    )}
                                    {timeslotList.map(
                                      (
                                        item: TimeSlotForBookingProps,
                                        index: number
                                      ) => {
                                        return (
                                          <option value={item.slot} key={index}>
                                            <span>{item.slot}</span>
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        </Form>
                      </ReusableModal>
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
