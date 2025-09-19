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
    <div className="space-y-10">
      {/* Sweet Message Section - Primary focus */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-8 h-8 text-red-600 mr-3" />
          <h4 className="text-2xl font-bold text-amber-900">
            Sweet Message
          </h4>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-amber-800">
            Write your heartfelt message to the recipient
          </label>
          <textarea
            value={sweetMessage}
            onChange={(e) => onSweetMessageChange(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none shadow-sm"
            placeholder="Default Message : These memories are just the beginning of our story. Every day with you adds another beautiful chapter to the book of our love."
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-amber-700">
               
            </p>
            <p className="text-xs text-amber-700">
              {sweetMessage.length}/5000 characters
            </p>
          </div>
        </div>
      </div>

      {/* Links Section - Enclosed in beautiful container */}
      <div className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl p-8 border-2 border-red-200 shadow-lg">
        <div className="text-center mb-3">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 text-red-600 mr-3" />
            <h4 className="text-2xl font-bold text-amber-900">
              Special Links
              <span className="ml-6 px-3 py-1 bg-red-200 text-red-800 text-xs font-medium rounded-full">
              Optional
            </span>
            </h4>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block text-sm font-medium text-amber-800">
            Add links to songs, movies, or something
          </label>

        {/* Song Link */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h5 className="text-lg font-bold text-amber-900">Dedicate a Song</h5>
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
            <h5 className="text-lg font-bold text-amber-900">Dedicate a Movie/Video</h5>
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
            <h5 className="text-lg font-bold text-amber-900">Other Special Link</h5>
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
      
    </div>
    </div>
  );
};

export default LinksForm;