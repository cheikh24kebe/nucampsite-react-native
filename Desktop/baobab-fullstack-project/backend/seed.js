const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const menuItems = [
  {
    name: "Accara",
    category: "appetizers",
    price: 8.99,
    description: "Black-eyed pea fritters served with spicy tomato sauce",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?w=400&h=300&fit=crop"
  },
  {
    name: "Fataya",
    category: "appetizers",
    price: 7.99,
    description: "Savory fried pastries filled with fish or meat",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop"
  },
  {
    name: "Thieboudienne",
    category: "mains",
    price: 18.99,
    description: "Senegal's national dish - fish and rice with vegetables",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    name: "Yassa Poulet",
    category: "mains",
    price: 16.99,
    description: "Marinated grilled chicken with onions and lemon sauce",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop"
  },
  {
    name: "Mafe",
    category: "mains",
    price: 17.99,
    description: "Peanut stew with meat and vegetables, served with rice",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop"
  },
  {
    name: "Thiakry",
    category: "desserts",
    price: 6.99,
    description: "Millet couscous with sweetened yogurt and dried fruits",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop"
  },
  {
    name: "Bissap",
    category: "drinks",
    price: 4.99,
    description: "Refreshing hibiscus tea, a Senegalese favorite",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop"
  },
  {
    name: "Ginger Juice",
    category: "drinks",
    price: 5.99,
    description: "Freshly pressed ginger with a hint of lemon",
    image: "https://images.unsplash.com/photo-1622244093591-0becc5b0d0f4?w=400&h=300&fit=crop"
  }
];

async function seedDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    console.log('🧹 Clearing existing menu items...');
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');
    
    // Insert new data
    console.log('🌱 Seeding database with menu items...');
    await MenuItem.insertMany(menuItems);
    console.log(`Seeded database with ${menuItems.length} menu items`);
    
    // Display seeded items
    const count = await MenuItem.countDocuments();
    console.log(`Total menu items in database: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
