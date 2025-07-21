import React from "react";
import { Table } from "react-bootstrap";
import "./Table.scss";

const CustomTable = ({
  headers = [],
  data = [],
  className = "",
  striped = true,
  hover = true,
  bordered = false,
  responsive = true,
  size = "md",
}) => {
  return (
    <div className={`custom-table-wrapper ${className}`}>
      {responsive ? (
        <div className="table-responsive">
          <Table
            striped={striped}
            hover={hover}
            bordered={bordered}
            size={size}
            className="custom-table"
          >
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="table-header">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="table-row">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="table-cell">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Table
          striped={striped}
          hover={hover}
          bordered={bordered}
          size={size}
          className="custom-table"
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="table-cell">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CustomTable;
