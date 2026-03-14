import Image from "next/image";
import Link from "next/link";
import connectDB from "@/app/lib/mongodb";
import { Event } from "@/database";
import BookingForm from "@/app/components/BookingForm";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

interface EventData {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  overview?: string;
  image: string;
  venue?: string;
  location: string;
  date: string;
  time: string;
  mode?: string;
  audience?: string;
  agenda?: string[];
  organizer?: string;
  tags?: string[];
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  let event: EventData | null = null;
  let eventId: string | null = null;

  try {
    await connectDB();
    const dbEvent = await Event.findOne({ slug }).lean();
    if (dbEvent) {
      const doc = dbEvent as Record<string, unknown>;
      event = {
        _id: String(doc._id),
        title: doc.title as string,
        slug: doc.slug as string,
        description: doc.description as string,
        overview: doc.overview as string,
        image: doc.image as string,
        venue: doc.venue as string,
        location: doc.location as string,
        date: doc.date as string,
        time: doc.time as string,
        mode: doc.mode as string,
        audience: doc.audience as string,
        agenda: doc.agenda as string[],
        organizer: doc.organizer as string,
        tags: doc.tags as string[],
      };
      eventId = event._id || null;
    }
  } catch {
    event = null;
  }

  if (!event) {
    return (
      <section id="event">
        <div className="header">
          <h1>Event Not Found</h1>
          <p>The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="event">
      <div className="header">
        <Link href="/" className="text-light-200 hover:text-white transition-colors text-sm flex items-center gap-2">
          <span>←</span> Back to Events
        </Link>
        <h1>{event.title}</h1>
        <p>{event.overview || event.description}</p>
        <div className="flex flex-row flex-wrap gap-2 mt-2">
          {event.tags?.map((tag) => (
            <span key={tag} className="pill">{tag}</span>
          ))}
        </div>
      </div>

      <div className="details">
        <div className="content">
          <Image src={event.image} alt={event.title} width={800} height={457} className="banner" />

          <div className="flex-col-gap-2">
            <h2>About the Event</h2>
            <p>{event.description}</p>
          </div>

          <div className="flex-col-gap-2">
            <h2>Event Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex-row-gap-2 items-center">
                <Image src="/icons/calendar.svg" alt="date" width={18} height={18} />
                <div>
                  <p className="text-light-200! text-xs!">Date</p>
                  <p className="text-white! font-medium!">{event.date}</p>
                </div>
              </div>
              <div className="flex-row-gap-2 items-center">
                <Image src="/icons/clock.svg" alt="time" width={18} height={18} />
                <div>
                  <p className="text-light-200! text-xs!">Time</p>
                  <p className="text-white! font-medium!">{event.time}</p>
                </div>
              </div>
              <div className="flex-row-gap-2 items-center">
                <Image src="/icons/pin.svg" alt="location" width={18} height={18} />
                <div>
                  <p className="text-light-200! text-xs!">Location</p>
                  <p className="text-white! font-medium!">{event.location}</p>
                </div>
              </div>
              {event.mode && (
                <div className="flex-row-gap-2 items-center">
                  <Image src="/icons/mode.svg" alt="mode" width={18} height={18} />
                  <div>
                    <p className="text-light-200! text-xs!">Mode</p>
                    <p className="text-white! font-medium! capitalize">{event.mode}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {event.audience && (
            <div className="flex-col-gap-2">
              <h2>Who Should Attend</h2>
              <div className="flex-row-gap-2 items-center">
                <Image src="/icons/audience.svg" alt="audience" width={18} height={18} />
                <p>{event.audience}</p>
              </div>
            </div>
          )}

          {event.agenda && event.agenda.length > 0 && (
            <div className="agenda">
              <h2>Agenda</h2>
              <ul>
                {event.agenda.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {event.organizer && (
            <div className="flex-col-gap-2">
              <h2>Organized By</h2>
              <p className="text-white! font-semibold!">{event.organizer}</p>
            </div>
          )}
        </div>

        <div className="booking">
          <div className="signup-card">
            <BookingForm eventId={eventId} eventSlug={slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
