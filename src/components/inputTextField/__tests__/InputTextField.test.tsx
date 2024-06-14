import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InputTextField } from '../InputTextField';

describe('InputTextField', () => {
  it('renders input field with correct props', () => {
    const placeholder = 'Enter your name';
    const inputType = 'text';
    const id = 'name-input';
    const name = 'name';
    const fieldName = 'name';
    const required = true;
    const value = 'John Doe';
    const { getByPlaceholderText, getByDisplayValue } = render(
      <InputTextField
        placeholder={placeholder}
        inputType={inputType}
        id={id}
        name={name}
        fieldName={fieldName}
        requiredOrNot={required}
        value={value}
      />
    );

    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', inputType);
    expect(input).toHaveAttribute('id', id);
    expect(input).toHaveAttribute('name', fieldName);
    expect(input).toHaveAttribute('required', '');
    expect(getByDisplayValue(value)).toBeInTheDocument();
  });

  it('calls onChangeText prop when input is changed', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTextField
        placeholder='Enter your name'
        inputType='text'
        id='name-input'
        name='name'
        fieldName='name'
        requiredOrNot={true}
        value='John Doe'
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    expect(onChangeText).toHaveBeenCalled();
  });

  it('renders children element', () => {
    const { getByText } = render(
      <InputTextField name={'name'} id={'name-input'} placeholder={'Enter your name'} inputType={'text'} requiredOrNot={true} value={'Jhon Doe'} >
        <span>Hello World</span>
      </InputTextField>
    );

    const children = getByText('Hello World');
    expect(children).toBeInTheDocument();
  });
});
