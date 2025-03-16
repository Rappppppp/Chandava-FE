import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
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
};

const Table = <T,>({ columns, data, itemsPerPage = 10, tableTitle }: TableProps<T>) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Handle sorting
    const handleSort = (column: keyof T) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
            if (sortDirection === "desc") setSortColumn(null);
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    // Filter and sort data
    const filteredData = data.filter((row) =>
        columns.some((col) => String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortColumn && sortDirection) {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (sortDirection === "asc") return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full p-4 bg-white rounded-2xl shadow-md">
            <div>
                <Title title={tableTitle} />
            </div>
            {/* Search Input */}
            <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((column) => (
                                <th key={String(column.key)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button className="flex items-center space-x-1 focus:outline-none" onClick={() => handleSort(column.key)}>
                                        <span>{column.label}</span>
                                        {sortColumn === column.key && (
                                            <span>{sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span>
                                        )}
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 mt-4">
                    <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
                        <span className="font-medium">{filteredData.length}</span> results
                    </p>
                    <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Table;
