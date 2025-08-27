import { observer } from "mobx-react";
import { tableStore } from "../../stores/TableStore";
import "./Pagination.css";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

import {
  ROWS_PER_PAGE_OPTIONS,
  ROWS_PER_PAGE_LABEL,
  PAGE_LABEL,
  OF_LABEL,
} from "../../constants/pagination";

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
      <span className="pagination-typo">{ROWS_PER_PAGE_LABEL}&nbsp;</span>
      <select value={pageSize} onChange={handleRowsPerPageChange}>
        {ROWS_PER_PAGE_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span className="pagination-btn-group">
        <button onClick={() => setPage(1)} disabled={page === 1}>
          <ChevronDoubleLeftIcon style={{ width: 16, height: 16 }} />
        </button>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <ChevronLeftIcon style={{ width: 16, height: 16 }} />
        </button>
      </span>
      <span className="pagination-typo">&nbsp;{PAGE_LABEL}&nbsp;</span>
      <input
        className="pagination-input"
        type="number"
        min={1}
        max={totalPages}
        value={page}
        onChange={handlePageInputChange}
      />
      <span className="pagination-typo">
        &nbsp;{OF_LABEL} {totalPages}&nbsp;
      </span>
      <span className="pagination-btn-group">
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRightIcon style={{ width: 16, height: 16 }} />
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          <ChevronDoubleRightIcon style={{ width: 16, height: 16 }} />
        </button>
      </span>
    </div>
  );
});

export default Pagination;
