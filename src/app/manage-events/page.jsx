
"use client";

import { useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    LoaderCircle , 
    Pencil,
    Trash} from 'lucide-react';


const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

const categoryLabels = {
  donation: "Donation",
  plantation: "Plantation",
  cleanup: "Clean Up",
  education: "Education",
  other: "Other",
};

const ManageEventsPage = () => {
  const { data: session, isPending } = useSession();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events created by the logged-in user
  useEffect(() => {
    if (isPending|| !session?.user?.email) return;

   

    const fetchMyEvents = async () => {
      try {
        setError("");

        const response = await fetch(
          `${API_URL}/my-events/${encodeURIComponent(session.user.email)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [session, isPending]);

  // Delete event
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/delete-event/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== id)
      );
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  // Loading session
  if (isPending || loading) {
    return (
      <div className="flex h-[45vh] items-center justify-center">
        <LoaderCircle  className="animate-spin text-3xl text-[#466060]" />
      </div>
    );
  }

  // User not logged in
  if (!session?.user) {
    return (
      <div className="flex min-h-[45vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-[#263b3b]">
          Please log in to manage your events.
        </h2>

        <Link
          href="/login"
          className="rounded-xl bg-[#466060] px-6 py-3 text-white hover:bg-[#354c4c]"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#263b3b]">
            Manage Events
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all the community events you&apos;ve created.
          </p>
        </div>

        <Link
          href="/create-event"
          className="rounded-xl bg-[#466060] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#354c4c]"
        >
           Create Event
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!error && events.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
          <h2 className="text-xl font-bold text-[#263b3b]">
            No events created yet!
          </h2>

          <p className="mt-2 text-gray-500">
            Start making a difference in your community.
          </p>

          <Link
            href="/create-event"
            className="mt-6 inline-block rounded-xl bg-[#466060] px-6 py-3 text-white hover:bg-[#354c4c]"
          >
            Create Your First Event
          </Link>
        </div>
      )}

      {/* Event Cards */}
      {!error && events.length > 0 && (
        <>
          <p className="mb-5 text-sm font-medium text-gray-500">
            {events.length} {events.length === 1 ? "Event" : "Events"} found
          </p>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => {
              const {
                _id,
                title,
                category,
                description,
                thumbnail,
                location,
                eventDate,
                creatorName,
              } = event;

              const formattedDate = new Date(eventDate).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                <article
                  key={_id}
                  className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />

                    {/* Category */}
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#466060]/95 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                      {categoryLabels[category] || category}
                    </span>

                    {/* Date */}
                    <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#466060] shadow-sm">
                      {formattedDate}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex min-h-62.5 flex-col p-5">

                    <h2 className="mb-2 line-clamp-1 text-xl font-bold text-[#263b3b] transition-colors group-hover:text-[#466060]">
                      {title}
                    </h2>

                    <p className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-[#a37803]">📍</span>
                      <span className="line-clamp-1">{location}</span>
                    </p>

                    <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                      {description}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-auto border-t border-gray-100 pt-4">

                      <p className="mb-4 text-xs text-gray-500">
                        Organized by{" "}
                        <span className="font-semibold text-[#466060]">
                          {creatorName || session.user.name || "Community Member"}
                        </span>
                      </p>

                      <div className="flex gap-3">

                        {/* View */}
                        <Link
                          href={`/events/${_id}`}
                          className="flex flex-1 items-center justify-center rounded-xl bg-[#466060] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#354c4c]"
                        >
                          View
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/edit-event/${_id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#466060] px-3 py-3 text-sm font-semibold text-[#466060] transition hover:bg-[#466060] hover:text-white"
                        >
                          <Pencil />
                          Edit
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(_id)}
                          className="flex items-center justify-center rounded-xl border border-red-200 px-4 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
                          aria-label={`Delete ${title}`}
                          title="Delete event"
                        >
                          <Trash />
                        </button>

                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

          </div>
        </>
      )}
    </section>
  );
};

export default ManageEventsPage;
