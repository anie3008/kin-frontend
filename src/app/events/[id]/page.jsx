import { notFound } from "next/navigation";
import EventDetailsCard from "@/components/events/EventDetailsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { serverToken } from "@/lib/serverToken";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
const EventsDetailsPage = async ({ params }) => {
  const { id } = await params

  const token = await serverToken();

  const res = await fetch(`${API_URL}/events/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }
  const event = await res.json()

  return (
    <div>
      <section className="px-4 py-12 md:px-8">
        <EventDetailsCard event={event} />
      </section>
    </div>
  );
};

export default EventsDetailsPage;