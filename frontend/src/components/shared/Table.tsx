import styles from "@styles/components/shared/Table.module.css";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
}

export default function Table<T>({
    data,
    columns,
    isLoading = false,
    emptyMessage = "No se encontraron datos",
    onRowClick
}: TableProps<T>) {
    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className={col.className}>
                                    <div className={styles.headerContent}>
                                        {col.header}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className={styles.loadingCell}>
                                    Cargando...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className={styles.emptyState}>
                                        {emptyMessage}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick && onRowClick(item)}
                                    className={onRowClick ? styles.clickableRow : ""}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className={col.className}>
                                            <div className={styles.cellContent}>
                                                {col.render ? col.render(item) : (col.accessor ? String(item[col.accessor]) : "")}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
