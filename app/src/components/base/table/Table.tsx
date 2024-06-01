import React from "react";
import { FormattedMessage } from "react-intl";
import { Table } from "flowbite-react";

export interface IColumn {
  label: React.ReactNode;
  key: string;
  id?: string;
  className?: string;
}

export interface ITableData {
  [key: string]: React.ReactNode;
}

export interface IProps {
  noDataText?: React.ReactNode;
  headerColumns: IColumn[];
  data: ITableData[];
  isLoading?: boolean;
  className?: string;
}

const TableComponent = ({
  headerColumns,
  data,
  isLoading = false,
  noDataText = <FormattedMessage id="common.label.noData" />,
  className = "",
}: IProps) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <Table>
        <Table.Head>
          {headerColumns.map((column) => (
            <Table.HeadCell key={column.key} className={column.className}>
              {column.label}
            </Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body className="divide-y">
          {isLoading ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell
                colSpan={headerColumns.length}
                className="text-center"
              >
                <FormattedMessage id="common.label.fetching" />
              </Table.Cell>
            </Table.Row>
          ) : data.length === 0 ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell
                colSpan={headerColumns.length}
                className="text-center"
              >
                {noDataText}
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((row, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {headerColumns.map((column) => (
                  <Table.Cell key={column.key} className={column.className}>
                    {row[column.key]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
export default TableComponent;