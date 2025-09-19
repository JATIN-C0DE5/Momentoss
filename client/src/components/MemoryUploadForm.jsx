import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Heart } from 'lucide-react';

const MemoryUploadForm = ({ memories, numberOfPhotos, onMemoriesChange }) => {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMemories = [...memories];
        newMemories[index] = {
          ...newMemories[index],
          image: e.target.result,
          file: file // Store file for actual upload when backend is ready
        };
        onMemoriesChange(newMemories);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (index, caption) => {
    const newMemories = [...memories];
    newMemories[index] = {
      ...newMemories[index],
      caption: caption
    };
    onMemoriesChange(newMemories);
  };

  const removeImage = (index) => {
    const newMemories = [...memories];
    newMemories[index] = {
      ...newMemories[index],
      image: null,
      file: null
    };
    onMemoriesChange(newMemories);
  };

  // Initialize memories array if empty - now supports up to 5 memories
  if (memories.length < numberOfPhotos) {
    const newMemories = [...memories];
    for (let i = memories.length; i < numberOfPhotos; i++) {
      newMemories.push({ image: null, caption: '', file: null });
    }
    onMemoriesChange(newMemories);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-red-600 mr-3 animate-pulse" fill="currentColor" />
          <h3 className="text-3xl font-bold text-amber-900">Capture Your Memories</h3>
          <Heart className="w-8 h-8 text-red-600 ml-3 animate-pulse" fill="currentColor" />
        </div>
        <p className="text-amber-800 text-lg leading-relaxed">
          Upload up to {numberOfPhotos} special moments with beautiful captions
        </p>
        
      </div>

      {/* Memory Navigation */}
      <div className="flex justify-center space-x-3 mb-8">
        {Array.from({ length: numberOfPhotos }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMemoryIndex(index)}
            className={`relative w-16 h-16 rounded-full font-bold text-lg transition-all duration-300 shadow-xl ${
              currentMemoryIndex === index
                ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 transform scale-125 shadow-red-600/50'
                : memories[index]?.image
                ? 'bg-gradient-to-r from-green-500 to-green-400 text-white hover:from-green-600 hover:to-green-500 hover:scale-110 shadow-green-500/30'
                : 'bg-white text-amber-900 hover:bg-red-50 hover:text-red-600 hover:scale-110 border-2 border-red-200'
            }`}
          >
            {index + 1}
            {memories[index]?.image && currentMemoryIndex !== index && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-600 to-red-400 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" fill="currentColor" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Current Memory Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 border-2 border-red-200/30 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-amber-900 mb-2">
            Memory {currentMemoryIndex + 1} of {numberOfPhotos}
          </h3>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          {!memories[currentMemoryIndex]?.image ? (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(currentMemoryIndex, e)}
                className="hidden"
              />
              <div className="border-3 border-dashed border-red-300 rounded-3xl p-12 text-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all duration-300 hover:shadow-lg bg-white/50">
                <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Upload className="w-10 h-10 text-red-600" />
                </div>
                <p className="text-amber-900 font-bold text-xl mb-3">Click to upload your memory</p>
                <p className="text-amber-700">PNG, JPG up to 10MB</p>
              </div>
            </label>
          ) : (
            <div className="relative">
              <img
                src={memories[currentMemoryIndex].image}
                alt={`Memory ${currentMemoryIndex + 1}`}
                className="w-full h-80 object-cover rounded-3xl shadow-2xl border-2 border-red-200/30"
              />
              <button
                onClick={() => removeImage(currentMemoryIndex)}
                className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full flex items-center justify-center hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-xl hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Replace Image Button */}
              <label className="absolute bottom-4 left-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(currentMemoryIndex, e)}
                  className="hidden"
                />
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center text-amber-900">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Replace
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Caption Input */}
        <div>
          <label className="block text-lg font-bold text-amber-900 mb-4 text-center">
            Caption this beautiful memory
          </label>
          <textarea
            value={memories[currentMemoryIndex]?.caption || ''}
            onChange={(e) => handleCaptionChange(currentMemoryIndex, e.target.value)}
            maxLength={150}
            rows={4}
            className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-500 resize-none shadow-lg bg-white/80 text-amber-900 font-medium transition-all duration-300"
            placeholder="Share what makes this moment special..."
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-600 mr-2" fill="currentColor" />
              <p className="text-sm text-amber-700">
                {/*  */}
              </p>
            </div>
            <p className="text-sm text-amber-700 font-medium">
              {memories[currentMemoryIndex]?.caption?.length || 0}/150
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentMemoryIndex(Math.max(0, currentMemoryIndex - 1))}
          disabled={currentMemoryIndex === 0}
          className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
            currentMemoryIndex === 0
              ? 'bg-red-200 text-red-400 cursor-not-allowed'
              : 'bg-white text-amber-900 hover:bg-red-50 hover:text-red-600 hover:shadow-xl hover:scale-105 border-2 border-red-200'
          }`}
        >
          Previous Memory
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-amber-800 font-medium text-lg">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>

        <button
          onClick={() => setCurrentMemoryIndex(Math.min(numberOfPhotos - 1, currentMemoryIndex + 1))}
          disabled={currentMemoryIndex === numberOfPhotos - 1}
          className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
            currentMemoryIndex === numberOfPhotos - 1
              ? 'bg-red-200 text-red-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 hover:shadow-xl hover:scale-105 shadow-red-600/30'
          }`}
        >
          Next Memory
        </button>
      </div>

      {/* Progress Summary */}
      <div className="text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-red-200/30">
          <p className="text-sm text-amber-700 mt-3 mb-3 font-medium">
            Upload at least one memory to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoryUploadForm;