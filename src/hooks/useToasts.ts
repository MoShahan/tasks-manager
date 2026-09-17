import { useEffect, useRef, useState } from "react";

export type Toast = {
  id: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
};

type ToastInput = Omit<Toast, "id">;

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const dismiss = (id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    window.clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
  };

  const push = (toast: ToastInput) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }]);
    timersRef.current[id] = window.setTimeout(
      () => dismiss(id),
      toast.duration ?? 4000,
    );
    return id;
  };

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      Object.values(timers).forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return { toasts, push, dismiss };
}
