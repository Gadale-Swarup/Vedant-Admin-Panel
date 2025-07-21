import React from "react";
import { useTranslation } from "react-i18next";
import "./Pagination.css";

const Pagination = ({ pagination, onPageChange }) => {
  const { t } = useTranslation();
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination-controls">
      <button 
        onClick={() => handlePageChange(1)} 
        disabled={pagination.page === 1}
        className="pagination-button"
      >
        {t("First")}
      </button>
      <button 
        onClick={() => handlePageChange(pagination.page - 1)} 
        disabled={pagination.page === 1}
        className="pagination-button"
      >
        {t("Previous")}
      </button>
      
      <div className="pagination-info">
        {t("Page")} {pagination.page} {t("of")} {pagination.pages}
      </div>
      
      <button 
        onClick={() => handlePageChange(pagination.page + 1)} 
        disabled={pagination.page === pagination.pages}
        className="pagination-button"
      >
        {t("Next")}
      </button>
      <button 
        onClick={() => handlePageChange(pagination.pages)} 
        disabled={pagination.page === pagination.pages}
        className="pagination-button"
      >
        {t("Last")}
      </button>
    </div>
  );
};

export default Pagination;
