import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  isLoading?: boolean;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = 'No data available',
  isLoading = false,
  className = '',
  onRowClick
}: DataTableProps<T>) {
  // Function to extract cell value based on accessor
  const getCellValue = (item: T, accessor: Column<T>['accessor']) => {
    if (typeof accessor === 'function') {
      return accessor(item);
    } else {
      return item[accessor];
    }
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
        <div className="animate-pulse p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
        <div className="p-6 text-center text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr 
              key={keyExtractor(item)} 
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ''}`}
                >
                  {getCellValue(item, column.accessor)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}