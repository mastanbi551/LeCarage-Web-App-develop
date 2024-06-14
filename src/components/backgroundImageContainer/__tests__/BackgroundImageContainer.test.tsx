
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BackgroundImageContainer } from '../BackgroundImageContainer';
import { ImagesPath } from '../../../utils/constants'; 

describe('BackgroundImageContainer', () => {
  test('renders children element and sets correct image source', () => {
    const imageSource = ImagesPath.bgImageWithCar;
    const { getByTestId } = render(
        <BackgroundImageContainer imageSource={imageSource}>
        <div data-testid="child-element">Child Element</div>
        </BackgroundImageContainer>
    );

    const container = screen.getByTestId('background-image-container');
    expect(container).toHaveStyle(`background-image: url(${imageSource})`);
    expect(container).toHaveStyle('background-size: cover');
    expect(container).toHaveStyle('background-repeat: no-repeat');
    expect(container).toHaveStyle('background-position: center');
    expect(container).toHaveStyle('height: 100vh');
    expect(container).toHaveStyle('overflow: hidden');
    expect(getByTestId('child-element')).toBeInTheDocument();
  });
});
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BackgroundImageContainer } from '../BackgroundImageContainer';
// import { ImagesPath } from '../../../assets/constants';

// describe('Background Image Component', () => {
//     test('Background Image', () => {
//         render(<BackgroundImageContainer data-testid='background-image' imageSource={ImagesPath.bgImageWithCar}>{}</BackgroundImageContainer>); 
//         const bgImage = screen.getByTestId('background-image');
//         expect(bgImage.style.backgroundImage).toBe(`url(${ImagesPath.bgImageWithCar})`);
//     });
// });


