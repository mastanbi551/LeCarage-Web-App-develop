import React from 'react';

interface LogoProps {
    source: string;
    altText: string;
    name?: string;
  }  

export const LeCarageLogo : React.FC<LogoProps> = ({ 
  source,    
  altText,   
  name,
}) => {
    return (
       <img src={source} alt={altText} className={name} />
    );
};

