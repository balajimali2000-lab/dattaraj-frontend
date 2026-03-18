import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { normalizeProductImages } from '@/lib/image-utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('[API] Fetching Product ID:', id);
    
    await dbConnect();
    
    // Try finding by ID first
    let product = null;
    try {
      product = await Product.findById(id);
    } catch (e) {
      console.log('[API] ID Search failed, trying literal search or serial number');
    }

    // Fallback: search by serialNumber
    if (!product) {
       product = await Product.findOne({
         $or: [
           { serialNumber: id },
           { _id: id }
         ]
       });
    }
    
    if (!product) {
      console.log('[API] Product not found for search:', id);
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    console.log('[API] Product found:', product.name);
    return NextResponse.json({ 
      success: true, 
      data: normalizeProductImages(JSON.parse(JSON.stringify(product)))
    });
  } catch (error: any) {
    console.error('[API] Error in product detail fetch:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
