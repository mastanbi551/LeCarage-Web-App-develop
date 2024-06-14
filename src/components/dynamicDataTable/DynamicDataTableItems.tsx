/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { useSortBy, useTable, usePagination } from 'react-table';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbPencil } from 'react-icons/tb';
import Swal from 'sweetalert2';
import '../dynamicDataTable/DynamicDataTableHeader.scss';
import '../../styles/variables.scss';
import { DynamicDataTableHeader } from './DynamicDataTableHeader';
import { CustomDropDown } from '../customDropDown/CustomDropDown';
import {
  CgChevronRight,
  CgPushChevronLeft,
  CgPushChevronRight,
  CgChevronLeft,
} from 'react-icons/cg';
import { Loader } from '../loader/Loader';
import { AccessTypes } from '../../utils/constants/ConstantStrings';
import { table } from 'console';
interface dropdownListInfo {
  value: string;
  label: string;
}

interface DynamicTableProps {
  tableHeading: string;
  isSearchIconEnable: boolean;
  isFilterIconEnable: boolean;
  columns: { accessor: string; Header: string }[];
  data: never[];
  tableData: never[];
  filterValues: { mainMenu: string; subMenus: string[] }[];
  onViewHandler: (rowInfo: object) => void;
  onEditHandler: (rowInfo: object) => void;
  onDeleteHandler?: (rowInfo: object) => void;
  onSearchChangeHandler: (value: string) => void;
  handleCategoryChange: (value: string) => void;

  rowsPerPage: dropdownListInfo[];
  rowsPerPageValueChange: (value: string) => void;

  itemOffset: number;
  endOffset: number;

  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  errorMessage?: string;
  isEditIconEnable?: boolean;
  isDeleteIconEnable?: boolean;
  access?: string;
  defaultItemsPerPage: number
}

export const DynamicDataTableItems: React.FC<DynamicTableProps> = ({
  tableHeading,
  isSearchIconEnable,
  isFilterIconEnable,
  columns,
  data,
  tableData,
  filterValues,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  onSearchChangeHandler,
  handleCategoryChange,
  rowsPerPage,
  itemOffset,
  endOffset,
  rowsPerPageValueChange,
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  errorMessage,
  isEditIconEnable,
  isDeleteIconEnable,
  access,
  defaultItemsPerPage
}) => {
  let searchFieldtext;

  const [searchInputFieldEnable, SetSearchInputFieldEnable] = useState(false);
  const [filterDropDownEnable, SetFilterDropDownEnable] = useState(false);

  const onDeleteConfirmationHandler = (rowInfo: object) => {
    rowInfo &&
      Swal.fire({
        title: 'Are you sure you want to delete this?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#275820',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          isDeleteIconEnable && onDeleteHandler && onDeleteHandler(rowInfo);
        }
      });
  };

  const onSetSearchInputFieldEnable = () => {
    SetSearchInputFieldEnable(!searchInputFieldEnable);
    SetFilterDropDownEnable(false);
  };

  const onSetFilterDropDownEnable = () => {
    SetFilterDropDownEnable(!filterDropDownEnable);
    SetSearchInputFieldEnable(false);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      {(data && data.length > 0) ||
      searchInputFieldEnable ||
      filterDropDownEnable ? (
        <>
          <div className='user-types__table-header responsive'>
            <DynamicDataTableHeader
              tableHeading={tableHeading}
              isSearchIconEnable={isSearchIconEnable}
              isFilterIconEnable={isFilterIconEnable}
              onSearchChangeHandler={onSearchChangeHandler}
              searchFieldtext={searchFieldtext}
              filterValues={filterValues}
              handleCategoryChange={handleCategoryChange}
              searchInputFieldEnable={searchInputFieldEnable}
              filterDropDownEnable={filterDropDownEnable}
              onSetSearchInputFieldEnable={onSetSearchInputFieldEnable}
              onSetFilterDropDownEnable={onSetFilterDropDownEnable}
            />
          </div>
          <Table responsive {...getTableProps()} className='dynamic-table '>
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index2) => (
                    <th key={index2}>{column.render('Header')}</th>
                  ))}
                  <th>Action</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={i}>
                      {row.cells.map((cell, index2) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index2}
                            onClick={() => {
                              const selectedLength = window
                                .getSelection()
                                ?.toString().length;
                              console.log(selectedLength);
                              if (
                                selectedLength === undefined ||
                                selectedLength === 0
                              ) {
                                onViewHandler(row.original);
                              }
                            }}
                          >
                            {/* {cell.render('Cell')} */}
                            {cell.value === 'Active' ? (
                              <>
                                <span className='active-icon' />
                                <span>{cell.render('Cell')}</span>
                              </>
                            ) : cell.value === 'Inactive' ? (
                              <>
                                <span className='inactive-icon' />
                                <span>{cell.render('Cell')}</span>
                              </>
                            ) : (
                              cell.render('Cell')
                            )}
                          </td>
                        );
                      })}
                      <td className='edit-delete-icons'>
                        <>
                          {access === AccessTypes.readOnlyAccess
                            ? isEditIconEnable && (
                                <TbPencil
                                  className='accessdisabled'
                                  //onClick={() => onEditHandler(row.original)}
                                />
                              )
                            : isEditIconEnable && (
                                <TbPencil
                                  onClick={() => onEditHandler(row.original)}
                                />
                              )}
                          {access === AccessTypes.readOnlyAccess
                            ? isDeleteIconEnable && (
                                <RiDeleteBinLine
                                  className='accessdisabled'

                                  //onClick={() => onDeleteConfirmationHandler(row.original)}
                                />
                              )
                            : isDeleteIconEnable && (
                                <RiDeleteBinLine
                                  onClick={() =>
                                    onDeleteConfirmationHandler(row.original)
                                  }
                                />
                              )}
                        </>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className='text-align-left pt'>
                  <strong>No Records Found</strong>
                </div>
              )}
            </tbody>
          </Table>

          <div className='custom-pagination'>
            <div className='rows-per-page'>
              <label className='label'>Rows Per Page :</label>
              <CustomDropDown
                name=''
                dropdownList={rowsPerPage}
                onValueSelect={(e) => rowsPerPageValueChange(e.target.value)}
                defaultValue={defaultItemsPerPage.toString()}
              />
            </div>

            <div className='showing-arrows'>
              {endOffset > tableData.length ? (
                <label className='label'>
                  {' '}
                  Showing {itemOffset}-{tableData.length} of {tableData.length}
                </label>
              ) : (
                <label className='label'>
                  {' '}
                  Showing {itemOffset}-{endOffset} of {tableData.length}
                </label>
              )}

              <div className='buttons'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <CgPushChevronLeft />
                </button>{' '}
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <CgChevronLeft />
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  <CgChevronRight />
                </button>{' '}
                <button
                  onClick={() =>
                    gotoPage(Math.ceil(tableData.length / data.length) - 1)
                  }
                  disabled={!canNextPage}
                >
                  <CgPushChevronRight />
                </button>{' '}
              </div>
            </div>
          </div>
        </>
      ) : data && data.length === 0 && errorMessage === '' ? (
        <Loader />
      ) : (
        errorMessage !== '' && (
          <div className='text-align-center norecord'>{errorMessage}</div>
        )
      )}
    </>
  );
};
