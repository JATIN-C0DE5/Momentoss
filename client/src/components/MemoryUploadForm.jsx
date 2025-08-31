import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Updated description to reflect flexible upload count */}
      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg">
          Upload your special moments with captions
        </p>
        <p className="text-sm text-gray-500 mt-2">
          You can upload up to {numberOfPhotos} memories.
        </p>
      </div>

      {/* Memory Navigation - Enhanced visual feedback */}
      <div className="flex justify-center space-x-3 mb-6">
        {Array.from({ length: numberOfPhotos }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMemoryIndex(index)}
            className={`w-12 h-12 rounded-full font-bold transition-all duration-200 ${
              currentMemoryIndex === index
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-110'
                : memories[index]?.image
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-md'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Memory Form */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Memory {currentMemoryIndex + 1} of {numberOfPhotos}
        </h3>

        {/* Image Upload */}
        <div className="mb-6">
          {!memories[currentMemoryIndex]?.image ? (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(currentMemoryIndex, e)}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all duration-200 hover:shadow-md">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">Click to upload photo</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </label>
          ) : (
            <div className="relative">
              <img
                src={memories[currentMemoryIndex].image}
                alt={`Memory ${currentMemoryIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <button
                onClick={() => removeImage(currentMemoryIndex)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Replace Image Button */}
              <label className="absolute bottom-2 left-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(currentMemoryIndex, e)}
                  className="hidden"
                />
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-white transition-colors shadow-md">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Replace
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Caption Input */}
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption for this memory (150 characters max)
          </label> */}
          <textarea
            value={memories[currentMemoryIndex]?.caption || ''}
            onChange={(e) => handleCaptionChange(currentMemoryIndex, e.target.value)}
            maxLength={150}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none shadow-sm"
            placeholder="Write a beautiful caption for this moment..."
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Share what makes this moment special
            </p>
            <p className="text-xs text-gray-500">
              {memories[currentMemoryIndex]?.caption?.length || 0}/150
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentMemoryIndex(Math.max(0, currentMemoryIndex - 1))}
          disabled={currentMemoryIndex === 0}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentMemoryIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
          }`}
        >
          Previous Memory
        </button>

        <button
          onClick={() => setCurrentMemoryIndex(Math.min(numberOfPhotos - 1, currentMemoryIndex + 1))}
          disabled={currentMemoryIndex === numberOfPhotos - 1}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentMemoryIndex === numberOfPhotos - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          Next Memory
        </button>
      </div>

      {/* Progress Summary - Updated to reflect flexible upload count */}
      <div className="text-center">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold text-pink-600">
              {memories.filter(m => m?.image && m?.caption).length}
            </span> of {numberOfPhotos} memories Uploaded
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(memories.filter(m => m?.image && m?.caption).length / numberOfPhotos) * 100}%` 
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Upload at least one memory to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoryUploadForm;