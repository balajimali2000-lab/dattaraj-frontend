import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, phone, city } = body;

    // Validation
    if (!name || !phone || !city) {
      return NextResponse.json(
        { success: false, error: 'Name, phone and city are required.' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const newEnquiry = await Enquiry.create({
      name,
      phone,
      city
    });

    console.log('[Enquiry Form Saved]:', newEnquiry._id);

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Our concierge will contact you shortly with personalized details.' 
    });

  } catch (error: any) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
