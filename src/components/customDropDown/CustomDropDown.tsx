import React, { FocusEventHandler, RefObject, useEffect, useRef } from 'react';
import '../customDropDown/CustomDropDown.scss';
import Select, { ActionMeta, SingleValue } from 'react-select';

interface dropdownListInfo {
  value: string;
  label: string;
}
interface Props {
  name: string | undefined;
  dropdownList: dropdownListInfo[];
  onValueSelect?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  labelName?: string;
  isDisable?: boolean;
  error?: string;
  defaultValue?: string;
  showSelectText?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement> | undefined) => void;
  touched?: boolean;
  isSearchable?: boolean;
  searchOnChange?:
  | ((
    newValue: SingleValue<dropdownListInfo>,
    actionMeta: ActionMeta<dropdownListInfo>
  ) => void)
  | undefined;
  customText?: string; // Add customText prop
  searchOnBlur?: (e: React.FocusEvent<HTMLSelectElement> | undefined) => void;

}


export const CustomDropDown: React.FC<Props> = ({
  name,
  dropdownList,
  onValueSelect,
  labelName,
  isDisable,
  error,
  defaultValue,
  showSelectText,
  onBlur,
  touched,
  isSearchable,
  searchOnChange,
  searchOnBlur,


  customText = 'Other', // Set default value for customText prop
}) => {
  // Check if defaultValue is a valid option

  const handleSearchChange = (
    newValue: SingleValue<dropdownListInfo>,
    actionMeta: ActionMeta<dropdownListInfo>
  ) => {
    if (typeof searchOnChange === 'function') {
      const query = (newValue as dropdownListInfo)?.label || '';
  
      // Adjust the minimum character threshold as needed
      const minimumCharThreshold = 2;
  
      if (query.length >= minimumCharThreshold) {
        const filteredOptions = dropdownList.filter((option) => {
          // Convert the search query and option label to lowercase for case-insensitive comparison
          const searchQuery = query.toLowerCase();
          const optionLabel = option.label.toLowerCase();
  
          // Check if the option label starts with the search query
          return optionLabel.startsWith(searchQuery);
        });
  
        // Pass the filtered options to the searchOnChange function
        searchOnChange(filteredOptions.length > 0 ? filteredOptions[0] : null, actionMeta);
      } else {
        // If the search query does not meet the minimum character threshold, clear the selected option
        searchOnChange(null, actionMeta);
      }
    }
  };
  
  
  const customFilterOption = (option: dropdownListInfo, rawInput: string) => {
    const searchQuery = rawInput.toLowerCase();
    const optionLabel = option.label.toLowerCase();
  
    return optionLabel.includes(searchQuery);
  };
  
  

  const defaultOption = dropdownList.find(
    (option) => option.value === defaultValue
  );

  const hasDefaultOption = !!defaultOption;

  const selectRef: RefObject<any> = useRef(null);

  if(isSearchable) {
    defaultValue === '' && selectRef.current?.select?.clearValue();
  }
  return (
    <div className={isDisable ? 'dropdown input-text-field disabled' :'dropdown input-text-field'}>
      {labelName && <label className='dropDown-label'>{labelName}</label>}
      {isSearchable ? (
        <>
          <Select
            ref={selectRef}
            className={`custom-select ${name}`}
            filterOption={customFilterOption}
            options={dropdownList}
            onChange={handleSearchChange}
            onBlur={(e) => searchOnBlur}
            defaultValue={defaultOption ? defaultOption : null}
            value={defaultOption ? defaultOption : null}
            isDisabled={isDisable}
            placeholder={defaultValue ? defaultValue : 'Select'}
          />
          {error && touched ? (
            <div className='validation-error-message text-align-left'>
              {error}
            </div>
          ) : null}
        </>
      ) : (
        <>
          {dropdownList && (
            <>
              <select
                className={`custom-select ${name}`}
                onChange={onValueSelect}
                disabled={isDisable}
                defaultValue={defaultValue}
                value={defaultValue}
                onBlur={onBlur}
              >
                {showSelectText && (
                  <option className='custom-option' value=''>
                    Select
                  </option>
                )}
                {dropdownList.map((item, index) => {
                  return (
                    <option
                      className='custom-option'
                      value={item.value}
                      key={index}
                      selected={defaultValue === item.value ? true : false}
                    >
                      {item.value === 'Active' ? (
                        <span className='active-icon'></span>
                      ) : (
                        <span className='inactive-icon'></span>
                      )}
                      <span>{item.label}</span>
                    </option>
                  );
                })}
                {/* Add custom option */}
                {/* {!hasDefaultOption && (
              <option
                className='custom-option'
                value={defaultValue}
                selected={true}
              >
                {customText}
              </option>
            )} */}
              </select>
              {error && touched ? (
                <div className='validation-error-message text-align-left'>
                  {error}
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
};
