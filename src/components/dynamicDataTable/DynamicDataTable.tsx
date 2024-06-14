import FuzzySearch from 'fuzzy-search';
import React, { useEffect, useState } from 'react';
import { DynamicDataTableItems } from './DynamicDataTableItems';
import './DynamicDataTable.scss';
import _ from 'lodash';

interface DynamicTableProps {
  tableHeading: string;
  isSearchIconEnable: boolean;
  isFilterIconEnable: boolean;
  columns: {accessor: string, Header: string}[];
  data: [];
  searchValue: string[];
  filterValues: {mainMenu: string, subMenus: string[]}[];
  onViewHandler: (rowInfo: object) => void;
  onEditHandler: (rowInfo: object) => void;
  onDeleteHandler?: (rowInfo: object) => void;
  defaultItemsPerPage: number;
  errorMessage?: string;
  isEditIconEnable?: boolean;
  isDeleteIconEnable?: boolean;
  access?: string;
  rowsPerPageValueChange: (value: string) => void;
}

export const DynamicDataTable = ({
  tableHeading,
  isSearchIconEnable,
  isFilterIconEnable,
  columns,
  data,
  searchValue,
  filterValues,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  defaultItemsPerPage,
  errorMessage,
  isEditIconEnable,
  isDeleteIconEnable,
  access,
  rowsPerPageValueChange
}: DynamicTableProps) => {

  const [itemOffset, setItemOffset] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [customData, setCustomData] = useState([]);

  const [endOffset, setEndOffset] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [rowsPerPage, setRowsPerPage] = useState([]);
  const [displayColumns, setDisplayColumns] = useState<{label: string, value: string}[]>([]);
  
  const setRows = (rowsPerPageData: never[]) => {
    const columns: {label: string, value: string}[] = [];
    const chunkedArray = _.chunk(rowsPerPageData, itemsPerPage);
    let pagePerItems = 0;
    rowsPerPageData && chunkedArray && chunkedArray.map(() => {
      if(displayColumns.length === 0){
        pagePerItems = pagePerItems + parseInt(itemsPerPage.toString());
        const updatedColumn = [{
            label: pagePerItems.toString(),
            value: pagePerItems.toString(),
          }
        ];
        columns.push(updatedColumn[0]);
      }
      else {
        pagePerItems = pagePerItems + parseInt(itemsPerPage.toString());
        const updatedColumn = [
          ...displayColumns, {
            label: pagePerItems.toString(),
            value: pagePerItems.toString(),
          }
        ];
        columns.push(updatedColumn[0]);
      }
    });
    setDisplayColumns(columns);
  };

  useEffect(() => {
    if(data.length > 0){
      setCustomData(data);
    }
  }, [data]);

  useEffect(() => {
    if(customData && customData.length > 0 && displayColumns.length === 0){
      setRows(customData);
    }
  }, [customData]);

  const updateData = (staticData: never[]) => {
    setEndOffset(itemOffset + parseInt(defaultItemsPerPage?.toString()));
    setPageData(staticData?.slice(itemOffset, endOffset));
  };

  useEffect(() => {
    updateData(customData);
  }, [endOffset, itemOffset, defaultItemsPerPage]);


  const searcher = new FuzzySearch(data, searchValue, {
    caseSensitive: false,
  });

  const filter = new FuzzySearch(data, searchValue, {
    caseSensitive: true,
  });

  const setData = (data: never[]) => {
    setPageData(data);
    setItemsPerPage(defaultItemsPerPage);
    setItemOffset(0);
    updateData(data);
  };

  const onSearchChangeHandler = (searchTerm: string) => {
    const result = searcher.search(searchTerm);    

    const filteredArray = data.filter((obj) => {
      const values = Object.values(obj);
      return values.some((value: any) =>
        value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setData(filteredArray);
    setCustomData(filteredArray);
    setDisplayColumns([]);
  };

  const handleCategoryChange = (value: string) => {
    if(value !== ''){
      const result = filter.search(value);
      setData(result);
      setCustomData(result);
      setDisplayColumns([]);
    }
  };

  const currentPage = pageIndex + 1;
  const canPreviousPage = pageIndex > 0;
  const canNextPage = currentPage < Math.ceil(data.length / defaultItemsPerPage);

  useEffect(() => {
    if(pageIndex === 0){
      const newOffset = (pageIndex * parseInt(defaultItemsPerPage.toString())) % data.length;
      setItemOffset(newOffset);
    }
    else {
      const newOffset = (pageIndex * parseInt(defaultItemsPerPage.toString())) % data.length;
      setItemOffset(newOffset);
    }
  }, [pageIndex, data]);

  const nextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const previousPage = () => {
    setPageIndex(pageIndex - 1);
  };

  const gotoPage = (page: number) => {
    if (page == 0) {
      setPageIndex(page);
    } else {
      setPageIndex(page);
    }
  };

  return (
    <>
      <DynamicDataTableItems
        tableHeading={tableHeading}
        isSearchIconEnable={isSearchIconEnable}
        isFilterIconEnable={isFilterIconEnable}
        columns={columns}
        data={pageData}
        tableData={customData}
        filterValues={filterValues}
        onViewHandler={onViewHandler}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        onSearchChangeHandler={onSearchChangeHandler}
        handleCategoryChange={handleCategoryChange}
        rowsPerPage={displayColumns}
        rowsPerPageValueChange={rowsPerPageValueChange}        
        itemOffset={itemOffset}
        endOffset={endOffset}       
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        errorMessage={errorMessage}
        isEditIconEnable={isEditIconEnable}
        isDeleteIconEnable={isDeleteIconEnable}
        access={access}
        defaultItemsPerPage={defaultItemsPerPage}
      />
    </>
  );
};
