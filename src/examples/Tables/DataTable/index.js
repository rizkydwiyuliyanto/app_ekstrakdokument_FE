/* eslint-disable react/prop-types */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 React example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import {
  Button,
  FormControl,
  IconButton,
  Stack,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { remove } from "request/request";
const InputFilter = ({ ...rest }) => {
  return (
    <FormControl>
      <TextField {...rest} />
    </FormControl>
  );
};

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  ReloadData,
  noEndBorder,
  DeleteLink,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const [selected, setSelected] = useState([]);
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }
  const [formFilter, setFormFilter] = useState({});
  const handleClick = () => {
    ReloadData(formFilter);
  };
  const handleChange = (e) => {
    setFormFilter({
      ...formFilter,
      [e.target.name]: e.target.value,
    });
  };
  const notColumnFilter = ["action"];
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = page.map((n, idx) => idx);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleSelected = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const rowCount = page.length;
  useEffect(() => {
    let obj = {};
    columns
      .filter((y) => {
        return !notColumnFilter.includes(y?.Header);
      })
      .forEach((prop, idx) => {
        obj = {
          ...obj,
          [prop?.Header]: "",
        };
      });
    setFormFilter(obj);
  }, []);
  const handleDelete = () => {
    let idx = 0;
    let id = table?.ids[selected[idx]];
    let link = `${DeleteLink}/${id}`;
    const deleteData = (link) => {
      remove({ link: link })
        .then((res) => {
          idx += 1;
          if (idx <= selected.length) {
            id = table?.ids[selected[idx]];
            let link = `${DeleteLink}/${id}`;
            setTimeout(() => {
              deleteData(link);
            }, 250);
          } else {
            ReloadData(formFilter);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    deleteData(link);
  };
  useEffect(() => {
    // if (selected.length > 0) {
    //   const filtered = selected.f
    // }
    setSelected([]);
  }, [page]);
  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
              <MDInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component="thead">
          <TableRow>
            <TableCell>
              {selected.length > 0 && (
                <>
                  <Stack justifyContent={"body"} alignItems={"center"}>
                    <Typography color="inherit" variant="caption">
                      ({selected.length})
                    </Typography>
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon fontSize={"7"} />
                    </IconButton>
                  </Stack>
                </>
              )}
            </TableCell>
            {columns
              .filter((y) => {
                return !notColumnFilter.includes(y?.Header);
              })
              .map((x, idx) => {
                return (
                  <DataTableBodyCell key={idx} align={x.align ? x.align : "left"}>
                    <InputFilter
                      onBlur={handleChange}
                      placeholder={`Search ${x?.Header.split("_").join(" ")}`}
                      size={"small"}
                      name={x?.name}
                    />
                  </DataTableBodyCell>
                );
              })}
            <DataTableBodyCell>
              <Button
                onClick={() => {
                  handleClick();
                }}
                size={"small"}
              >
                Filter
              </Button>
            </DataTableBodyCell>
          </TableRow>
        </MDBox>
        <MDBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              <TableCell width={"5%"}>
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < rowCount}
                  checked={rowCount > 0 && selected.length === rowCount}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              {headerGroup.headers.map((column, idx) => (
                <DataTableHeadCell
                  key={idx}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header").split("_").join(" ")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            const isItemSelected = selected.includes(key);
            return (
              <TableRow
                hover
                onClick={(event) => handleSelected(event, key)}
                selected={isItemSelected}
                sx={{ cursor: "pointer" }}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={key}
                {...row.getRowProps()}
              >
                <DataTableBodyCell>
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </DataTableBodyCell>
                {row.cells.length > 0 ? (
                  <>
                    {row.cells.map((cell, idx) => {
                      return (
                        <DataTableBodyCell
                          key={idx}
                          noBorder={noEndBorder && rows.length - 1 === key}
                          align={cell.column.align ? cell.column.align : "left"}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </DataTableBodyCell>
                      );
                    })}
                  </>
                ) : (
                  <DataTableBodyCell>Data masih Kosong</DataTableBodyCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {/* {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )} */}
            <MDBox width="5rem" mx={1}>
              <MDInput
                inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                value={customizedPageOptions[pageIndex]}
                onChange={(handleInputPagination, handleInputPaginationValue)}
              />
            </MDBox>
            {/* {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )} */}
            {/* {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )} */}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  ReloadData: PropTypes.func,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
