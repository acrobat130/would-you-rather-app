import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from '../utils/lodash';

const formatRowData = (columns, rowData) => {
  return columns.map((column) => {
    const { id } = column;
    const value = rowData[id];

    return {
      id,
      value
    };
  });
};

export default class Table extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })
    ).isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        rowData: PropTypes.object.isRequired
      })
    ).isRequired
  };

  renderRow = (rowData, isHeader) => {
    return _.map(rowData, (cell) => {
      const { id, value } = cell;
      const key = `${id}-${value}`;

      if (isHeader) {
        return <th key={key}>{value}</th>;
      }

      return <td key={key}>{value}</td>;
    });
  };

  renderRows = () => {
    const { columns, data } = this.props;

    return data.map((row) => {
      const { key, rowData } = row;
      const formattedRowData = formatRowData(columns, rowData);

      return <tr key={key}>{this.renderRow(formattedRowData)}</tr>;
    });
  };

  render() {
    const { columns } = this.props;
    const headerRow = this.renderRow(columns, true);
    const rows = this.renderRows();

    return (
      <table>
        <thead>
          <tr>{headerRow}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
