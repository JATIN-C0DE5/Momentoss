import { useState } from 'react';
import { Search, Heart, Users, Home } from 'lucide-react';

const CardGrid = ({ selectedDesign, onSelectDesign }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const designs = [
    {
      id: 1,
      name: 'Romantic Hearts',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop',
      category: 'couples',
      colors: ['#DC143C', '#F28B82']
    },
    {
      id: 2,
      name: 'Sunset Love',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop',
      category: 'couples',
      colors: ['#F28B82', '#FFF8E7']
    },
    {
      id: 3,
      name: 'Friendship Goals',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=600&fit=crop',
      category: 'friends',
      colors: ['#DC143C', '#F28B82']
    },
    {
      id: 4,
      name: 'Adventure Buddies',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop',
      category: 'friends',
      colors: ['#F28B82', '#5D4037']
    },
    {
      id: 5,
      name: 'Family Love',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=600&fit=crop',
      category: 'family',
      colors: ['#DC143C', '#5D4037']
    },
    {
      id: 6,
      name: 'Mom & Dad',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=600&fit=crop',
      category: 'family',
      colors: ['#F28B82', '#DC143C']
    },
    {
      id: 7,
      name: 'Minimalist Love',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=600&fit=crop',
      category: 'couples',
      colors: ['#FFF8E7', '#F28B82']
    },
    {
      id: 8,
      name: 'Squad Goals',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop',
      category: 'friends',
      colors: ['#DC143C', '#5D4037']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Designs', icon: null },
    { id: 'couples', name: 'Couples', icon: Heart },
    { id: 'friends', name: 'Friends', icon: Users },
    { id: 'family', name: 'Family', icon: Home }
  ];

  const filteredDesigns = designs.filter((design) => {
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-red-600 mr-3 animate-pulse" fill="currentColor" />
          <h3 className="text-3xl font-bold text-amber-900">Choose Design</h3>
          <Heart className="w-8 h-8 text-red-600 ml-3 animate-pulse" fill="currentColor" />
        </div>
        <p className="text-amber-800 leading-relaxed">Select a design that matches your story</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-6 h-6" />
        <input
          type="text"
          placeholder="Search designs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-500 bg-white/80 text-amber-900 font-medium shadow-lg transition-all duration-300 placeholder-amber-600"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 shadow-red-600/30 scale-105'
                  : 'bg-white/80 text-amber-900 hover:bg-red-50 hover:text-red-600 hover:shadow-xl border-2 border-red-200'
              }`}
            >
              {Icon && <Icon className="w-5 h-5 mr-2" />}
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Design Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            onClick={() => onSelectDesign(design)}
            className={`cursor-pointer group relative overflow-hidden rounded-3xl transition-all duration-500 shadow-xl ${
              selectedDesign?.id === design.id
                ? 'ring-4 ring-red-600 ring-offset-4 ring-offset-yellow-50 scale-105 shadow-2xl shadow-red-600/30'
                : 'hover:scale-105 hover:shadow-2xl hover:shadow-red-400/20'
            }`}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={design.image}
                alt={design.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${design.colors[0]}99 0%, ${design.colors[1]}99 100%)`
                }}
              />
              
              {/* Selected Indicator */}
              {selectedDesign?.id === design.id && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center shadow-lg border-2 border-red-600">
                  <Heart className="w-4 h-4 text-red-600" fill="currentColor" />
                </div>
              )}
              
              {/* Design Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-yellow-50/90 backdrop-blur-sm rounded-2xl p-3 border border-red-200/30 shadow-lg">
                  <h3 className="font-bold text-amber-900 text-sm leading-tight text-center">{design.name}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDesigns.length === 0 && (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-red-300 mx-auto mb-4" />
          <p className="text-xl text-amber-800 mb-2">No designs found matching your criteria</p>
          <p className="text-amber-700">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};

export default CardGrid;