import {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
    id: number;
    type: ToastType;
    message: string;
};

type ToastContextValue = {
    showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Date.now() + Math.floor(Math.random() * 1000);

        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto remove after 3.5s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* The container is rendered here so it sits above everything */}
            <div className="toast-root">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast toast--${toast.type}`}
                    >
                        <span>{toast.message}</span>
                        <button
                            type="button"
                            onClick={() =>
                                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                            }
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextValue => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used inside ToastProvider");
    }
    return ctx;
};
