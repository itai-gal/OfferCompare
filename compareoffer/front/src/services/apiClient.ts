// Automatically sends JSON, parses JSON, and throws errors.

export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const baseUrl = "http://localhost:5000";

    const config: RequestInit = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    };

    const response = await fetch(baseUrl + url, config);

    // Parse JSON always
    const data = await response.json().catch(() => null);

    // Handle non-OK responses
    if (!response.ok) {
        const message = data?.message || "Request failed";
        const details = data?.details || null;

        const error = {
            message,
            details,
            status: response.status,
        };

        throw error;
    }

    return data as T;
}
