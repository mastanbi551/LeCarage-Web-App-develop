import React from 'react';
import './CustomButton.scss';

interface Props {
  title: string | undefined;
  buttonOnClick?: () => void;
  name: string | undefined;
  isDisable?: boolean | undefined;
  role?: string;
  dataTestId?: string,
  access?: string
}

export const CustomButton: React.FC<Props> = ({
  title,
  buttonOnClick,
  name,
  isDisable,
  dataTestId,
}) => {
  return (
    <button
      type='button'
      className={name}
      onClick={buttonOnClick}
      disabled={isDisable ? isDisable : false}
      data-testid={dataTestId}
    >
      {title}
    </button>
  );
};