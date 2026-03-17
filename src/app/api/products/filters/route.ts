import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    
    const [categories, types] = await Promise.all([
      Product.distinct('category'),
      Product.distinct('type')
    ]);

    // Cleanup null/undefined
    const cleanCategories = categories.filter(c => c && c !== 'null');
    const cleanTypes = types.filter(t => t && t !== 'null');

    return NextResponse.json({ 
      success: true, 
      data: { 
        categories: cleanCategories, 
        types: cleanTypes 
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
