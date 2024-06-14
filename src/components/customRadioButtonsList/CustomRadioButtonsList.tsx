import React, { useState, useEffect } from 'react';

interface RadiobuttonListInfo {
  value: string;
  label: string;
}
interface Props {
  name: string | undefined;
  radioButtonList: RadiobuttonListInfo[];
  handleRadioButtonLClick: (e: React.ChangeEvent<HTMLInputElement>,
    featureValue: string,
    feature:  {
      value: string,
      label: string
    },
    access: {
      value: string,
      label: string
    }) => void;
  isDisable?: boolean;
  error?: string;
  defaultValue?: string;
  showSelectText?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement> | undefined) => void;
  touched?: boolean;
  id: string;
  defaultChecked?: string | number;
  values: {featureId: string, accessId: string}[];
  feature: {value: string, label: string};
}

export const CustomRadioButtonList: React.FC<Props> = ({
  name,
  radioButtonList,
  handleRadioButtonLClick,
  isDisable,
  id,
  defaultChecked,
  values,
  feature,
}) => {
  const [checkedorNot, setCheckedOrNot] = useState(defaultChecked);

  useEffect(() => {
    if(values.length === 0){
      setCheckedOrNot(-1);
    }
  }, [values]);

  return (
    <div className='radiobutton row'>
      {/* {labelName && <label className='radiobutton-label'>{labelName}</label>} */}
      {radioButtonList &&
        radioButtonList.map((access, index) => {
          return values.length === 0 ? (
            <div className='col-md-3 feature-radio' key={index}>
              <input
                type='radio'
                id={`feature_${id}_access_${access.value}`}
                name={`feature_${id}_access`}
                value={access.value}
                onChange={(e) => {
                  setCheckedOrNot(access.value);
                  handleRadioButtonLClick(e, id, feature, access);
                }}
                disabled={isDisable}
                className={name}
                checked={
                  values.length === 0 && checkedorNot === access.value
                    ? true
                    : false
                }
              />
              <label htmlFor={`feature_${id}_access_${access.value}`}>
                {access.label}
              </label>
            </div>
          ) : (
            <div className='col-md-3 feature-radio' key={index}>
              <input
                type='radio'
                id={`feature_${id}_access_${access.value}`}
                name={`feature_${id}_access`}
                value={access.value}
                onChange={(e) => {
                  setCheckedOrNot(access.value);
                  // setCheckedOrNot(-1);
                  handleRadioButtonLClick(e, id, feature, access);
                }}
                disabled={isDisable}
                className={name}
                checked={
                  values.length > 0 && checkedorNot === access.value
                    ? true
                    : false
                }
              />
              <label htmlFor={`feature_${id}_access_${access.value}`}>
                {access.label}
              </label>
            </div>
          );
        })}
    </div>
  );
};
