import connectDB from "@/app/lib/mongodb";
import { Booking, Event } from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, eventId, eventSlug } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    let resolvedEventId = eventId;

    if (!resolvedEventId && eventSlug) {
      const event = await Event.findOne({ slug: eventSlug }).select("_id");
      if (event) {
        resolvedEventId = event._id.toString();
      }
    }

    if (!resolvedEventId) {
      return NextResponse.json(
        { message: "This event is not yet available for subscription. The event must be added to the database first." },
        { status: 400 }
      );
    }

    const existingBooking = await Booking.findOne({
      eventId: resolvedEventId,
      email: email.toLowerCase().trim(),
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "You have already subscribed to this event with this email." },
        { status: 409 }
      );
    }

    const booking = await Booking.create({
      eventId: resolvedEventId,
      email: email.toLowerCase().trim(),
    });

    return NextResponse.json(
      { message: "Successfully subscribed! You will receive event updates.", booking: { id: booking._id, email: booking.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Failed to subscribe. Please try again later." }, { status: 500 });
  }
}
