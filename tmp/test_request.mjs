import fs from 'fs';
import { FormData, File } from 'formdata-node';
import fetch from 'node-fetch';

async function testCloudinary() {
    console.log('--- Testing Cloudinary Upload Endpoint ---');
    console.log('1. Constructing a dummy image buffer...');
    // Create a tiny 1x1 transparent PNG buffer
    const dummyImageBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'base64'
    );
    const dummyFile = new File([dummyImageBuffer], 'test-image.png', { type: 'image/png' });

    console.log('2. Sending POST request to http://localhost:3000/api/test-cloudinary...');
    const formData = new FormData();
    formData.append('image', dummyFile);

    try {
        const response = await fetch('http://localhost:3000/api/test-cloudinary', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('SUCCESSS: Cloudinary integration is working!');
        } else {
            console.error('FAILURE: Could not upload to Cloudinary.');
        }
    } catch (error) {
        console.error('ERROR during the request:', error.message);
    }
}

testCloudinary();
