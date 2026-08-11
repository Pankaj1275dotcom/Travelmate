export const ROLES = {
    ADMIN: "ADMIN",
    TOURIST: "TOURIST",
    HOTEL_OWNER: "HOTEL_OWNER",
    GUIDE: "GUIDE",
    DRIVER: "DRIVER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];