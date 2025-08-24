import { useState } from 'react';
import { Search, Heart, Users, Home } from 'lucide-react';

const CardGrid = ({ selectedDesign, onSelectDesign }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // TODO: Replace with API call when backend is ready
  const designs = [
    {
      id: 1,
      name: 'Romantic Hearts',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop',
      category: 'couples',
      colors: ['#FF6B9D', '#C44569']
    },
    {
      id: 2,
      name: 'Sunset Love',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop',
      category: 'couples',
      colors: ['#FF9A9E', '#FECFEF']
    },
    {
      id: 3,
      name: 'Friendship Goals',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=600&fit=crop',
      category: 'friends',
      colors: ['#A8EDEA', '#FED6E3']
    },
    {
      id: 4,
      name: 'Adventure Buddies',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop',
      category: 'friends',
      colors: ['#FAD0C4', '#FFD1FF']
    },
    {
      id: 5,
      name: 'Family Love',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=600&fit=crop',
      category: 'family',
      colors: ['#667eea', '#764ba2']
    },
    {
      id: 6,
      name: 'Mom & Dad',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=600&fit=crop',
      category: 'family',
      colors: ['#f093fb', '#f5576c']
    },
    {
      id: 7,
      name: 'Minimalist Love',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=600&fit=crop',
      category: 'couples',
      colors: ['#4facfe', '#00f2fe']
    },
    {
      id: 8,
      name: 'Squad Goals',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop',
      category: 'friends',
      colors: ['#43e97b', '#38f9d7']
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
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search designs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Design Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            onClick={() => onSelectDesign(design)}
            className={`cursor-pointer group relative overflow-hidden rounded-xl transition-all duration-300 ${
              selectedDesign?.id === design.id
                ? 'ring-4 ring-pink-500 ring-offset-2 scale-105'
                : 'hover:scale-105 hover:shadow-lg'
            }`}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={design.image}
                alt={design.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `linear-gradient(135deg, ${design.colors[0]} 0%, ${design.colors[1]} 100%)`
                }}
              />
              
              {/* Selected Indicator */}
              {selectedDesign?.id === design.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              )}
              
              {/* Design Name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-medium text-sm leading-tight">{design.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDesigns.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No designs found matching your criteria.</p>
          <p className="text-sm mt-2">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default CardGrid;