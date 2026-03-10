import connectDB from '@/app/lib/mongodb';
import { Event } from '@/database';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Cloudinary config is typically handled via CLOUDINARY_URL in .env,
// but for some serverless environments, it might need explicit configuration.
// If it fails, we may need to call cloudinary.config() manually.

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'CloudinaryTest' },
                (error, results) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        return reject(error);
                    }
                    resolve(results);
                }
            ).end(buffer);
        });

        return NextResponse.json({
            message: 'Cloudinary is working!',
            result: uploadResult
        }, { status: 200 });

    } catch (error: any) {
        console.error('Test endpoint error:', error);
        return NextResponse.json({
            message: 'Cloudinary test failed',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

export async function  GET(){
    try {
        await connectDB();
        const events=await Event.find().sort({createdAt:-1});
        return NextResponse.json({message:'Events fetched successfully',events},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Event fetching failed',error:error},{status:500})
    }
}