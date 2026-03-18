import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    console.log('[Contact Form Saved]:', newContact._id);

    return NextResponse.json({ 
      success: true, 
      message: 'Your heritage inquiry has been received. Our concierge will contact you shortly.' 
    });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
