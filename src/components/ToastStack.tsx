import type { Toast } from "../hooks/useToasts";

type ToastStackProps = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

const ToastStack = ({ toasts, onDismiss }: ToastStackProps) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-stack" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" role="status">
          <p>{toast.message}</p>
          <div className="toast-actions">
            {toast.actionLabel && toast.onAction ? (
              <button
                type="button"
                className="btn btn-subtle"
                onClick={() => {
                  toast.onAction?.();
                  onDismiss(toast.id);
                }}
              >
                {toast.actionLabel}
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-ghost icon-btn"
              aria-label="Dismiss notification"
              onClick={() => onDismiss(toast.id)}
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
