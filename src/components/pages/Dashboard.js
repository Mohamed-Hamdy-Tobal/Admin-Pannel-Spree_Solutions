import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/reducers/productsReducer';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import Loading from '../Loading'
import Error from '../Error'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [filteredCount, setFilteredCount] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ value }) => `$${value.toFixed(2)}`, // Example of formatting the price
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
    ],
    []
  );

  // Safely handle the data
  const data = useMemo(() => items.products || [], [items.products]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    setPageSize,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 }, // Default page size
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Update the filtered count whenever the data or global filter changes
  useEffect(() => {
    setFilteredCount(page.length);
  }, [page, globalFilter]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <Error error={error} />;
  }

  // Get the props from getTableBodyProps
  const tableBodyProps = getTableBodyProps();

  // Separate the key from the other props for the table body
  const { key: tableBodyKey, ...otherTableBodyProps } = tableBodyProps;

  // Get the props from getTableProps
  const tableProps = getTableProps();

  // Separate the key from the other props for the table
  const { key: tableKey, ...otherTableProps } = tableProps;

  // Render the dashboard content only when products data is available
  return (
    <div className="dashboard">
      <h1 className="text-2xl font-medium mb-4 text-bgBlack">Requests</h1>
      <div className="flex items-center justify-between mb-4 flex-col md:flex-row  gap-3 ">
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search products"
          className="px-3 py-2 border rounded-md w-full md:w-1/3 focus:border-none focus:outline-none"
        />
        <div className='flex justify-between md:justify-start items-center gap-3 w-full md:w-auto'>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-none  w-[50%] md:w-auto"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <div className='flex justify-start items-center gap-3 text-textDarkBlue'>
            Total :
            <span className="text-sm text-bgBlue font-semibold">
              Filter :  {filteredCount}
            </span>
          </div>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table key={tableKey} {...otherTableProps} className="min-w-full bg-white rounded-md overflow-hidden">

          <thead className="bg-[#fbfbfbe0]">
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-[14px] px-4 text-left text-sm font-semibold text-gray-700"
                  >
                    {column.render('Header')}
                    <span className="ml-1">
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {filteredCount > 1 ? (
            <tbody key={tableBodyKey} {...otherTableBodyProps}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()} className="border-b border-gray-200 hover:bg-[#52FF0014]">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="py-3 px-4 text-sm text-gray-800">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })
              }
            </tbody>
          ) : ""}

        </table>
        {filteredCount > 1 ? "" : <div className='min-h-[100px] bg-white flex justify-center items-center gap-5 flex-col w-full'>
          <img src='imgs/no-data.png' alt='empty' className='lg:max-w-[500px]' />
          <h3 className="text-textGray text-[22px] font-medium mb-5">No Data</h3>
        </div>}
      </div>

      <div className="mt-5 flex items-start sm:items-center sm:justify-between flex-col sm:flex-row gap-3">
        <div className="text-sm text-gray-700">
          Showing page {pageIndex + 1} of {pageOptions.length}
        </div>
        <div className="flex">
          <button
            onClick={() => gotoPage(0)}
            className={`px-3 py-2 rounded-md ${!canPreviousPage ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            className={`px-3 py-2 ml-2 rounded-md ${!canPreviousPage ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            disabled={!canPreviousPage}
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            className={`px-3 py-2 ml-2 rounded-md ${!canNextPage ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            disabled={!canNextPage}
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            className={`px-3 py-2 ml-2 rounded-md ${!canNextPage ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
