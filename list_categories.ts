import dbConnect from './src/lib/mongodb';
import Product from './src/models/Product';

async function listCategories() {
  try {
    await dbConnect();
    const categories = await Product.distinct('category');
    const types = await Product.distinct('type');
    console.log('CATEGORIES:', JSON.stringify(categories));
    console.log('TYPES:', JSON.stringify(types));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

listCategories();
