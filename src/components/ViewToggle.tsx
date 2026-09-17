import type { ViewMode } from "../types";

type ViewToggleProps = {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
};

const ViewToggle = ({ view, onChange }: ViewToggleProps) => {
  return (
    <div className="view-toggle" role="group" aria-label="Change view">
      <button
        type="button"
        className={view === "board" ? "is-active" : ""}
        aria-pressed={view === "board"}
        onClick={() => onChange("board")}
      >
        Board
      </button>
      <button
        type="button"
        className={view === "list" ? "is-active" : ""}
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
      >
        List
      </button>
    </div>
  );
};

export default ViewToggle;
