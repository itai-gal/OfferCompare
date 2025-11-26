const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

type ApiErrorShape = {
    message?: string;
    error?: string;
};

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const { method, headers, body } = options;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...(headers ?? {}),
        },
        body,
    });

    const text = await response.text();
    let data: unknown = null;

    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }
    }

    if (!response.ok) {
        const payload = data as ApiErrorShape | string | null;
        const message =
            typeof payload === "string"
                ? payload
                : payload?.message ||
                payload?.error ||
                `Request failed with ${response.status}`;

        throw new Error(message);
    }

    return data as T;
}
