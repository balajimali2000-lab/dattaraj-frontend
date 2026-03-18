import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { normalizeProductImages } from '@/lib/image-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const random = searchParams.get('random') === 'true';
    const skip = (page - 1) * limit;

    await dbConnect();
    
    const query: any = {};
    if (category && category !== 'all') query.category = category;
    if (type && type !== 'all') query.type = type;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let products;
    let total;

    if (random) {
      products = await Product.aggregate([
        { $match: query },
        { $sample: { size: limit } }
      ]);
      total = products.length; // Approximate or actual if we don't care about total count for random
    } else {
      [products, total] = await Promise.all([
        Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Product.countDocuments(query)
      ]);
    }

    if (products && products.length > 0) {
      console.log('[API] Sample Product data returned');
      products = products.map((p: any) => normalizeProductImages(JSON.parse(JSON.stringify(p))));
    }

    return NextResponse.json({ 
      success: true, 
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
