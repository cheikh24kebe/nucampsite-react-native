const API_BASE = '/api';

export const fetchMenuItems = async () => {
  try {
    console.log('📡 Fetching menu items from backend...');
    const response = await fetch(`${API_BASE}/menu`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`✅ Received ${data.length} menu items from backend`);
    return data;
  } catch (error) {
    console.error('❌ Error fetching menu items:', error);
    // Return fallback data if backend fails
    return getFallbackMenuItems();
  }
};

export const placeOrder = async (orderData) => {
  try {
    console.log('📦 Placing order...', orderData);
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Order placed successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Error placing order:', error);
    throw error;
  }
};

// Fallback data in case backend is unavailable
const getFallbackMenuItems = () => {
  console.log('⚠️ Using fallback menu data');
  return [
    {
      _id: '1',
      name: "Accara",
      category: "appetizers",
      price: 8.99,
      description: "Black-eyed pea fritters served with spicy tomato sauce",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?w=400&h=300&fit=crop"
    },
    {
      _id: '2',
      name: "Fataya",
      category: "appetizers",
      price: 7.99,
      description: "Savory fried pastries filled with fish or meat",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop"
    }
  ];
};
