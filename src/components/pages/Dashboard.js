import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/reducers/productsReducer';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

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

  if (status === 'loading') {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  // Render the dashboard content only when products data is available
  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex items-center justify-between mb-4">
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search products"
          className="px-3 py-2 border rounded-md w-1/3"
        />
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-3 py-2 border rounded-md"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className='overflow-x-auto'>
        <table {...getTableProps()} className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-2 px-4 text-left text-sm font-semibold text-gray-700"
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
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b border-gray-200 hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-3 px-4 text-sm text-gray-800">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
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
