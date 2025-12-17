import React, { useState, useEffect, useCallback } from 'react';
import {
  FaBars, FaTimes, FaShoppingCart, FaMapMarkerAlt, FaPhone,
  FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaTripadvisor,
  FaChevronLeft, FaChevronRight, FaTrash
} from 'react-icons/fa';
import './App.css';

// Menu Data
const menuItems = [
  { id: 1, name: "Accara", category: "appetizers", price: 8.99, description: "Black-eyed pea fritters served with spicy tomato sauce", image: `${process.env.PUBLIC_URL}/img/accara.jpg` },
  { id: 2, name: "Fataya", category: "appetizers", price: 7.99, description: "Savory fried pastries filled with fish or meat", image: `${process.env.PUBLIC_URL}/img/fataya.jpg` },
  { id: 3, name: "Thieboudienne", category: "mains", price: 18.99, description: "Senegal's national dish - fish and rice with vegetables", image: `${process.env.PUBLIC_URL}/img/thieboudieune.jpg` },
  { id: 4, name: "Yassa Poulet", category: "mains", price: 16.99, description: "Marinated grilled chicken with onions and lemon sauce", image: `${process.env.PUBLIC_URL}/img/yassa poulet.jpg` },
  { id: 5, name: "Mafe", category: "mains", price: 17.99, description: "Peanut stew with meat and vegetables, served with rice", image: `${process.env.PUBLIC_URL}/img/mafe.jpg` },
  { id: 6, name: "Thiakry", category: "desserts", price: 6.99, description: "Millet couscous with sweetened yogurt and dried fruits", image: `${process.env.PUBLIC_URL}/img/thiakry.jpg` },
  { id: 7, name: "Bissap", category: "drinks", price: 4.99, description: "Refreshing hibiscus tea, a Senegalese favorite", image: `${process.env.PUBLIC_URL}/img/bissap.jpg` },
  { id: 8, name: "Ginger Juice", category: "drinks", price: 5.99, description: "Freshly pressed ginger with a hint of lemon", image: `${process.env.PUBLIC_URL}/img/ginger.jpg` }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' }
];

const gallerySlides = [
  { id: 1, image: `${process.env.PUBLIC_URL}/img/bao1.jpg`, alt: "Baobab Restaurant Interior" },
  { id: 2, image: `${process.env.PUBLIC_URL}/img/bao2.jpg`, alt: "Traditional Senegalese Dish" },
  { id: 3, image: `${process.env.PUBLIC_URL}/img/bao3.jpg`, alt: "Chef Preparing Food" },
  { id: 4, image: `${process.env.PUBLIC_URL}/img/bao4.jpg`, alt: "Dining Experience" }
];

// Custom Hook for Cart
const useCart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('baobabCart');
    if (savedCart) setItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('baobabCart', JSON.stringify(items));
  }, [items]);

  const addItem = (name, price) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === name);
      if (existingItem) {
        return prevItems.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevItems, { name, price: parseFloat(price), quantity: 1 }];
      }
    });
  };

  const removeItem = name => setItems(prev => prev.filter(item => item.name !== name));

  const updateQuantity = (name, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(name);
      return;
    }
    setItems(prev => prev.map(item => item.name === name ? { ...item, quantity: newQuantity } : item));
  };

  const clearCart = () => setItems([]);

  const calculateTotal = () => items.reduce((total, item) => total + item.price * item.quantity, 0);
  const getTotalQuantity = () => items.reduce((total, item) => total + item.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clearCart, calculateTotal, getTotalQuantity };
};

