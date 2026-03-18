import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    
    // Efficiently get all unique categories and one sample image for each
    const categoryData = await Product.aggregate([
      { $match: { category: { $ne: null } } },
      { $group: { 
          _id: "$category", 
          thumbnail: { $first: "$image.thumbnail" },
          mid: { $first: "$image.mid" }
      }},
      { $project: {
          name: "$_id",
          image: { $ifNull: ["$thumbnail", "$mid"] },
          _id: 0
      }}
    ]);

    const types = await Product.distinct('type');

    console.log('[API] Filters Fetched:', { categoriesCount: categoryData.length, typesCount: types.length });

    // Cleanup and format
    const cleanCategories = categoryData
      .filter(c => c.name && c.name !== 'null')
      .map(c => ({
        name: c.name,
        image: c.image || null
      }));

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
