import EventCard from '@/components/events/EventCard';
import Link from 'next/link';
import React from 'react';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
const AllEventsPage = async () => {
  const res = await fetch(`${API_URL}/events`)
  const data = await res.json()

  const categories = ['All', ...new Set(data.map((event) => event.category).filter(Boolean))];

  return (

    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-600">Upcoming Events</h1>
          <p className="mt-2 text-sm text-gray-500">
            Discover, explore, and join the best events happening around you.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Custom Colored Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 placeholder-gray-400"
              style={{
                borderColor: '#466060',
                ['--tw-ring-color']: '#a37803',
              }}
            />
          </div>
          {/* Create Event Button */}
          <Link href={'/create-event'}>
            <button className="whitespace-nowrap  bg-[#466060] hover:hover:bg-[#354c4c] text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors">
              Create Event
            </button>
          </Link>
        </div>
      </div>

      {/* Filter & Sorting Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2">
          Filter By:
        </span>
        {categories.map((category) => (
          <button
            key={category}
            className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;