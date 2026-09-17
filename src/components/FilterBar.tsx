import type { Priority, Status } from "../constants";
import type { SortDirection, TaskFilters } from "../types";

import SelectField from "./SelectField";

type FilterBarProps = {
  filters: TaskFilters;
  sortDirection: SortDirection;
  hasActiveFilters: boolean;
  showDueDateSort?: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: Status | "all") => void;
  onPriorityChange: (value: Priority | "all") => void;
  onSortChange: (value: SortDirection) => void;
  onClear: () => void;
};

const FilterBar = ({
  filters,
  sortDirection,
  hasActiveFilters,
  showDueDateSort = true,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onClear,
}: FilterBarProps) => {
  return (
    <section
      className={`filter-bar${showDueDateSort ? "" : " filter-bar-list"}`}
      aria-label="Task filters"
    >
      <label className="field search-field">
        <span className="field-label">Search</span>
        <input
          type="search"
          placeholder="Search by title"
          value={filters.search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <SelectField
        label="Status"
        value={filters.status}
        onChange={(value) => onStatusChange(value as Status | "all")}
        options={[
          { value: "all", label: "All statuses" },
          { value: "pending", label: "Pending" },
          { value: "in-progress", label: "In Progress" },
          { value: "completed", label: "Completed" },
        ]}
      />

      <SelectField
        label="Priority"
        value={filters.priority}
        onChange={(value) => onPriorityChange(value as Priority | "all")}
        options={[
          { value: "all", label: "All priorities" },
          { value: "high", label: "High" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" },
        ]}
      />

      {showDueDateSort ? (
        <SelectField
          label="Sort by due date"
          value={sortDirection}
          onChange={(value) => onSortChange(value as SortDirection)}
          options={[
            { value: "asc", label: "Earliest first" },
            { value: "desc", label: "Latest first" },
          ]}
        />
      ) : null}

      <button
        type="button"
        className="btn btn-ghost filter-clear"
        onClick={onClear}
        disabled={!hasActiveFilters}
      >
        Clear filters
      </button>
    </section>
  );
};

export default FilterBar;
