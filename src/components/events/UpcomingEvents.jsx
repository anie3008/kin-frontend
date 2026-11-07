import EventCard from "@/components/events/EventCard";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
const UpcomingEvents = async () => {
  let events = [];

  try {
    const res = await fetch(
      `${API_URL}/events`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    events = await res.json();
  } catch (error) {
    console.error("Upcoming events error:", error);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* Section heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#a37803]">
          Make a Difference
        </p>

        <h2 className="text-3xl font-bold text-[#466060] md:text-4xl">
          Upcoming Events
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Discover upcoming community events and be part of something meaningful.
        </p>
      </div>

      {/* Event cards */}
      {events.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No upcoming events at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {/* View all events */}
      <div className="mt-10 text-center">
        <Link
          href="/events"
          className="inline-block rounded-lg border border-[#466060] px-6 py-3 font-semibold text-[#466060] transition hover:bg-[#466060] hover:text-white"
        >
          Explore All Events →
        </Link>
      </div>
    </section>
  );
};

export default UpcomingEvents;