// Header Component
const Header = ({ cartQuantity, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <h1 className="text-2xl font-bold text-primary">Baobab<span className="text-secondary">Restaurant</span></h1>
        </div>

        <nav className="hidden md:flex space-x-8">
          {['home','menu','gallery','about','contact'].map(section => (
            <button key={section} onClick={() => scrollToSection(section)} className="text-secondary font-semibold hover:text-primary capitalize">{section}</button>
          ))}
          <button onClick={onCartClick} className="cart-icon relative">
            <FaShoppingCart className="text-xl text-secondary hover:text-primary" />
            {cartQuantity>0 && <span className="cart-count">{cartQuantity}</span>}
          </button>
        </nav>

        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={onCartClick} className="cart-icon relative">
            <FaShoppingCart className="text-xl text-secondary" />
            {cartQuantity>0 && <span className="cart-count">{cartQuantity}</span>}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes className="text-xl"/> : <FaBars className="text-xl"/>}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
          <div className="flex flex-col space-y-4 px-4">
            {['home','menu','gallery','about','contact'].map(section => (
              <button key={section} onClick={() => scrollToSection(section)} className="text-secondary font-semibold hover:text-primary w-full text-left py-2 capitalize">{section}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// Hero Component
const Hero = () => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if(el) el.scrollIntoView({behavior:'smooth'});
  };

  return (
    <section id="home" className="hero min-h-screen flex items-center relative pt-20">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)'}}></div>
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Authentic Senegalese Cuisine</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Experience the vibrant flavors of Senegal at Baobab Restaurant, located in the heart of Harlem at 120 West 116th Street.</p>
        <button onClick={scrollToMenu} className="btn-primary text-lg">View Our Menu</button>
      </div>
    </section>
  );
};

// Menu Component
const Menu = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredItems = activeCategory==='all'?menuItems:menuItems.filter(item=>item.category===activeCategory);

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Menu</h2>
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map(cat=>(
            <button key={cat.id} className={`px-6 py-2 font-semibold transition-all duration-300 border-b-2 ${activeCategory===cat.id?'text-primary border-primary':'text-gray-600 border-transparent hover:text-primary hover:border-primary'}`} onClick={()=>setActiveCategory(cat.id)}>{cat.name}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item=>(
            <div key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-lg">${item.price.toFixed(2)}</span>
                  <button onClick={()=>onAddToCart(item.name,item.price)} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent transition-colors duration-300">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Component
const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = useCallback(()=>setCurrentSlide(prev=>(prev+1)%gallerySlides.length),[]);
  const prevSlide = ()=>setCurrentSlide(prev=>(prev-1+gallerySlides.length)%gallerySlides.length);
  const goToSlide = index=>setCurrentSlide(index);

  useEffect(()=>{
    const interval = setInterval(nextSlide,5000);
    return ()=>clearInterval(interval);
  },[nextSlide]);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Gallery</h2>
        <div className="max-w-4xl mx-auto relative rounded-lg overflow-hidden shadow-2xl">
          <div className="relative h-64 md:h-96 overflow-hidden">
            {gallerySlides.map((slide,index)=>(
              <div key={slide.id} className={`absolute inset-0 transition-opacity duration-500 ${index===currentSlide?'opacity-100':'opacity-0'}`}>
                <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover"/>
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"><FaChevronLeft/></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"><FaChevronRight/></button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {gallerySlides.map((_,i)=>(
              <button key={i} onClick={()=>goToSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i===currentSlide?'bg-white':'bg-white bg-opacity-50 hover:bg-opacity-75'}`}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  const scrollToContact = ()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="about-text">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 relative">Our Story<span className="absolute bottom-[-10px] left-0 w-20 h-1 bg-primary"></span></h2>
          <div className="space-y-4 text-gray-600">
            <p>Baobab Restaurant was founded in 2010 by the Diop family, who brought their cherished family recipes from Dakar to Harlem. Named after the iconic baobab tree of Senegal, our restaurant stands as a symbol of strength, community, and nourishment.</p>
            <p>Our mission is to share the rich culinary heritage of Senegal with New York City. Each dish is prepared with authentic ingredients and traditional techniques, ensuring an unforgettable dining experience that transports you to the vibrant streets of Dakar.</p>
            <p>We take pride in our commitment to quality, sourcing the freshest ingredients and preparing each meal with the same care and love that has been passed down through generations of our family.</p>
          </div>
          <button onClick={scrollToContact} className="btn-primary mt-6">Visit Us Today</button>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" alt="Chef Cooking" className="w-full rounded-lg shadow-xl"/>
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const [formData,setFormData]=useState({name:'',email:'',message:''});
  const handleChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit=e=>{e.preventDefault();alert('Thank you for your message!');setFormData({name:'',email:'',message:''});};

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Contact Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="contact-info">
            <h3 className="text-2xl font-bold text-secondary mb-6">Get In Touch</h3>
            <div className="contact-details space-y-6 mb-8">
              <div className="flex items-center"><FaMapMarkerAlt className="text-primary text-xl mr-4"/><p className="text-gray-600">120 West 116th Street, New York, NY 10026</p></div>
              <div className="flex items-center"><FaPhone className="text-primary text-xl mr-4"/><p className="text-gray-600">(212) 555-7890</p></div>
              <div className="flex items-center"><FaEnvelope className="text-primary text-xl mr-4"/><p className="text-gray-600">info@baobabrestaurant.com</p></div>
            </div>
            <div className="hours">
              <h3 className="text-2xl font-bold text-secondary mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                <p>Sunday: 12:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
          <div className="contact-form bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-secondary mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4"><label className="block text-gray-700 font-semibold mb-2">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" required/></div>
              <div className="form-group mb-4"><label className="block text-gray-700 font-semibold mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" required/></div>
              <div className="form-group mb-6"><label className="block text-gray-700 font-semibold mb-2">Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" required></textarea></div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component - FIXED
const Footer = () => (
  <footer className="bg-white py-8 border-t border-gray-200">
    <div className="container mx-auto px-4 text-center text-gray-600">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF/></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter/></a>
        <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"><FaTripadvisor/></a>
      </div>
      <p>© 2025 Baobab Restaurant. All rights reserved.</p>
    </div>
  </footer>
);

// Cart Component
const Cart = ({ cart, onClose, onRemove, onUpdateQuantity, onClearCart }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
    <div className="w-80 bg-white h-full shadow-lg p-6 relative overflow-y-auto">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 text-xl hover:text-primary"><FaTimes/></button>
      <h3 className="text-2xl font-bold text-secondary mb-4">Your Cart</h3>
      {cart.items.length===0?<p className="text-gray-600">Your cart is empty.</p>:(
        <div className="space-y-4">
          {cart.items.map(item=>(
            <div key={item.name} className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-1">
                  <button onClick={()=>onUpdateQuantity(item.name,item.quantity-1)} className="px-2 py-1 border rounded-l hover:bg-gray-100">-</button>
                  <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                  <button onClick={()=>onUpdateQuantity(item.name,item.quantity+1)} className="px-2 py-1 border rounded-r hover:bg-gray-100">+</button>
                </div>
              </div>
              <button onClick={()=>onRemove(item.name)} className="text-red-500 hover:text-red-700"><FaTrash/></button>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">Total: ${cart.calculateTotal().toFixed(2)}</div>
          <button onClick={onClearCart} className="btn-primary w-full mt-4">Clear Cart</button>
        </div>
      )}
    </div>
  </div>
);

function App() {
  const cart = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (name, price) => cart.addItem(name, price);

  return (
    <div className="App font-sans">
      <Header cartQuantity={cart.getTotalQuantity()} onCartClick={()=>setIsCartOpen(true)}/>
      <main>
        <Hero />
        <Menu onAddToCart={handleAddToCart}/>
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      {isCartOpen && <Cart cart={cart} onClose={()=>setIsCartOpen(false)} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} onClearCart={cart.clearCart}/>}
    </div>
  );
}

export default App;
