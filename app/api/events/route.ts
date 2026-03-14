import connectDB from "@/app/lib/mongodb";
import { Event } from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    let event: Record<string, unknown>;

    try {
      event = Object.fromEntries(formData.entries());

      if (formData.has('agenda')) {
        const agendaItems = formData.getAll('agenda');
        event.agenda = agendaItems.length === 1 && (agendaItems[0] as string).startsWith('[')
          ? JSON.parse(agendaItems[0] as string)
          : agendaItems;
      }
      if (formData.has('tags')) {
        const tagItems = formData.getAll('tags');
        event.tags = tagItems.length === 1 && (tagItems[0] as string).startsWith('[')
          ? JSON.parse(tagItems[0] as string)
          : tagItems;
      }
    } catch {
      return NextResponse.json({ message: 'Invalid json data format' }, { status: 400 });
    }

    const file = formData.get('image') as File;
    if (!file) {
      return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      }).end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;
    const createdEvent = await Event.create(event);

    return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'unknown' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Event fetching failed', error: e instanceof Error ? e.message : 'unknown' }, { status: 500 });
  }
}