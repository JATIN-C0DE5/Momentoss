import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Camera } from 'lucide-react';

const SwipeableStack = ({ memories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextCard = () => {
    if (isAnimating) return;
    
    setDirection('right');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const prevCard = () => {
    if (isAnimating) return;
    
    setDirection('left');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  // Touch/Swipe handlers
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (!isDragging || !touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const offset = currentTouch - touchStart;
    setDragOffset(offset);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !isDragging) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getCardStyle = (index) => {
    const diff = (index - currentIndex + memories.length) % memories.length;
    const offset = isDragging ? dragOffset : 0;
    
    if (diff === 0) {
      // Current card
      return {
        transform: `translateX(${offset}px) rotate(${offset * 0.05}deg) scale(1)`,
        zIndex: 30,
        opacity: 1,
      };
    } else if (diff === 1 || (diff === memories.length - 1 && memories.length <= 3)) {
      // Next card
      return {
        transform: `translateX(${15 + offset * 0.2}px) rotate(2deg) scale(0.95)`,
        zIndex: 20,
        opacity: 0.8,
      };
    } else if (diff === 2 || (diff === memories.length - 2 && memories.length <= 4)) {
      // Card after next
      return {
        transform: `translateX(${30 + offset * 0.1}px) rotate(4deg) scale(0.9)`,
        zIndex: 10,
        opacity: 0.6,
      };
    } else {
      // Back of stack
      return {
        transform: `translateX(45px) rotate(6deg) scale(0.85)`,
        zIndex: 5,
        opacity: 0.4,
      };
    }
  };

  const getCardTransition = (index) => {
    if (isDragging && index === currentIndex) {
      return 'none';
    }
    return 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  };

  return (
    <div className="relative mb-8">
      {/* Card Stack Container */}
      <div className="relative h-[450px] w-full max-w-sm mx-auto">
        {memories.map((memory, index) => (
          <div
            key={memory.id}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
              ...getCardStyle(index),
              transition: getCardTransition(index),
            }}
            onTouchStart={index === currentIndex ? onTouchStart : undefined}
            onTouchMove={index === currentIndex ? onTouchMove : undefined}
            onTouchEnd={index === currentIndex ? onTouchEnd : undefined}
          >
            {/* Memory Card */}
            <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-amber-100"
                 style={{
                   background: 'linear-gradient(135deg, #fefbf3 0%, #fff8e7 100%)',
                   boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                 }}>
              
              {/* Polaroid-style photo */}
              <div className="p-4 pb-0">
                <div className="h-64 relative overflow-hidden rounded bg-white shadow-inner border border-amber-200">
                  <img
                    src={memory.image}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  
                  {/* Photo corner pins */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                  
                  {/* Memory Counter */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-serif font-bold text-amber-800">
                    {index + 1} of {memories.length}
                  </div>
                </div>
              </div>

              {/* Caption area */}
              <div className="p-6 pt-4 h-32 flex flex-col justify-center">
                <div className="flex items-start space-x-2">
                  <Camera className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                  <p className="text-amber-800 text-sm leading-relaxed font-serif">
                    {memory.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevCard}
        disabled={isAnimating}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isAnimating
            ? 'bg-amber-200 text-amber-400 cursor-not-allowed'
            : 'bg-white text-amber-700 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border-2 border-amber-200'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextCard}
        disabled={isAnimating}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isAnimating
            ? 'bg-amber-200 text-amber-400 cursor-not-allowed'
            : 'bg-white text-amber-700 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border-2 border-amber-200'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentIndex) {
                setDirection(index > currentIndex ? 'right' : 'left');
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setDirection(null);
                  setIsAnimating(false);
                }, 300);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-amber-600 scale-150'
                : 'bg-amber-300 hover:bg-amber-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableStack;