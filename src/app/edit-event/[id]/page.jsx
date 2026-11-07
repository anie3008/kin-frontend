
"use client";

import { authClient } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

const EditEventPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing event
  useEffect(() => {
    if (isPending || !session?.user) return;

    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/events/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await response.json();
        setEvent(data);

      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, isPending, session?.user]);

  // Update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `http://localhost:8000/edit-event/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to update event");
      }

      toast.success("Event updated successfully!");
      router.push("/manage-events");

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (isPending || (session?.user && loading)) {
    return (
      <div className="flex h-[45vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-3xl text-[#466060]" />
      </div>
    );
  }

  // Authentication
  if (!session?.user) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold text-[#263b3b]">
          Please login to edit events.
        </p>
      </div>
    );
  }

  // Error or missing event
  if (error && !event) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!event) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#263b3b]">
          Edit Event
        </h1>

        <p className="mt-2 text-gray-500">
          Update your community event information.
        </p>
      </div>

      <form
        key={event._id}
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
      >

        {/* Title */}
        <div>
          <label className="mb-2 block font-semibold text-[#263b3b]">
            Event Title
          </label>

          <input
            type="text"
            name="title"
            defaultValue={event.title}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#466060]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-semibold text-[#263b3b]">
            Category
          </label>

          <select
            name="category"
            defaultValue={event.category}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#466060]"
          >
            <option value="">Select category</option>
            <option value="cleanup">Cleanup</option>
            <option value="plantation">Plantation</option>
            <option value="donation">Donation</option>
            <option value="education">Education</option>
            <option value="community-support">
              Community Support
            </option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-semibold text-[#263b3b]">
            Description
          </label>

          <textarea
            name="description"
            defaultValue={event.description}
            required
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#466060]"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block font-semibold text-[#263b3b]">
            Location
          </label>

          <input
            type="text"
            name="location"
            defaultValue={event.location}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#466060]"
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="mb-2 block font-semibold text-[#263b3b]">
            Event Date
          </label>

          <input
            type="date"
            name="eventDate"
            defaultValue={event.eventDate?.slice(0, 10)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#466060]"
          />
        </div>

        {/* Error */}
        {/* {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )} */}

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            type="submit"
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#466060] px-6 py-3 font-semibold text-white transition hover:bg-[#354c4c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <LoaderCircle className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update Event"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>

        </div>
      </form>
    </section>
  );
};

export default EditEventPage;
