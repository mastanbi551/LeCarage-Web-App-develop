import React from 'react';
import { render } from '@testing-library/react';
import { CustomFilter } from '../CustomFilter';

describe('CustomFilter', () => {
    it('should match snapshot', () => {
      const filterValues = [      { mainMenu: 'Menu 1', subMenus: ['SubMenu 1', 'SubMenu 2'] },
        { mainMenu: 'Menu 2', subMenus: ['SubMenu 3', 'SubMenu 4'] },
      ];
      const handleFilterItemClick = jest.fn();
      const { container } = render(
        <CustomFilter filterValues={filterValues} handleFilterItemClick={handleFilterItemClick} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
  