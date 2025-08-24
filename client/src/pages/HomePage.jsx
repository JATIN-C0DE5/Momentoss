import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Gift, Smartphone, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [currentCard, setCurrentCard] = useState(0);
  
  // Card animation rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const featuredDesigns = [
    {
      id: 1,
      name: 'Romantic Hearts',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop',
      category: 'Couples'
    },
    {
      id: 2,
      name: 'Friendship Goals',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=600&fit=crop',
      category: 'Friends'
    },
    {
      id: 3,
      name: 'Family Love',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=600&fit=crop',
      category: 'Family'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Moments
            </span>
            <br />
            <span className="text-gray-800">Made Forever</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Personalized NFC gift cards. Perfect for couples, friends, and family moments.
          </p>

          {/* Animated Card Stack */}
          <div className="relative w-64 h-96 mx-auto mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`absolute w-48 h-72 rounded-3xl shadow-2xl transition-all duration-1000 transform ${
                    currentCard === index
                      ? 'z-30 rotate-0 scale-100'
                      : currentCard === (index + 1) % 3
                      ? 'z-20 rotate-6 scale-95 translate-x-8'
                      : 'z-10 rotate-12 scale-90 translate-x-16'
                  }`}
                  style={{
                    background: index === 0 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : index === 1
                      ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                      : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between text-white">
                    <div className="text-center">
                      <Heart className="w-12 h-12 mx-auto mb-4 opacity-80" />
                      <h3 className="font-bold text-lg">Memory Card</h3>
                    </div>
                    <div className="text-center text-sm opacity-75">
                      Tap to unlock memories
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/cards"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Gift className="w-6 h-6 mr-2" />
            Create Your Card
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 py-20 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Choose & Create</h3>
              <p className="text-gray-600">Select a design and upload your precious memories with personalized captions</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">NFC Magic</h3>
              <p className="text-gray-600">We embed your memory link into a beautiful NFC card and ship it to you</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Share Joy</h3>
              <p className="text-gray-600">Recipient taps the card on their phone to unlock your beautiful memory page</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Featured Designs
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredDesigns.map((design) => (
              <div key={design.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-2">
                      {design.category}
                    </span>
                    <h3 className="text-xl font-bold">{design.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/cards"
              className="inline-flex items-center px-6 py-3 border-2 border-pink-500 text-pink-500 font-bold rounded-full hover:bg-pink-500 hover:text-white transition-colors"
            >
              View All Designs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;