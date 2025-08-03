import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingCart, Plus, Minus, Star, Clock, Truck } from 'lucide-react';

function App() {
  const [page, setPage] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // navigation items
  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'foods', title: 'Foods' },
    { id: 'about', title: 'About' },
    { id: 'contact', title: 'Contact Us' },
    { id: 'login', title: 'Login' }
  ];

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price.replace('₹', '')) * item.quantity), 0).toFixed(2);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* navbar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* logo */}
            <div onClick={() => setPage('home')} className="cursor-pointer group flex items-center space-x-3">
              {/* Chef Hat Logo */}
              <div className="transform group-hover:scale-110 transition-transform duration-200">
                <svg width="40" height="40" viewBox="0 0 100 100" className="drop-shadow-sm">
                  {/* Chef Hat */}
                  <ellipse cx="50" cy="75" rx="25" ry="8" fill="#333" stroke="#000" strokeWidth="2"/>
                  <rect x="30" y="65" width="40" height="15" fill="white" stroke="#000" strokeWidth="2"/>
                  <ellipse cx="35" cy="45" rx="12" ry="15" fill="white" stroke="#000" strokeWidth="2"/>
                  <ellipse cx="50" cy="35" rx="15" ry="20" fill="white" stroke="#000" strokeWidth="2"/>
                  <ellipse cx="65" cy="45" rx="12" ry="15" fill="white" stroke="#000" strokeWidth="2"/>
                </svg>
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-200">
                Foodico
              </h1>
            </div>

            {/* desktop nav */}
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => setPage(link.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                    page === link.id 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  {link.title}
                </button>
              ))}
              
              {/* cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200"
              >
                <ShoppingCart size={20} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>

            {/* mobile button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full"
              >
                <ShoppingCart size={18} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
              <button 
                className="p-2"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* mobile dropdown */}
          {mobileMenu && (
            <div className="md:hidden py-4 border-t border-orange-100 bg-white/95 backdrop-blur-md">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    setPage(link.id);
                    setMobileMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-3 font-medium rounded-lg mx-2 my-1 transition-colors ${
                    page === link.id 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-500' 
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  {link.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* main content */}
      <div className="pt-16">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'foods' && <Foods addToCart={addToCart} />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
        {page === 'login' && <Login />}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getCartTotal={getCartTotal}
      />

      {/* footer */}
      <FooterSection />
    </div>
  );
}

// Cart Sidebar Component
function CartSidebar({ isOpen, onClose, cart, updateQuantity, removeFromCart, getCartTotal }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-orange-500 font-bold">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: ₹{getCartTotal()}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// Enhanced home page component
function Home({ setPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Welcome to Foodico!",
      subtitle: "Your favorite food ordering platform. Fast, easy, and delicious!",
      image: "https://www.partstown.com/about-us/wp-content/uploads/2023/11/what-is-considered-fast-food.jpg"
    },
    {
      title: "Fresh & Delicious",
      subtitle: "Farm-to-table ingredients in every bite. Taste the difference!",
      image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=1200&h=600&fit=crop"
    },
    {
      title: "Lightning Fast Delivery",
      subtitle: "Hot food delivered to your door in 30 minutes or less!",
      image: "https://images.unsplash.com/photo-1625938146369-adc83368bda7?w=1200&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Enhanced hero with slider */}
      <div className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl">
                <h1 className="text-6xl md:text-7xl font-black mb-6 animate-pulse">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <button 
                  onClick={() => setPage('foods')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce"
                >
                  Order Now 🚀
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced features section */}
      <div className="py-20 px-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">Why Choose Foodico?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🍕",
                title: "Fresh Food",
                description: "We serve only the freshest ingredients in all our dishes.",
                gradient: "from-green-400 to-green-600"
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Quick delivery to your doorstep in 30 minutes or less.",
                gradient: "from-blue-400 to-blue-600"
              },
              {
                icon: "💰",
                title: "Best Prices",
                description: "Affordable prices without compromising on quality.",
                gradient: "from-purple-400 to-purple-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Happy Customers", icon: "😊" },
              { number: "15min", label: "Avg Delivery Time", icon: "⏱️" },
              { number: "500+", label: "Restaurant Partners", icon: "🏪" },
              { number: "4.9★", label: "Customer Rating", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="text-4xl mb-2 group-hover:animate-pulse">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced foods page
function Foods({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced food items data with ratings and prep time
  const foodItems = [
    // Pizza
    { id: 1, name: 'Margherita Pizza', price: '₹299', category: 'pizza', image: 'https://t4.ftcdn.net/jpg/02/58/22/91/360_F_258229133_2zxdF9wx8ZcPSlJi4Z9QefBmBD3faacS.jpg', description: 'Classic pizza with tomato sauce, mozzarella and basil', rating: 4.8, prepTime: '15-20 min' },
    { id: 2, name: 'Pepperoni Pizza', price: '₹399', category: 'pizza', image: 'https://atsloanestable.com/wp-content/uploads/2023/06/new-york-style-pizza4.jpg', description: 'Delicious pizza topped with pepperoni slices', rating: 4.9, prepTime: '15-20 min' },
    { id: 3, name: 'BBQ Chicken Pizza', price: '₹449', category: 'pizza', image: 'https://media.istockphoto.com/id/489809469/photo/bbq-chicken-pizza.jpg?s=612x612&w=0&k=20&c=kB3xRU4-A7fJ9iYpIzlOqSiLX4f6OIath45yFOmqjxQ=', description: 'BBQ sauce, grilled chicken, red onions and cheese', rating: 4.7, prepTime: '20-25 min' },

    // Burgers
    { id: 4, name: 'Maharaja Burger', price: '₹249', category: 'burgers', image: 'https://format.creatorcdn.com/82e7e427-0a83-4e9c-b15d-a74f62494c6e/0/0/0/0,0,1600,1600,700,1600/0-0-0/04669a4a-348c-4022-8f9d-b4c0a0c19aad/1/1/McDonalds+Chicken+Maharaja+Mac+Burger.jpg?fjkss=exp=2061619648~hmac=325891bcc069defb60721bd1bf2bfc8eb223489e9af52dd70da873c9f7fa9691', description: 'Juicy beef patty with lettuce, tomato and pickles', rating: 4.6, prepTime: '10-15 min' },
    { id: 5, name: 'Chicken Burger', price: '₹199', category: 'burgers', image: 'https://media.istockphoto.com/id/652832752/photo/fried-chicken-burger.jpg?s=612x612&w=0&k=20&c=EendRCleaNpkKOUiOplgStACHh_8IyHYzjbzcByGC_4=', rating: 4.5, prepTime: '10-15 min' },
    { id: 6, name: 'Double Cheese Burger', price: '₹329', category: 'burgers', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=200&fit=crop', description: 'Double beef patty with double cheese and bacon', rating: 4.8, prepTime: '15-20 min' },

    // Chicken
    { id: 7, name: 'Fried Chicken Wings', price: '₹179', category: 'chicken', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop', description: '8 pieces of crispy fried chicken wings', rating: 4.7, prepTime: '12-18 min' },
    { id: 8, name: 'Chicken Tenders', price: '₹159', category: 'chicken', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop', description: 'Crispy chicken tenders with dipping sauce', rating: 4.6, prepTime: '10-15 min' },
    { id: 9, name: 'Spicy Chicken Sandwich', price: '₹219', category: 'chicken', image: 'https://static.vecteezy.com/system/resources/thumbnails/053/876/749/small/delicious-chicken-sandwich-served-with-fresh-vegetables-on-a-wooden-table-with-tomatoes-in-the-background-photo.jpeg', description: 'Spicy fried chicken breast in a toasted bun', rating: 4.9, prepTime: '12-18 min' },

    // Desserts
    { id: 10, name: 'Chocolate Cake', price: '₹129', category: 'desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop', description: 'Rich chocolate cake with chocolate frosting', rating: 4.8, prepTime: '5-10 min' },
    { id: 11, name: 'Cheesecake', price: '₹149', category: 'desserts', image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=200&fit=crop', description: 'Creamy New York style cheesecake', rating: 4.9, prepTime: '5-10 min' },
    { id: 12, name: 'Ice Cream Sundae', price: '₹99', category: 'desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop', description: 'Vanilla ice cream with chocolate sauce and nuts', rating: 4.5, prepTime: '3-5 min' }
  ];

  const categories = [
    { id: 'all', name: 'All Items', emoji: '🍽️' },
    { id: 'pizza', name: 'Pizza', emoji: '🍕' },
    { id: 'burgers', name: 'Burgers', emoji: '🍔' },
    { id: 'chicken', name: 'Chicken', emoji: '🍗' },
    { id: 'desserts', name: 'Desserts', emoji: '🍰' }
  ];

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-orange-50 to-red-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Our Food Menu 🍽️
        </h1>
        
        {/* Search bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none shadow-lg"
          />
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200'
              }`}
            >
              {category.emoji} {category.name}
            </button>
          ))}
        </div>

        {/* Food items grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-orange-100">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm font-bold">{item.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <span className="text-orange-500 font-black text-xl">{item.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Clock size={14} />
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Truck size={14} />
                    <span>Free delivery</span>
                  </div>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <p className="text-gray-500 text-xl">No items found. Try a different search or category!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced about us page
function About() {
  return (
    <div className="py-16 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          About Foodico 🍕
        </h1>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-100">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl mb-8 leading-relaxed text-gray-700">
              Foodico started in 2020 with a simple mission: to make ordering food online 
              as easy and enjoyable as possible. We believe that everyone deserves access 
              to delicious, fresh food delivered right to their door. 🚀
            </p>
            <p className="text-xl mb-12 leading-relaxed text-gray-700">
              Our team works hard every day to partner with the best local restaurants 
              and ensure that your food arrives hot, fresh, and on time. We're not just 
              a food delivery service - we're your neighbors who care about bringing 
              great food to your table. ❤️
            </p>
          </div>
          
          {/* Enhanced mission and vision */}
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8 border-l-4 border-orange-500">
              <h3 className="text-3xl font-black mb-6 text-orange-600">🎯 Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To connect people with great food and make dining experiences 
                more convenient and enjoyable for everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 border-l-4 border-blue-500">
              <h3 className="text-3xl font-black mb-6 text-blue-600">🔮 Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the most trusted food delivery platform that brings 
                communities together through the love of food.
              </p>
            </div>
          </div>

          {/* Team values */}
          <div className="mt-16">
            <h3 className="text-3xl font-black text-center mb-12 text-gray-800">Our Values ⭐</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🤝", title: "Trust", description: "Building lasting relationships with our customers and partners" },
                { icon: "⚡", title: "Speed", description: "Delivering excellence at lightning speed" },
                { icon: "💯", title: "Quality", description: "Never compromising on the quality of food or service" }
              ].map((value, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced contact page
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Contact Us 📞
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* contact info */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch 💬</h2>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                <div className="bg-orange-500 p-3 rounded-full mr-4">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-600">Phone</p>
                  <p className="text-lg font-bold">+91 1234567890</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-600">Email</p>
                  <p className="text-lg font-bold">foodico123@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-xl">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-600">Address</p>
                  <p className="text-lg font-bold">123 Chatori Gali,Lucknow,Uttarpradesh</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Business Hours ⏰</h3>
              <p className="text-gray-700 font-medium">Monday - Sunday: 9:00 AM - 11:00 PM</p>
              <p className="text-sm text-gray-600 mt-2">We're here to serve you every day!</p>
            </div>
          </div>

          {/* contact form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Send us a Message ✉️</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-3">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-3">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-3">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32 resize-none transition-all"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Send Message 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

//  login form
function Login() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  function updateForm(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }

  function submitForm(e) {
    e.preventDefault();
    console.log('User login:', userInfo);
    alert('Welcome back! Login feature coming soon! 🎉');
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-orange-50 to-red-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-600">Login to your Foodico account</p>
          </div>
          
          <form onSubmit={submitForm} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-3">Email</label>
              <input 
                type="email" 
                name="email"
                value={userInfo.email}
                onChange={updateForm}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-3">Password</label>
              <input 
                type="password" 
                name="password"
                value={userInfo.password}
                onChange={updateForm}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Login 🚀
            </button>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account? 
              <a href="#" className="text-orange-500 font-bold hover:text-orange-600 ml-1">
                Sign up here! ✨
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// footer with reviews
function FooterSection() {
  const customerReviews = [
    {
      name: "Priya Sharma",
      stars: 5,
      review: "Amazing food and super fast delivery! Will definitely order again. 🔥",
      avatar: "👩‍💼"
    },
    {
      name: "Arjun Patel", 
      stars: 5,
      review: "Best pizza in town! Hot and fresh every time. 🍕",
      avatar: "👨‍💻"
    },
    {
      name: "Sneha Gupta",
      stars: 4,
      review: "Great variety of restaurants and easy to use app. 📱",
      avatar: "👩‍🎓"
    },
    {
      name: "Raj Kumar",
      stars: 5,
      review: "Excellent customer service and always on time delivery. ⏰",
      avatar: "👨‍🍳"
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* reviews section */}
        <div className="mb-12">
          <h3 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            What Our Customers Say ⭐
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerReviews.map((review, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{review.avatar}</div>
                  <h4 className="font-bold">{review.name}</h4>
                </div>
                {/* star rating */}
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`text-xl ${star <= review.stars ? 'text-yellow-400' : 'text-gray-500'}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* footer info */}
        <div className="border-t border-gray-600 pt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                🍕 Foodico
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your favorite food delivery platform. Fast, fresh, and delicious! 
                Join thousands of happy customers! 🎉
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Quick Links 🔗</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">📖 About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">📞 Contact</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">📋 Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">🔒 Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Contact Info 📍</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91 1234567890</p>
                <p>📧 foodico123@gmail.com</p>
                <p>📍 123 Food Street, Tasty City</p>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-500">Follow us on social media! 📱</p>
              </div>
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Foodico. All rights reserved. Made with ❤️ for food lovers!</p>
        </div>
      </div>
    </footer>
  );
}

export default App;