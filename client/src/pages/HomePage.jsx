import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Gift, Smartphone, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [currentCard, setCurrentCard] = useState(0);
  
  // Card animation rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 3);
    }, 2500);
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative px-4 py-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Decorative hearts */}
          <div className="absolute top-10 left-10 w-6 h-6 text-red-300 opacity-60 animate-pulse">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
          <div className="absolute top-20 right-20 w-4 h-4 text-red-400 opacity-40 animate-bounce">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
          <div className="absolute bottom-32 left-20 w-5 h-5 text-red-300 opacity-50 animate-pulse">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-red-600 via-red-400 to-amber-800 bg-clip-text text-transparent">
              Moments
            </span>
            <br />
            <span className="text-amber-900">Made Forever</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-amber-800 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Cute & Modern gift, Perfect for couples, friends, and family members.
          </p>

          {/* Animated Card Stack */}
          <div className="relative w-72 h-96 mx-auto mb-16">
            <div className="absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`absolute w-52 h-80 rounded-3xl shadow-2xl transition-all duration-1000 transform border-2 border-red-200/30 ${
                    currentCard === index
                      ? 'z-30 rotate-0 scale-100 shadow-red-600/30'
                      : currentCard === (index + 1) % 3
                      ? 'z-20 rotate-6 scale-95 translate-x-8 shadow-red-400/20'
                      : 'z-10 rotate-12 scale-90 translate-x-16 shadow-red-300/20'
                  }`}
                  style={{
                    background: index === 0 
                      ? 'linear-gradient(135deg, #DC143C 0%, #F28B82 50%, #5D4037 100%)'
                      : index === 1
                      ? 'linear-gradient(135deg, #F28B82 0%, #DC143C 50%, #FFF8E7 100%)'
                      : 'linear-gradient(135deg, #5D4037 0%, #DC143C 50%, #F28B82 100%)'
                  }}
                >
                  <div className="p-8 h-full flex flex-col justify-between text-yellow-50 relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute top-4 right-4 w-8 h-8 opacity-30">
                      <Heart className="w-full h-full" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 opacity-20">
                      <Heart className="w-full h-full" fill="currentColor" />
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Heart className="w-8 h-8" fill="currentColor" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">Memory Card</h3>
                      <p className="text-sm opacity-90">Your story in a tap</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-medium">Tap to unlock memories</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative">
            <Link
              to="/cards"
              className="inline-flex items-center px-10 py-5 mb-8 bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 font-bold rounded-full text-xl shadow-2xl hover:shadow-red-600/50 transform hover:scale-110 transition-all duration-300 shadow-red-600/30"
            >
              <Gift className="w-7 h-7 mr-3 " />
              Create Your Card
              <ArrowRight className="w-7 h-7 ml-3" />
            </Link>
            
            {/* Floating hearts around button */}
            <div className="absolute -top-2 -left-2 w-4 h-4 text-red-600 animate-ping">
              <Heart className="w-full h-full" fill="currentColor" />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 text-red-600 animate-ping animation-delay-1000">
              <Heart className="w-full h-full" fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-red-600 mr-3 animate-pulse" fill="currentColor" />
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900">
                How It Works
              </h2>
              <Heart className="w-8 h-8 text-red-600 ml-3 animate-pulse" fill="currentColor" />
            </div>
            <p className="text-xl text-amber-800">Three simple steps to create lasting memories</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105 border border-red-200/30">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-600/30">
                <span className="text-yellow-50 font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-900">Choose & Create</h3>
              <p className="text-amber-800 leading-relaxed">Select a beautiful design and upload your precious memories with heartfelt captions</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105 border border-red-200/30">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-600/30">
                <Smartphone className="w-10 h-10 text-yellow-50" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-900">NFC Magic</h3>
              <p className="text-amber-800 leading-relaxed">We lovingly embed your memory link into a beautiful NFC card and ship it with care</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105 border border-red-200/30">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-600/30">
                <Heart className="w-10 h-10 text-yellow-50" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-900">Share Joy</h3>
              <p className="text-amber-800 leading-relaxed">Your loved one taps the card on their phone to unlock your beautiful memory page</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-red-600 mr-3 animate-pulse" fill="currentColor" />
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900">
                Featured Designs
              </h2>
              <Heart className="w-8 h-8 text-red-600 ml-3 animate-pulse" fill="currentColor" />
            </div>
            <p className="text-xl text-amber-800">Handcrafted templates for every relationship</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredDesigns.map((design, index) => (
              <div key={design.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-red-600/30 transition-all duration-500 transform group-hover:scale-105 border-2 border-red-200/30">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-red-600/20 to-transparent" />
                  
                  {/* Floating heart */}
                  <div className="absolute top-4 right-4 w-8 h-8 text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Heart className="w-full h-full" fill="currentColor" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold border border-white/30">
                        {design.category}
                      </span>
                      <Heart className="w-6 h-6 animate-pulse" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold">{design.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/cards"
              className="inline-flex items-center px-8 py-4 border-3 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-600 hover:text-yellow-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-600/30"
            >
              <Heart className="w-6 h-6 mr-3" />
              View All Designs
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
          <div className="absolute top-32 right-20 w-16 h-16">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-50 mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-xl text-red-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Turn your precious moments into an unforgettable gift that will touch hearts forever
          </p>
          <Link
            to="/cards"
            className="inline-flex items-center px-10 py-5 bg-yellow-50 text-red-600 font-bold rounded-full text-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 shadow-xl"
          >
            <Heart className="w-7 h-7 mr-3" fill="currentColor" />
            Start Creating Now
            <ArrowRight className="w-7 h-7 ml-3" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;