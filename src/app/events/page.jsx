import EventCard from '@/components/events/EventCard';
import React from 'react';

const AllEventsPage = async() => {

const res = await fetch('http://localhost:8000/events')
const data = await res.json()
console.log(data);

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {data.map((event) => (
    <EventCard
      key={event._id}
      event={event}
    />
  ))}
</div>
    );
};

export default AllEventsPage;