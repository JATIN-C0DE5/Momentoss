import { useState } from 'react';
import { Heart, Music, Film, Link, MessageCircle } from 'lucide-react';

const LinksForm = ({ links, sweetMessage, onLinksChange, onSweetMessageChange }) => {
  // Handle link changes
  const handleLinkChange = (type, value) => {
    onLinksChange({
      ...links,
      [type]: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      {/* <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Add Your Personal Touch
        </h3>
        <p className="text-gray-600">
          Write a heartfelt message and optionally add special links to make this card even more memorable
        </p>
      </div> */}

      {/* Sweet Message Section - Primary focus */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-8 h-8 text-purple-600 mr-3" />
          <h4 className="text-2xl font-bold text-gray-800">
            Sweet Message
          </h4>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Write your heartfelt message to the recipient
          </label>
          <textarea
            value={sweetMessage}
            onChange={(e) => onSweetMessageChange(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none shadow-sm"
            placeholder="This card is filled with our beautiful memories together. Each photo tells a story of love, laughter, and the special moments we've shared...
"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
               
            </p>
            <p className="text-xs text-gray-500">
              {sweetMessage.length}/500 characters
            </p>
          </div>
        </div>
      </div>

      {/* Links Section - Enclosed in beautiful container */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border-2 border-purple-200 shadow-lg">
        <div className="text-center mb-3">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 text-purple-600 mr-3" />
            <h4 className="text-2xl font-bold text-gray-800">
              Special Links
              <span className="ml-6 px-3 py-1 bg-purple-200 text-purple-800 text-xs font-medium rounded-full">
              Optional
            </span>
            </h4>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block text-sm font-medium text-gray-700">
            Add links to songs, movies, or something
          </label>

        {/* Song Link */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h5 className="text-lg font-bold text-gray-800">Dedicate a Song</h5>
          </div>
          <input
            type="url"
            value={links.song}
            onChange={(e) => handleLinkChange('song', e.target.value)}
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="eg : https://open.spotify.com/..."
          />
          <p className="text-sm text-green-700 mt-2">
            Spotify / Yt Music / Apple Music Link
          </p>
        </div>

        {/* Movie Link */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <Film className="w-5 h-5 text-white" />
            </div>
            <h5 className="text-lg font-bold text-gray-800">Dedicate a Movie/Video</h5>
          </div>
          <input
            type="url"
            value={links.movie}
            onChange={(e) => handleLinkChange('movie', e.target.value)}
            className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="eg : https://netflix.com/..."
          />
          <p className="text-sm text-red-700 mt-2">
            Link to any movie or video
          </p>
        </div>

        {/* Other Link */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <Link className="w-5 h-5 text-white" />
            </div>
            <h5 className="text-lg font-bold text-gray-800">Other Special Link</h5>
          </div>
          <input
            type="url"
            value={links.other}
            onChange={(e) => handleLinkChange('other', e.target.value)}
            className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="eg : insta reel, Gdrive link"
          />
          <p className="text-sm text-blue-700 mt-2">
            Share link of your choice
          </p>
        </div>

        
      </div>

      {/* Summary */}
      
    </div>
  </div>
  );
};

export default LinksForm;