import React from 'react'
import ExploreBtn from './components/ExploreBtn'
import EventCard from './components/EventCard'
import connectDB from './lib/mongodb'
import { Event } from '@/database'

const page = async () => {
  let events: { title: string; image: string; slug: string; location: string; date: string; time: string }[] = [];

  try {
    await connectDB();
    const dbEvents = await Event.find().sort({ createdAt: -1 }).lean();
    events = dbEvents.map((e: Record<string, unknown>) => ({
      title: e.title as string,
      image: e.image as string,
      slug: e.slug as string,
      location: e.location as string,
      date: e.date as string,
      time: e.time as string,
    }));
  } catch {
    events = [];
  }

  return (
    <section>
        <h1 className='text-center'>The Hub for Every Dev <br /> Event You Mustn&apos;t Miss</h1>
        <p className='text-center mt-5 '>Hackathons,Meetups and Conferences , All in One Place</p>
        <ExploreBtn/>
        <div className='mt-20 space-y-7' id="events">
          <h3>Featured Events</h3>
          <ul className='events list-none '>
            {events.map((event)=>(
              <li key={event.slug}><EventCard title={event.title} image={event.image} slug={event.slug} location={event.location} date={event.date} time={event.time}/></li>
            ))}
          </ul>
        </div>
    </section>
    
  )
}

export default page