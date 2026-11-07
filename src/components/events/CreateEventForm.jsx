
"use client";

import { useSession } from "@/lib/auth-client";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";


const eventCategories = [
    { value: "cleanup", label: "Cleanup" },
    { value: "plantation", label: "Plantation" },
    { value: "donation", label: "Donation" },
    { value: "education", label: "Education" },
    { value: "community-support", label: "Community Support" },
    { value: "other", label: "Other" },
];

const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
};

const CreateEventForm = () => {
    const [eventData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        thumbnail: "",
        location: "",
        eventDate: "",
    });
    const router = useRouter();
    const [error, setError] = useState("");

    const minDate = getMinDate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };
    const { data: session, isPending } = useSession();
    if (isPending)
        return (
            <div className="flex justify-center items-center h-[45vh]">
                <LoaderCircle />
            </div>
        )
    const { user } = session;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form)
        const eventData = Object.fromEntries(formData.entries())

        if (eventData.eventDate < getMinDate()) {
            setError("Please select a future event date.");
            return;
        }
        const res = await fetch("http://localhost:8000/create-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...eventData, creatorEmail: user.email,creatorName:user.name,creatorImage:user.image}),
        });
        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || "Failed to create event");
        }

        toast.success("Event created successfully!");

        form.reset();

        router.push("/manage-events");

        
        // Next step: Connect this form to our Express API.
    };

    const inputStyle =
        "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#466060] focus:ring-2 focus:ring-[#466060]/20";

    const labelStyle =
        "mb-2 block text-sm font-semibold text-[#466060]";

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl bg-white p-6 shadow-sm sm:p-8"
        >
            {/* Event Title */}
            <div>
                <label htmlFor="title" className={labelStyle}>
                    Event Title
                </label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="e.g. Community Tree Plantation"
                    value={eventData.title}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                />
            </div>

            {/* Event Category */}
            <div>
                <label htmlFor="category" className={labelStyle}>
                    Event Type
                </label>

                <select
                    id="category"
                    name="category"
                    value={eventData.category}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                >
                    <option value="" disabled>
                        Select event type
                    </option>

                    {eventCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className={labelStyle}>
                    Event Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Describe your event, its purpose, and how people can participate..."
                    value={eventData.description}
                    onChange={handleChange}
                    className={`${inputStyle} resize-y`}
                    required
                />
            </div>

            {/* Thumbnail URL */}
            <div>
                <label htmlFor="thumbnail" className={labelStyle}>
                    Thumbnail Image URL
                </label>

                <input
                    type="url"
                    id="thumbnail"
                    name="thumbnail"
                    placeholder="https://example.com/image.jpg"
                    value={eventData.thumbnail}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                />

                {/* Image Preview */}
                {eventData.thumbnail && (
                    <div className="mt-4">
                        <p className="mb-2 text-sm font-medium text-gray-500">
                            Image Preview
                        </p>

                        <Image
                            src={eventData.thumbnail}
                            alt="Event thumbnail preview"
                            width={600}
                            height={400}
                            className="h-48 w-full rounded-lg border object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                            onLoad={(e) => {
                                e.currentTarget.style.display = "block";
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Location */}
            <div>
                <label htmlFor="location" className={labelStyle}>
                    Event Location
                </label>

                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g. Dhanmondi, Dhaka"
                    value={eventData.location}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                />
            </div>

            {/* Event Date */}
            <div>
                <label htmlFor="eventDate" className={labelStyle}>
                    Event Date
                </label>

                <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    min={minDate}
                    value={eventData.eventDate}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                />
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-sm font-medium text-red-600">
                    {error}
                </p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full rounded-lg bg-[#466060] px-6 py-3 font-semibold text-white transition hover:bg-[#354d4d] focus:outline-none focus:ring-2 focus:ring-[#466060] focus:ring-offset-2"
            >
                Create Event
            </button>
        </form>
    );
};

export default CreateEventForm;
