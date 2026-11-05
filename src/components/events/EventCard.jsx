import Image from "next/image";
import Link from "next/link";

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    category,
    thumbnail,
    location,
    description,
    eventDate,
    creatorName,
  } = event;

  const formattedDate = new Date(
    `${eventDate}T00:00:00`
  ).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const categoryLabels = {
    cleanup: "Cleanup",
    plantation: "Plantation",
    donation: "Donation",
    education: "Education",
    "community-support": "Community Support",
    other: "Other",
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

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

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

        {/* Category badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#466060]/95 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm backdrop-blur-sm">
          {categoryLabels[category] || category}
        </span>

        {/* Date badge */}
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#466060] shadow-sm backdrop-blur-sm">
          {formattedDate}
        </span>
      </div>

      {/* Content */}
      <div className="flex min-h-[250px] flex-col p-5">

        {/* Title */}
        <h2 className="mb-2 line-clamp-1 text-xl font-bold text-[#263b3b] transition-colors group-hover:text-[#466060]">
          {title}
        </h2>

        {/* Location */}
        <p className="mb-3 flex items-center gap-2 text-sm text-gray-500">
          <span className="text-[#a37803]">📍</span>
          <span className="line-clamp-1">{location}</span>
        </p>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>

        {/* Creator */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          <p className="mb-4 text-xs text-gray-500">
            Organized by{" "}
            <span className="font-semibold text-[#466060]">
              {creatorName || "Community Member"}
            </span>
          </p>

          {/* View button */}
          <Link
            href={`/events/${_id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#466060] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#354c4c] active:scale-[0.98]"
          >
            View Event
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;