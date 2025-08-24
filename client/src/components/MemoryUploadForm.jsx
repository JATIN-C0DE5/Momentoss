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

  // Initialize memories array if empty
  if (memories.length < numberOfPhotos) {
    const newMemories = [...memories];
    for (let i = memories.length; i < numberOfPhotos; i++) {
      newMemories.push({ image: null, caption: '', file: null });
    }
    onMemoriesChange(newMemories);
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Upload {numberOfPhotos} special moments with captions that tell your story
        </p>
      </div>

      {/* Memory Navigation */}
      <div className="flex justify-center space-x-2 mb-6">
        {Array.from({ length: numberOfPhotos }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMemoryIndex(index)}
            className={`w-10 h-10 rounded-full font-bold transition-colors ${
              currentMemoryIndex === index
                ? 'bg-pink-500 text-white'
                : memories[index]?.image
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Memory Form */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-colors">
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
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(currentMemoryIndex)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
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
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-white transition-colors">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Replace
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Caption Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption for this memory (150 characters max)
          </label>
          <textarea
            value={memories[currentMemoryIndex]?.caption || ''}
            onChange={(e) => handleCaptionChange(currentMemoryIndex, e.target.value)}
            maxLength={150}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
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
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            currentMemoryIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous Memory
        </button>

        <button
          onClick={() => setCurrentMemoryIndex(Math.min(numberOfPhotos - 1, currentMemoryIndex + 1))}
          disabled={currentMemoryIndex === numberOfPhotos - 1}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            currentMemoryIndex === numberOfPhotos - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }`}
        >
          Next Memory
        </button>
      </div>

      {/* Progress Summary */}
      <div className="text-center text-sm text-gray-600">
        <p>
          {memories.filter(m => m?.image && m?.caption).length} of {numberOfPhotos} memories completed
        </p>
      </div>
    </div>
  );
};

export default MemoryUploadForm;