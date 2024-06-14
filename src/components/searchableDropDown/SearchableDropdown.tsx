import _, { drop } from 'lodash';
import React, { useState, useRef, useEffect } from 'react';
import './SearchableDropdown.scss';

interface Option {
  label: string;
  value: string;
}

interface SearchableDropdownProps {
  options: Option[];
  labelName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  handleSelectChange: (e: React.FormEvent<HTMLLIElement> | undefined, value: string, label: string) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: string | string[] | undefined;
  touched?: boolean | undefined;
  // onValueSelect: (
  //   e: React.FormEvent<HTMLLIElement>,
  //   value: string,
  //   label: string
  // ) => void;
  name: string;
  isDisable?: boolean | undefined;
  defaultValue?: string
  onFocus?: React.FocusEventHandler<HTMLLIElement> | undefined
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  labelName,
  handleChange,
  handleBlur,
  error,
  touched,
  name,
  isDisable,
  // onValueSelect,
  handleSelectChange,
  defaultValue,
  onFocus
}) => {
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [dropdownOptions, setDropdownOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownValue, setDropdownValue] = useState<string | undefined>('');

  useEffect(() => {
    setDropdownOptions(options);
    const initialValue = options && options.length > 0 ? _.find(options, { value: defaultValue })?.label : '';
    setInputValue(initialValue);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if(defaultValue !== ''){
      setDropdownValue(defaultValue);
      //setInputValue(defaultValue);
    }
  }, [defaultValue]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  
    // Check if the input value exactly matches any existing option's label
    const selectedOption = options.find((option) =>
      option.label.toLowerCase() === value.toLowerCase()
    );
  
    if (selectedOption) {
      // If a match is found, set it as the selected option and close the dropdown
      setDropdownOptions([selectedOption]);
      setIsOpen(false);
      handleItemClick(selectedOption.label);
      handleSelectChange(undefined, selectedOption.value, selectedOption.label);
    } else {
      // If no match is found, filter the dropdown options based on the input value
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setDropdownOptions(filteredOptions);
      setIsOpen(true);
    }
  };
  

  const handleItemClick = (value: string) => {
    setInputValue(value);
    setIsOpen(false);
  };

  return (
    <div className="searchable-dropdown input-text-field" ref={dropdownRef}>
      <input
        className={name + ' static'}
        type="text"
        value={defaultValue === '' ? '' : inputValue}
        onChange={(e) => {
          handleInputChange(e);
          handleChange(e);
        }}
        disabled={isDisable ? true : false}
        placeholder="Create/Select"
        onClick={() => setIsOpen(true)}
        onBlur={handleBlur}
        onKeyDown= {(e) => setIsOpen(true)}
        defaultValue={defaultValue}
      />
      
      {isOpen && dropdownOptions.length > 0 && (
        <ul className="inputdropdown" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {dropdownOptions.map((option, index) => (
            <li
              key={index}
              value={defaultValue !== '' ? defaultValue : option.label}
              defaultValue={defaultValue}
              onClick={(e) => {
                handleSelectChange(e, option.value, option.label);
                handleItemClick(option.label);
                // onValueSelect(e, option.value, option.label);                
              }}
              onFocus={onFocus}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && touched ? (
        <div className="validation-error-message text-align-left">{error}</div>
      ) : null}
    </div>
  );
};
