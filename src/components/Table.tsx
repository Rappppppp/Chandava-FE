import Title from "@components/Title";

export type Column<T> = {
    label: string;
    key: keyof T;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
  tableTitle: string;
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;

  // Optional pagination
  currentPage?: number;
  perPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
};


const Table = <T,>({
    columns,
    data,
    tableTitle,
    currentPage,
    perPage,
    totalItems,
    onPageChange,
    loading = false,
}: TableProps<T>) => {
    const totalPages = Math.ceil(totalItems / perPage);

    const handleFirst = () => onPageChange?.(1);
    const handleLast = () => onPageChange?.(totalPages);

    const handlePrev = () => onPageChange?.(Math.max(1, currentPage - 1));
    const handleNext = () => onPageChange?.(Math.min(totalPages, currentPage + 1));

    return (
        <div className="w-full p-4 bg-white rounded-2xl shadow-md">
            <Title title={tableTitle} />

            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((col) => (
                                        <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap">
                                            {col.render ? col.render(row[col.key], row) : <span className="text-sm text-gray-700">{String(row[col.key])}</span>}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && onPageChange && (
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 mt-4">
                    <div className="flex gap-2">
                        <button
                            onClick={handleFirst}
                            disabled={currentPage === 1 || loading}
                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                            First
                        </button>
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1 || loading}
                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                    </div>

                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(currentPage * perPage, totalItems)}</span> of{" "}
                        <span className="font-medium">{totalItems}</span> results
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages || loading}
                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                        <button
                            onClick={handleLast}
                            disabled={currentPage === totalPages || loading}
                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
