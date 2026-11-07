import EventCard from '@/components/events/EventCard';
import { auth } from '@/lib/auth';
import { serverToken } from '@/lib/serverToken';
import { headers } from 'next/headers';
import React from 'react';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL
const JoinedEventsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user

const token = await serverToken()

    const res = await fetch(`${API_URL}/joined-events/${user?.email}`,{
         headers: {authorization: `Bearer ${token}`
    }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch joined events");
    }
    const myEvents = await res.json()

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-[#263b3b]">
                My Joined Events
            </h1>

            {myEvents.length === 0 ? (
                <p className="text-gray-500">
                    You haven&apos;t joined any events yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {myEvents.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                    ))}
                </div>
            )}
        </main>
    );
};

export default JoinedEventsPage;