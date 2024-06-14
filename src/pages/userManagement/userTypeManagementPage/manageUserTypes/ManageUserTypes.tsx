import React, { useState } from 'react';
import {
  InputTextField,
  PageContainer,
  DetailsContainer,
  CardContainer,
  Loader,
} from '../../../../components';
import './ManageUserTypes.scss';
import { ConstantStrings } from '../../../../utils/constants';
import { Formik } from 'formik';
import { UserTypesPageValidation } from '../../../../utils/ValidationSchemas';
import { CustomRadioButtonList } from '../../../../components/index';
import _ from 'lodash';
//ManageUserTypes page handles create Usertypes functionality and update Usertypes functionality
interface ManageUserTypesInterfaceProps {
  backButtonHandler: () => void;
  userTypeData: {
    userTypeId: string;
    userType: string;
    description: string;
    statusId: string;
    features: {
      featureId: string;
      accessId: string;
    }[];
  };
  statusDropDownData: { label: string; value: string }[];
  isDisable: boolean;
  featuresList: { label: string; value: string }[];
  featureAccessList: { label: string; value: string }[];
  isEditable: boolean;
  isCreate: boolean;
  handleRadioButtonClick: (e: React.ChangeEvent<HTMLInputElement>,
    featureValue: string,
    feature:  {
      value: string,
      label: string
    },
    access: {
      value: string,
      label: string
    }) => void;
  saveOrUpdateButtonHandler: (values: {
    userTypeId: string,
    userType: string,
    description: string
    statusId: string,
    features: {
      featureId: string,
      accessId: string
    }[],
  }) => void;
  selectedFeatureAccessList: {
    accessId: string,
    featureId: string
  }[],
  handleReset: (values: {
    userTypeId: string,
    userType: string,
    description: string
    statusId: string,
    features: {
      featureId: string,
      accessId: string
    }[],
  }) => void;
}
export const ManageUserTypes: React.FC<ManageUserTypesInterfaceProps> = ({
  backButtonHandler,
  userTypeData,
  statusDropDownData,
  isDisable,
  featuresList,
  featureAccessList,
  isEditable,
  isCreate,
  handleRadioButtonClick,
  saveOrUpdateButtonHandler,
  selectedFeatureAccessList,
  handleReset
}) => {
  const [submitClick, setSubmitClick] = useState(false);

  return (
    <>
      {((isEditable || isDisable) && userTypeData.userTypeId !== '') || isCreate ? (
        <PageContainer
          mainHeadingName='User Types'
          backIcon={true}
          backIconOnClick={backButtonHandler}
        >
          <Formik
            initialValues={{
              userTypeId: _.get(userTypeData, 'userTypeId') ? _.get(userTypeData, 'userTypeId') : '',
              userType: _.get(userTypeData, 'userType') ? _.get(userTypeData, 'userType') : '',
              description: _.get(userTypeData, 'description') ? _.get(userTypeData, 'description') : '',
              statusId: _.get(userTypeData, 'statusId') ? _.get(userTypeData, 'statusId') : '',
              features: _.get(userTypeData, 'features') ? _.get(userTypeData, 'features') : []
            }}
            validationSchema={UserTypesPageValidation}
            onSubmit={(values) => {
              saveOrUpdateButtonHandler(values);
            }} 
            onReset={(values) => {
              values.features =  _.get(userTypeData, 'features') ? _.get(userTypeData, 'features') : [];
              handleReset(values);
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
              <>
                <form className='container-fluid' onSubmit={handleSubmit}>
                  <div className='row manage-usertypes-page'>
                    <div className='col-md-8'>
                      <div className='col-md-12'>
                        <DetailsContainer
                          heading='User Type Details'
                          isCollapsible={false}
                        >
                          <>
                            <div className='manage-usertypes-page__usertype-info'>
                              <div className='row'>
                                <div className='col-md-6'>
                                  <label className='label'>
                                    {
                                      ConstantStrings.manageUserType
                                        .userTypeName
                                    }
                                  </label>
                                  <InputTextField
                                    name='user-type-name-inputField'
                                    fieldName='usertypename'
                                    id=''
                                    placeholder=''
                                    inputType='text'
                                    requiredOrNot={true}
                                    value={values && values.userType}
                                    onChangeText={handleChange('userType')}
                                    isDisable={isDisable}
                                    onBlur={handleBlur('userType')}
                                    error={errors.userType}
                                    touched={touched.userType}
                                  />
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-md-12'>
                                  <label className='label'>
                                    {ConstantStrings.manageUserType.description}
                                  </label>
                                  <InputTextField
                                    name='user-type-description-inputField'
                                    fieldName='usertypeDescription'
                                    id=''
                                    placeholder=''
                                    inputType='text'
                                    requiredOrNot={true}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    isDisable={isDisable}
                                    onBlur={handleBlur('description')}
                                    error={errors.description}
                                    touched={touched.description}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className='manage-usertypes-page__fetaures-info'>
                              <h1 className='heading'>
                                {ConstantStrings.manageUserType.userTypeDetails}
                              </h1>

                              {featuresList &&
                                featuresList.map((feature: { label: string, value: string}, index: number) => {
                                  const result = _.filter(selectedFeatureAccessList, {
                                    featureId: feature.value,
                                  });

                                  return (
                                    <div
                                      key={feature.value}
                                      className='feature-heading'
                                    >
                                      <h1 className='feature-heading'>
                                        {feature.label}
                                      </h1>
                                      <div className='row'>
                                        
                                        {
                                          isEditable || isDisable ?
                                            <CustomRadioButtonList
                                              radioButtonList={featureAccessList}
                                              name=''
                                              handleRadioButtonLClick={() => {
                                                setSubmitClick(false);
                                                handleRadioButtonClick;
                                              }}
                                              id={feature.value}
                                              defaultChecked={result.length > 0 ? result[0].accessId : -1}
                                              values={selectedFeatureAccessList}
                                              feature={feature}
                                              isDisable={isDisable}
                                          />
                                          :
                                          <CustomRadioButtonList
                                          radioButtonList={featureAccessList}
                                          name=''
                                          handleRadioButtonLClick={handleRadioButtonClick}
                                          id={feature.value}
                                          //defaultChecked={result.length > 0 ? result[0].accessId : -1}
                                          values={selectedFeatureAccessList}
                                          feature={feature}
                                          isDisable={isDisable}
                                      />

                                        }
                                        
                                        
                                      </div>
                                    </div>
                                  );
                                })}

                              {selectedFeatureAccessList.length === 0 && submitClick &&
                                <div className='validation-error-message text-align-left'>
                                {'select usertype details'}
                              </div>
                              }
                                
                            </div>
                          </>
                        </DetailsContainer>
                      </div>
                    </div>
                    <div className='col-md-4 details-card-containers'>
                      <div className='col-md-12'>
                        <CardContainer
                          heading='User Type Actions'
                          showStatusSelectText={true}
                          statusDropDownList={statusDropDownData}
                          statusDropDownOnChange={handleChange('statusId')}
                          errorStatus={errors.statusId}
                          touchedStatus={touched.statusId}
                          onBlurStatus={handleBlur('statusId')}
                          statusDefaultValue={isEditable ? values.statusId : values.statusId !== '' ? values.statusId : ''}
                          onSaveAndUpdateButtonOnClick={() => {
                            setSubmitClick(true);
                            handleSubmit();
                          }}
                          onDiscardButtonOnClick={() => {
                            resetForm();
                            handleReset(values);
                          }}
                          isValid={isValid}
                          isDisable={isDisable}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </PageContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
