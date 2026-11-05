import { notFound } from "next/navigation";
import EventDetailsCard from "@/components/events/EventDetailsCard";

const EventsDetailsPage = async({params}) => {
    const {id} = await params

    const res = await fetch(`http://localhost:8000/events/${id}`,
        { cache: "no-store" }
    )
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