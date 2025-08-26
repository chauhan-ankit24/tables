import { observer } from "mobx-react";
import { tableStore } from "../../stores/TableStore";
import "./Pagination.css";

const rowsPerPageOptions = [10, 20, 50, 100];

const Pagination = observer(() => {
  const { page, totalPages, pageSize, setPage } = tableStore;

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    tableStore.pageSize = Number(e.target.value);
    tableStore.page = 1;
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      setPage(val);
    }
  };

  return (
    <div className="pagination-controls">
      <span>Rows per page:&nbsp;</span>
      <select value={pageSize} onChange={handleRowsPerPageChange}>
        {rowsPerPageOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <button onClick={() => setPage(1)} disabled={page === 1}>
        &laquo;
      </button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lsaquo;
      </button>
      <span>&nbsp;Page&nbsp;</span>
      <input
        type="number"
        min={1}
        max={totalPages}
        value={page}
        onChange={handlePageInputChange}
        style={{
          width: 48,
          textAlign: "center",
          borderRadius: 6,
          border: "1px solid #ccc",
          margin: "0 4px",
        }}
      />
      <span>&nbsp;of {totalPages}&nbsp;</span>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        &rsaquo;
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
});

export default Pagination;
