export default function Table({
  tableHeaders,
  medianRows,
  meanRows,
  modeRows,
  tableTitle,
}: {
  tableTitle: string;
  tableHeaders: string[];
  medianRows: (string | number)[];
  meanRows: (string | number)[];
  modeRows: (string | number)[];
}) {
  return (
    <>
      <div className="table-title">{tableTitle}</div>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {meanRows.map((mean) => (
              <td key={mean}>{mean}</td>
            ))}
          </tr>
          <tr>
            {medianRows.map((median) => (
              <td key={median}>{median}</td>
            ))}
          </tr>
          <tr>
            {modeRows.map((mode) => (
              <td key={mode}>{mode}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
