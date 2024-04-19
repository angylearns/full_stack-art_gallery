import React from 'react';

const TransposedTable = ({ artists, editableRows, handleInputChange, handleSave, handleEdit, handleDelete }) => {
  // Transponer los datos
  const transposedData = artists.reduce((acc, curr) => {
    Object.keys(curr).forEach(key => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr[key]);
    });
    return acc;
  }, {});

  return (
    <table>
      <tbody>
        {/* Renderizar la cabecera vertical */}
        {Object.keys(transposedData).map((key, index) => (
          <tr key={index}>
            <th>{key}</th>
            {/* Renderizar los datos */}
            {transposedData[key].map((value, rowIndex) => (
              <td key={rowIndex}>
                {/* Renderizar los inputs de edición si corresponde */}
                {editableRows.includes(rowIndex) ? (
                  <input
                    type="text"
                    defaultValue={value}
                    onChange={e => handleInputChange(e.target.value, rowIndex, key)}
                  />
                ) : (
                  value
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransposedTable;

