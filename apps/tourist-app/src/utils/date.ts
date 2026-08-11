export function formatDate(
    value: string
) {
    return new Date(value).toLocaleDateString(
        "en-IN",
        {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
}
export function formatTime(
    value: string
) {
    return new Date(value).toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }
    );
}