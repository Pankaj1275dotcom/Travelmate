import approvalRepository from "./approval.repository.js";

class ApprovalService {
    async getPendingHotels() {
        return approvalRepository.getPendingHotels();
    }

    async getApprovedHotels() {
        return approvalRepository.getApprovedHotels();
    }

    async getPendingGuides() {
        return approvalRepository.getPendingGuides();
    }

    async getApprovedGuides() {
        return approvalRepository.getApprovedGuides();
    }

    async getPendingDrivers() {
        return approvalRepository.getPendingDrivers();
    }

    async getApprovedDrivers() {
        return approvalRepository.getApprovedDrivers();
    }

    async approveHotel(hotelId: string) {
        await approvalRepository.approveHotel(hotelId);

        return {
            message: "Hotel approved successfully",
        };
    }

    async rejectHotel(hotelId: string) {
        await approvalRepository.rejectHotel(hotelId);

        return {
            message: "Hotel rejected successfully",
        };
    }

    async approveGuide(userId: string) {
        await approvalRepository.approveGuide(userId);

        return {
            message: "Guide approved successfully",
        };
    }

    async rejectGuide(userId: string) {
        await approvalRepository.rejectGuide(userId);

        return {
            message: "Guide rejected successfully",
        };
    }

    async approveDriver(userId: string) {
        await approvalRepository.approveDriver(userId);

        return {
            message: "Driver approved successfully",
        };
    }

    async rejectDriver(userId: string) {
        await approvalRepository.rejectDriver(userId);

        return {
            message: "Driver rejected successfully",
        };
    }
}

export default new ApprovalService();