import React from 'react';
import './BackgroundImageContainerStyle.scss';
interface BackgroundProps {
    children: React.ReactElement;
    imageSource: string;
  }

export const BackgroundImageContainer :React.FC<BackgroundProps>=({
  children,
  imageSource,
}) => {
    return (
        <div data-testid='background-image-container'
        style={{
          backgroundImage: `url(${imageSource})`,
          // backgroundImage: `url(${externalImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh',
          overflow: 'hidden',          
        }}
      >
            {children}
        </div>
        
    );
};
