import React from 'react';
import {
  InputTextField,
  PageContainer,
  DetailsContainer,
  CardContainer,
  CustomDropDown,
  Loader,
  SearchableDropdown,
} from '../../../../components';
import { ConstantStrings } from '../../../../utils/constants';
import { Formik } from 'formik';
import { CarsPageValidation } from '../../../../utils/ValidationSchemas';
import './ManageCars.scss';
import _ from 'lodash';

export interface CarInfoProps {
  carId: string;
  carMakeId: string;
  carModelId: string;
  carColorId: string;
  fkiCarStatusId: string;
  licensePlateNumber: string;
  location: string;
  additionalNotes: string;
  photoURL: string;
  stalling: string;
}

interface ManageCarsInterfaceProps {
  backButtonHandler: () => void;
  saveUpdateButtonHandler: (values: {
    carId: string;
    carMakeId: string;
    carModelId: string;
    carColorId: string;
    carStatusId: string;
    licensePlateNumber: string;
    locationId: string;
    additionalNotes: string;
    photoURL: string;
    stalling: string;
    carMakeName: string | undefined;
    carModelName: string | undefined;
    carColorName: string | undefined;
  }) => void;
  carInfo: CarInfoProps;
  isDisable: boolean;
  isEditable: boolean;
  isCreate: boolean;
  statusDropDownData: { label: string; value: string }[];
  carMakeInfo: { label: string; value: string }[];
  carModelInfo: { label: string; value: string }[];
  carColorInfo: { label: string; value: string }[];
  warehouseLocationsInfo: { label: string; value: string }[];
  onCarMakeSelectChange: (carMakeId: string) => void;
  onCarMakeTextChange: () => void;
  onDrop: (e: File) => void;
  photoURL: string;
  handleReset: () => void;
}
export const ManageCars: React.FC<ManageCarsInterfaceProps> = ({
  backButtonHandler,
  saveUpdateButtonHandler,
  carInfo,
  isDisable,
  isEditable,
  statusDropDownData,
  isCreate,
  carMakeInfo,
  carModelInfo,
  carColorInfo,
  warehouseLocationsInfo,
  onCarMakeSelectChange,
  onCarMakeTextChange,
  onDrop,
  photoURL,
  handleReset,
}) => {
  return (
    <>
      {((isEditable || isDisable) && carInfo.carId !== '') || isCreate ? (
        <PageContainer
          mainHeadingName='Car Details'
          backIcon={true}
          backIconOnClick={backButtonHandler}
        >
          <Formik
            initialValues={{
              carId: _.get(carInfo, 'carId') ? _.get(carInfo, 'carId') : '',
              carMakeId: _.get(carInfo, 'carMakeId')
                ? _.get(carInfo, 'carMakeId')
                : '',
              carModelId: _.get(carInfo, 'carModelId')
                ? _.get(carInfo, 'carModelId')
                : '',
              carColorId: _.get(carInfo, 'carColorId')
                ? _.get(carInfo, 'carColorId')
                : '',
              carStatusId: _.get(carInfo, 'fkiCarStatusId')
                ? _.get(carInfo, 'fkiCarStatusId')
                : '',
              licensePlateNumber: _.get(carInfo, 'licensePlateNumber')
                ? _.get(carInfo, 'licensePlateNumber')
                : '',
              locationId: _.get(carInfo, 'location')
                ? _.get(carInfo, 'location')
                : '',
              additionalNotes: _.get(carInfo, 'additionalNotes')
                ? _.get(carInfo, 'additionalNotes')
                : '',
              photoURL: _.get(carInfo, 'photoURL')
                ? _.get(carInfo, 'photoURL')
                : '',
              stalling: _.get(carInfo, 'stalling')
                ? _.get(carInfo, 'stalling')
                : '',
              carMakeName: _.get(carInfo, 'carMakeName')
                ? isEditable
                  ? _.get(carInfo, 'carMakeId')
                  : _.get(carInfo, 'carMakeId')
                : isEditable
                ? _.get(carInfo, 'carMakeId')
                : '',
              carModelName: _.get(carInfo, 'carModelName')
                ? isEditable
                  ? _.get(carInfo, 'carModelId')
                  : _.get(carInfo, 'carModelId')
                : isEditable
                ? _.get(carInfo, 'carModelId')
                : '',
              carColorName: _.get(carInfo, 'carColorName')
                ? isEditable
                  ? _.get(carInfo, 'carColorId')
                  : _.get(carInfo, 'carColorId')
                : isEditable
                ? _.get(carInfo, 'carColorId')
                : '',
            }}
            validationSchema={CarsPageValidation}
            onSubmit={(values) => {
              values.photoURL = photoURL;
              saveUpdateButtonHandler(values);
            }}
            onReset={(values) => {
              values.carMakeId = _.get(carInfo, 'carMakeId')
                ? _.get(carInfo, 'carMakeId')
                : '';
              values.carModelId = _.get(carInfo, 'carModelId')
                ? _.get(carInfo, 'carModelId')
                : '';
              values.carColorId = _.get(carInfo, 'carColorId')
                ? _.get(carInfo, 'carColorId')
                : '';
              values.carMakeName = _.get(carInfo, 'carMakeName')
                ? isEditable
                  ? _.get(carInfo, 'carMakeId')
                  : _.get(carInfo, 'carMakeId')
                : isEditable
                ? _.get(carInfo, 'carMakeId')
                : '';
              values.carModelName = _.get(carInfo, 'carModelName')
                ? isEditable
                  ? _.get(carInfo, 'carModelId')
                  : _.get(carInfo, 'carModelId')
                : isEditable
                ? _.get(carInfo, 'carModelId')
                : '';
              values.carColorName = _.get(carInfo, 'carColorName')
                ? isEditable
                  ? _.get(carInfo, 'carColorId')
                  : _.get(carInfo, 'carColorId')
                : isEditable
                ? _.get(carInfo, 'carColorId')
                : '';
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              resetForm,
              isValid,
              touched,
              handleBlur,
              setFieldValue,
              setFieldError,
            }) => (
              <form className='container-fluid' onSubmit={handleSubmit}>
                <div className='row manage-cars-page'>
                  <div className='col-md-8'>
                    <div className='col-md-12'>
                      <DetailsContainer
                        heading='Car Details'
                        isCollapsible={false}
                      >
                        <>
                          <div className='manage-cars-page__car-info'>
                            <div className='row'>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {ConstantStrings.manageCar.make}
                                </label>
                                {carMakeInfo && (
                                  <SearchableDropdown
                                    name='car-make'
                                    options={carMakeInfo}
                                    labelName='Car Make'
                                    defaultValue={values.carMakeId}
                                    handleChange={(e) => {
                                      if (e?.target.value === '') {
                                        setFieldValue(
                                          'carMakeName',
                                          e?.target.value
                                        );
                                        setFieldValue('carMakeId', '');
                                        onCarMakeTextChange();
                                      } else {
                                        setFieldValue(
                                          'carMakeName',
                                          e?.target.value
                                        );
                                        setFieldValue('carMakeId', 0);
                                        onCarMakeTextChange();
                                      }
                                      setFieldError('carMakeId', undefined);
                                      setFieldError('carMakeName', undefined);
                                    }}
                                    handleSelectChange={(
                                      e,
                                      value: string,
                                      label: string
                                    ) => {
                                      setFieldValue('carMakeId', value);
                                      setFieldValue('carMakeName', label);
                                      setFieldError('carMakeId', undefined);
                                      setFieldError('carMakeName', undefined);
                                      onCarMakeSelectChange(value);
                                    }}
                                    isDisable={isDisable}
                                    handleBlur={handleBlur('carMakeId')}
                                    error={errors.carMakeName}
                                    touched={touched.carMakeName}
                                  />
                                )}
                              </div>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {ConstantStrings.manageCar.model}
                                </label>
                                {carModelInfo && (
                                  <SearchableDropdown
                                    name='car-model'
                                    options={carModelInfo}
                                    defaultValue={values.carModelId}
                                    labelName='Model'
                                    handleChange={(e) => {
                                      setFieldValue(
                                        'carModelName',
                                        e?.target.value
                                      );
                                      setFieldValue('carModelId', 0);

                                      setFieldError('carModelId', undefined);
                                      setFieldError('carModelName', undefined);
                                    }}
                                    handleSelectChange={(
                                      e,
                                      value: string,
                                      label: string
                                    ) => {
                                      setFieldValue('carModelId', value);
                                      setFieldValue('carModelName', label);

                                      setFieldError('carModelId', undefined);
                                      setFieldError('carModelName', undefined);
                                    }}
                                    isDisable={isDisable}
                                    handleBlur={handleBlur('carModelId')}
                                    error={errors.carModelName}
                                    touched={touched.carModelName}
                                  />
                                )}
                              </div>
                            </div>
                            <div className='row pdtopbtm'>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {ConstantStrings.manageCar.numberPlate}
                                </label>
                                <InputTextField
                                  name='cars-numberPlate-inputField upper-case'
                                  fieldName='numberPlate'
                                  id=''
                                  placeholder=''
                                  inputType='text'
                                  requiredOrNot={true}
                                  value={values.licensePlateNumber}
                                  onChangeText={handleChange(
                                    'licensePlateNumber'
                                  )}
                                  error={errors.licensePlateNumber}
                                  touched={touched.licensePlateNumber}
                                  onBlur={handleBlur('licensePlateNumber')}
                                  isDisable={isDisable}
                                />
                              </div>
                              <div className='col-md-6'>
                                <label className='label'>
                                  {ConstantStrings.manageCar.color}
                                </label>
                                {carColorInfo && (
                                  <SearchableDropdown
                                    name='car-color'
                                    options={carColorInfo}
                                    defaultValue={values.carColorId}
                                    labelName='Color'
                                    handleChange={(e) => {
                                      setFieldValue(
                                        'carColorName',
                                        e?.target.value
                                      );
                                      setFieldValue('carColorId', 0);
                                      setFieldError('carColorId', undefined);
                                      setFieldError('carColorName', undefined);
                                    }}
                                    handleSelectChange={(
                                      e,
                                      value: string,
                                      label: string
                                    ) => {
                                      setFieldValue('carColorId', value);
                                      setFieldValue('carColorName', label);
                                      setFieldError('carColorId', undefined);
                                      setFieldError('carColorName', undefined);
                                    }}
                                    isDisable={isDisable}
                                    handleBlur={handleBlur('carColorId')}
                                    error={errors.carColorName}
                                    touched={touched.carColorName}
                                  />
                                )}
                              </div>
                            </div>
                            <div className='row pdtopbtm'>
                              <div className='col-md-6'>
                                {warehouseLocationsInfo && (
                                  <CustomDropDown
                                    name='status-dropdown '
                                    dropdownList={warehouseLocationsInfo}
                                    labelName='Location'
                                    onValueSelect={handleChange('locationId')}
                                    error={errors.locationId}
                                    touched={touched.locationId}
                                    onBlur={handleBlur('locationId')}
                                    showSelectText={true}
                                    defaultValue={values.locationId}
                                    isDisable={isDisable}
                                  />
                                )}
                              </div>
                              <div
                                className='col-md-6'
                                style={{ marginTop: '-7px'}}
                              >
                                <label className='label'>
                                  {ConstantStrings.manageCar.stalling}
                                </label>
                                <InputTextField
                                  name='cars-numberPlate-inputField'
                                  fieldName='numberPlate'
                                  id=''
                                  placeholder=''
                                  inputType='text'
                                  requiredOrNot={false}
                                  value={values.stalling}
                                  onChangeText={handleChange('stalling')}
                                  error={errors.stalling}
                                  touched={touched.stalling}
                                  onBlur={handleBlur('stalling')}
                                  isDisable={isDisable}
                                />
                              </div>
                            </div>
                            <div className='row pdtopbtm'>
                              <div className='col-md-12'>
                                <label className='label'>
                                  {ConstantStrings.manageCar.additionalNotes}
                                </label>
                                <textarea
                                  name='cars-description-inputField'
                                  id=''
                                  title='Additional Notes'
                                  value={values.additionalNotes}
                                  onChange={handleChange('additionalNotes')}
                                  disabled={isDisable}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </>
                      </DetailsContainer>
                    </div>
                  </div>
                  <div className='col-md-4 details-card-containers'>
                    <div className='col-md-12'>
                      <CardContainer
                        heading='User Type Actions'
                        isUserImageAvailable={true}
                        isFileUpload={true}
                        photoURL={photoURL}
                        statusDropDownList={statusDropDownData}
                        statusDropDownOnChange={handleChange('carStatusId')}
                        statusDefaultValue={
                          isEditable
                            ? values.carStatusId
                            : values.carStatusId !== ''
                            ? values.carStatusId
                            : ''
                        }
                        errorStatus={errors.carStatusId}
                        touchedStatus={touched.carStatusId}
                        onBlurStatus={handleBlur('carStatusId')}
                        showStatusSelectText={true}
                        onSaveAndUpdateButtonOnClick={handleSubmit}
                        onDiscardButtonOnClick={() => {
                          resetForm();
                          handleReset();

                          (values.carMakeId = _.get(carInfo, 'carMakeId')
                            ? _.get(carInfo, 'carMakeId')
                            : ''),
                            (values.carModelId = _.get(carInfo, 'carModelId')
                              ? _.get(carInfo, 'carModelId')
                              : ''),
                            (values.carColorId = _.get(carInfo, 'carColorId')
                              ? _.get(carInfo, 'carColorId')
                              : '');
                        }}
                        isValid={isValid}
                        isDisable={isDisable}
                        onDrop={onDrop}
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
