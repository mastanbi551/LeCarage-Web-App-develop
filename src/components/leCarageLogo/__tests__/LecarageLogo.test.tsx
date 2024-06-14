import React from 'react';
import { render } from '@testing-library/react';
import { LeCarageLogo } from '../LeCarageLogo';
import { ImagesPath } from '../../../utils/constants';

describe('Lecarage Logo Component', () => {
    test('Lecarage Logo', () => {
        render(<LeCarageLogo source={ImagesPath.lecaragelogo} altText='Lecarage Logo' />);
        const testImage = document.querySelector('img') as HTMLImageElement;
        expect(testImage.alt).toContain('Lecarage Logo');
        expect(testImage.src).toContain(ImagesPath.lecaragelogo);
    });
});


