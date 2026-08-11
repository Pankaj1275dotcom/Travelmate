import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";
import DetailsModal from "../../components/common/DetailsModal";

import usePendingDrivers from "../../hooks/usePendingDrivers";
import useApprovedDrivers from "../../hooks/useApprovedDrivers";

import type {
    PendingDriver,
} from "../../types/approval.types";

type DriverTab =
    | "pending"
    | "approved";

function DriversPage() {
    const [activeTab, setActiveTab] =
        useState<DriverTab>(
            "pending"
        );

    const {
        drivers: pendingDrivers,
        isLoading: pendingLoading,
        isError: pendingError,
        approveDriver,
        rejectDriver,
    } = usePendingDrivers();

    const {
        drivers: approvedDrivers,
        isLoading: approvedLoading,
        isError: approvedError,
    } = useApprovedDrivers();

    const [
        selectedDriver,
        setSelectedDriver,
    ] = useState<PendingDriver | null>(
        null
    );

    const drivers =
        activeTab === "pending"
            ? pendingDrivers
            : approvedDrivers;

    const isLoading =
        activeTab === "pending"
            ? pendingLoading
            : approvedLoading;

    const isError =
        activeTab === "pending"
            ? pendingError
            : approvedError;

    if (isLoading) {
        return (
            <PageHeader
                title="Driver Approvals"
                description="Loading drivers..."
            />
        );
    }

    if (isError) {
        return (
            <PageHeader
                title="Driver Approvals"
                description="Failed to load drivers."
            />
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Driver Approvals"
                description="Review driver registration requests."
            />

            <SectionCard title="Drivers">
                <div className="mb-6 flex gap-3 border-b">
                    <button
                        onClick={() =>
                            setActiveTab(
                                "pending"
                            )
                        }
                        className={`border-b-2 px-5 py-3 font-semibold transition ${
                            activeTab ===
                            "pending"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        Pending Requests (
                        {
                            pendingDrivers.length
                        }
                        )
                    </button>

                    <button
                        onClick={() =>
                            setActiveTab(
                                "approved"
                            )
                        }
                        className={`border-b-2 px-5 py-3 font-semibold transition ${
                            activeTab ===
                            "approved"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        Approved (
                        {
                            approvedDrivers.length
                        }
                        )
                    </button>
                </div>                {drivers.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                        {activeTab === "pending"
                            ? "No pending driver requests."
                            : "No approved drivers found."}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b bg-slate-50 text-left">
                                    <th className="px-4 py-3">
                                        Driver
                                    </th>

                                    <th className="px-4 py-3">
                                        City
                                    </th>

                                    <th className="px-4 py-3">
                                        Vehicle
                                    </th>

                                    <th className="px-4 py-3">
                                        Phone
                                    </th>

                                    <th className="px-4 py-3">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {drivers.map(
                                    (driver) => (
                                        <tr
                                            key={
                                                driver.id
                                            }
                                            className="border-b hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-4 font-medium">
                                                {
                                                    driver.fullName
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    driver.city
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    driver.vehicleBrand
                                                }{" "}
                                                {
                                                    driver.vehicleModel
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    driver.phone
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                {activeTab ===
                                                "pending" ? (
                                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                                                        Pending
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                                        Approved
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 py-4 text-center">
                                                <button
                                                    onClick={() =>
                                                        setSelectedDriver(
                                                            driver
                                                        )
                                                    }
                                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </SectionCard>            <DetailsModal
                open={!!selectedDriver}
                onClose={() =>
                    setSelectedDriver(
                        null
                    )
                }
                title="Driver Details"
            >
                {selectedDriver && (
                    <div className="space-y-8">
                        {activeTab ===
                            "approved" && (
                            <div>
                                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                                    Approved
                                </span>
                            </div>
                        )}

                        <div>
                            <h3 className="mb-3 text-lg font-semibold">
                                Driver Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <p>
                                    <strong>
                                        Name:
                                    </strong>{" "}
                                    {
                                        selectedDriver.fullName
                                    }
                                </p>

                                <p>
                                    <strong>
                                        City:
                                    </strong>{" "}
                                    {
                                        selectedDriver.city
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {
                                        selectedDriver.phone
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Experience:
                                    </strong>{" "}
                                    {
                                        selectedDriver.experience
                                    }{" "}
                                    Years
                                </p>

                                <p>
                                    <strong>
                                        Price / Hour:
                                    </strong>{" "}
                                    ₹
                                    {
                                        selectedDriver.pricePerHour
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Price / Day:
                                    </strong>{" "}
                                    ₹
                                    {
                                        selectedDriver.pricePerDay
                                    }
                                </p>

                                <p className="col-span-2">
                                    <strong>
                                        Bio:
                                    </strong>{" "}
                                    {selectedDriver.bio ??
                                        "N/A"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-lg font-semibold">
                                Vehicle Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <p>
                                    <strong>
                                        Vehicle Type:
                                    </strong>{" "}
                                    {
                                        selectedDriver.vehicleType
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Brand:
                                    </strong>{" "}
                                    {
                                        selectedDriver.vehicleBrand
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Model:
                                    </strong>{" "}
                                    {
                                        selectedDriver.vehicleModel
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Number:
                                    </strong>{" "}
                                    {
                                        selectedDriver.vehicleNumber
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Color:
                                    </strong>{" "}
                                    {selectedDriver.vehicleColor ??
                                        "N/A"}
                                </p>

                                <p>
                                    <strong>
                                        Seats:
                                    </strong>{" "}
                                    {
                                        selectedDriver.seatCapacity
                                    }
                                </p>

                                <p>
                                    <strong>
                                        AC:
                                    </strong>{" "}
                                    {selectedDriver.airConditioned
                                        ? "Yes"
                                        : "No"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-lg font-semibold">
                                User Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <p>
                                    <strong>
                                        Name:
                                    </strong>{" "}
                                    {
                                        selectedDriver
                                            .user
                                            .firstName
                                    }{" "}
                                    {
                                        selectedDriver
                                            .user
                                            .lastName
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Email:
                                    </strong>{" "}
                                    {
                                        selectedDriver
                                            .user
                                            .email
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {
                                        selectedDriver
                                            .user
                                            .phone
                                    }
                                </p>
                            </div>
                        </div>

                        {activeTab ===
                            "pending" && (
                            <div className="flex justify-end gap-4 border-t pt-6">
                                <button
                                    onClick={() =>
                                        rejectDriver.mutate(
                                            selectedDriver.userId
                                        )
                                    }
                                    className="rounded-lg bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() =>
                                        approveDriver.mutate(
                                            selectedDriver.userId
                                        )
                                    }
                                    className="rounded-lg bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
                                >
                                    Approve
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </DetailsModal>        </div>
    );
}

export default DriversPage;