import connectDB from "@/app/lib/mongodb";
import { Event } from "@/database";
import {  NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest
){
    try {
        await connectDB();
        const formData=await req.formData();
        let event: any;
        try {
            event = Object.fromEntries(formData.entries());
            
            // Extract arrays properly handling both single string and multiple string scenarios
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
        } catch (e) {
            return NextResponse.json({message:'Invalid json data format'},{status:400});
        }
        const createdEvent=await Event.create(event);
        return NextResponse.json({message:'Event created successfully',event:createdEvent},{status:201})
    } catch (e) {
        console.error(e);
        return NextResponse.json({message:'Event Creation Failed',error:e instanceof Error?e.message:'unknown'},{status:500})
    }
}