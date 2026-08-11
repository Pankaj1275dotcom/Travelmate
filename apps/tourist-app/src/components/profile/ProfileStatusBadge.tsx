interface ProfileStatusBadgeProps {
    status:
        | "PENDING"
        | "APPROVED"
        | "REJECTED"
        | "SUSPENDED";
}

function ProfileStatusBadge({
    status,
}: ProfileStatusBadgeProps) {
    const styles = {
        APPROVED:
            "bg-green-100 text-green-700 border-green-200",
        PENDING:
            "bg-yellow-100 text-yellow-700 border-yellow-200",
        REJECTED:
            "bg-red-100 text-red-700 border-red-200",
        SUSPENDED:
            "bg-slate-200 text-slate-700 border-slate-300",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold ${styles[status]}`}
        >
            {status.charAt(0) +
                status.slice(1).toLowerCase()}
        </span>
    );
}

export default ProfileStatusBadge;