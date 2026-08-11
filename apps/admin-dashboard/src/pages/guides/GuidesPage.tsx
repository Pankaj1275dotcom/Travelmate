import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";
import DetailsModal from "../../components/common/DetailsModal";

import usePendingGuides from "../../hooks/usePendingGuides";
import useApprovedGuides from "../../hooks/useApprovedGuides";

import type {
    PendingGuide,
} from "../../types/approval.types";

type GuideTab =
    | "pending"
    | "approved";

function GuidesPage() {
    const [activeTab, setActiveTab] =
        useState<GuideTab>(
            "pending"
        );

    const {
        guides: pendingGuides,
        isLoading: pendingLoading,
        isError: pendingError,
        approveGuide,
        rejectGuide,
    } = usePendingGuides();

    const {
        guides: approvedGuides,
        isLoading: approvedLoading,
        isError: approvedError,
    } = useApprovedGuides();

    const [
        selectedGuide,
        setSelectedGuide,
    ] = useState<PendingGuide | null>(
        null
    );

    const guides =
        activeTab === "pending"
            ? pendingGuides
            : approvedGuides;

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
                title="Guide Approvals"
                description="Loading guides..."
            />
        );
    }

    if (isError) {
        return (
            <PageHeader
                title="Guide Approvals"
                description="Failed to load guides."
            />
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Guide Approvals"
                description="Review guide registration requests."
            />

            <SectionCard title="Guides">
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
                            pendingGuides.length
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
                            approvedGuides.length
                        }
                        )
                    </button>
                </div>                {guides.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                        {activeTab === "pending"
                            ? "No pending guide requests."
                            : "No approved guides found."}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b bg-slate-50 text-left">
                                    <th className="px-4 py-3">
                                        Guide
                                    </th>

                                    <th className="px-4 py-3">
                                        City
                                    </th>

                                    <th className="px-4 py-3">
                                        Experience
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
                                {guides.map(
                                    (guide) => (
                                        <tr
                                            key={
                                                guide.id
                                            }
                                            className="border-b hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-4 font-medium">
                                                {
                                                    guide.fullName
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    guide.city
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    guide.experience
                                                }{" "}
                                                Years
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    guide.phone
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
                                                        setSelectedGuide(
                                                            guide
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
                open={!!selectedGuide}
                onClose={() =>
                    setSelectedGuide(
                        null
                    )
                }
                title="Guide Details"
            >
                {selectedGuide && (
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
                                Guide Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <p>
                                    <strong>
                                        Name:
                                    </strong>{" "}
                                    {
                                        selectedGuide.fullName
                                    }
                                </p>

                                <p>
                                    <strong>
                                        City:
                                    </strong>{" "}
                                    {
                                        selectedGuide.city
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {
                                        selectedGuide.phone
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Experience:
                                    </strong>{" "}
                                    {
                                        selectedGuide.experience
                                    }{" "}
                                    Years
                                </p>

                                <p>
                                    <strong>
                                        Languages:
                                    </strong>{" "}
                                    {
                                        selectedGuide.languages
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Price / Hour:
                                    </strong>{" "}
                                    ₹
                                    {
                                        selectedGuide.pricePerHour
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Price / Day:
                                    </strong>{" "}
                                    ₹
                                    {
                                        selectedGuide.pricePerDay
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Rating:
                                    </strong>{" "}
                                    {
                                        selectedGuide.rating
                                    }
                                </p>

                                <p className="col-span-2">
                                    <strong>
                                        Bio:
                                    </strong>{" "}
                                    {selectedGuide.bio ??
                                        "N/A"}
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
                                        selectedGuide
                                            .user
                                            .firstName
                                    }{" "}
                                    {
                                        selectedGuide
                                            .user
                                            .lastName
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Email:
                                    </strong>{" "}
                                    {
                                        selectedGuide
                                            .user
                                            .email
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {
                                        selectedGuide
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
                                        rejectGuide.mutate(
                                            selectedGuide.userId
                                        )
                                    }
                                    className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() =>
                                        approveGuide.mutate(
                                            selectedGuide.userId
                                        )
                                    }
                                    className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                                >
                                    Approve
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </DetailsModal>
        </div>
    );
}

export default GuidesPage;