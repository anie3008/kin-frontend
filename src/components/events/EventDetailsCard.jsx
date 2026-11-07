"use client"
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify";

const EventDetailsCard = ({ event }) => {
  const {
    title,
    category,
    thumbnail,
    description,
    location,
    eventDate,
    creatorName,
    creatorEmail,
    creatorImage,
  } = event;

   const { data: session, isPending } = authClient.useSession();
   const user = session?.user;
  
const formattedDate = new Date(
    `${eventDate}T00:00:00`
  ).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
console.log(event);
  const categoryLabels = {
    cleanup: "Cleanup",
    plantation: "Plantation",
    donation: "Donation",
    education: "Education",
    "community-support": "Community Support",
    other: "Other",
  };
const handleJoin = async (e) => {
e.preventDefault()

 if (!user) {
        toast.info("Please login to join this event");
        return;
    }

    const data = {
  name: user?.name,
  image:user?.image,
  email:user?.email,
  id:user?.id,
  ...event,}


const res = await fetch("http://localhost:8000/joined-event",{
  method: "POST",
  headers: {
    'content-Type' : 'application/json'
  },
  body: JSON.stringify(data)
})
const joinedEvent = await res.json()
} 



  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Event Thumbnail */}
      <div className="relative h-64 w-full md:h-105">
        <Image
          src={thumbnail}
          alt={title}
          fill
          unoptimized
          priority
          sizes="(max-width: 768px) 100vw, 1000px"
          className="object-cover"
        />
      </div>

      <div className="p-5 md:p-8">

        {/* Category */}
        <span className="inline-block rounded-full bg-[#466060]/10 px-4 py-1.5 text-sm font-semibold text-[#466060]">
          {categoryLabels[category] || category}
        </span>

        {/* Title */}
        <h1 className="mt-4 text-2xl font-bold text-[#263b3b] md:text-4xl">
          {title}
        </h1>

        {/* Date and Location */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a37803]/10 text-[#a37803]">
              <span className="text-xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Event Date</p>
              <p className="font-semibold text-[#263b3b]">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a37803]/10 text-[#a37803]">
              <span className="text-xl">📍</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-[#263b3b]">
                {location}
              </p>
            </div>
          </div>

        </div>

        {/* Description and Organizer */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Description */}
          <div className="md:col-span-2">
            <h2 className="mb-4 text-xl font-bold text-[#263b3b]">
              About This Event
            </h2>
            <p className="whitespace-pre-line text-base leading-8 text-gray-600">
              {description}
            </p>
          </div>

          {/* Organizer */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#263b3b]">
              Organizer
            </h2>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                {creatorImage ? (
                  <Image
                    src={creatorImage}
                    alt={creatorName || "Organizer"}
                    fill
                    unoptimized
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-bold text-[#466060]">
                    {(creatorName || "C").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-[#263b3b]">
                  {creatorName || "Community Member"}
                </p>
                <p className="break-all text-sm text-gray-500">
                  {creatorEmail || "Email not available"}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Join Button */}
       
          <form onSubmit={handleJoin} className="mt-10 border-t border-gray-200 pt-6">
          <button
            type="submit"
            className="w-full rounded-xl bg-[#466060] px-6 py-3.5 font-semibold text-white transition hover:bg-[#354c4c] active:scale-[0.99] sm:w-auto"
          >
            Join This Event
          </button>
          </form>
        

      </div>
    </div>
  );
};

export default EventDetailsCard;
