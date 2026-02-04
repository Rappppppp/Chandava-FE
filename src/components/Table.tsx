'use client';

import React from "react"
import Title from "@components/Title";
import AddUserDialog from "@features/landingpage/components/AddUserDialog";

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
    currentPage?: number;
    perPage?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
    loading?: boolean;
    showAddUserButton?: boolean;
    onUserAdded?: (user: any) => void;
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
    onUserAdded,
}: TableProps<T>) => {
    const totalPages = Math.ceil(totalItems / (perPage || 1));

    return (
        /* Outer Card - ensures the component doesn't exceed screen width */
        <div className="w-full max-w-full p-4 bg-white rounded-2xl shadow-md">
            <div className="flex flex-col w-fit mb-4">
                <Title title={tableTitle} />
                {tableTitle.includes("All Users") && <AddUserDialog onUserAdded={onUserAdded} />}
            </div>

            {/* THE SCROLL BOX: Added 'inline-block' and 'min-w-full' to ensure it triggers scroll */}
            <div className="overflow-x-auto block w-full border border-gray-100 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '800px', tableLayout: 'auto' }}>
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
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
                                        <td
                                            key={String(col.key)}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                        >
                                            {col.render ? col.render(row[col.key], row) : String(row[col.key])}
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

            {/* Pagination */}
            {totalPages > 1 && onPageChange && (
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-4 py-3 mt-4 gap-4">
                    <div className="flex gap-2">
                        <button onClick={() => onPageChange(1)} disabled={currentPage === 1 || loading} className="px-3 py-2 text-xs border rounded-md disabled:opacity-50">First</button>
                        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1 || loading} className="px-3 py-2 text-xs border rounded-md disabled:opacity-50">Prev</button>
                    </div>
                    <p className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages || loading} className="px-3 py-2 text-xs border rounded-md disabled:opacity-50">Next</button>
                        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages || loading} className="px-3 py-2 text-xs border rounded-md disabled:opacity-50">Last</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;