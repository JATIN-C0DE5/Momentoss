import { Music, Film, Link as LinkIcon } from 'lucide-react';

const LinksForm = ({ links, onLinksChange }) => {
  const handleLinkChange = (type, value) => {
    onLinksChange({
      ...links,
      [type]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        
        <p className="text-gray-600">
          Share songs, movies, or other special links that hold meaning for you both
        </p>
      </div>

      {/* Song Link */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Your Special Song</h4>
            <p className="text-sm text-gray-600">Spotify, YouTube, Apple Music, etc.</p>
          </div>
        </div>
        <input
          type="url"
          value={links.song}
          onChange={(e) => handleLinkChange('song', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="https://open.spotify.com/track/..."
        />
      </div>

      {/* Movie Link */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Your Special Movie</h4>
            <p className="text-sm text-gray-600">Netflix, YouTube, IMDb, etc.</p>
          </div>
        </div>
        <input
          type="url"
          value={links.movie}
          onChange={(e) => handleLinkChange('movie', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://www.netflix.com/title/..."
        />
      </div>

      {/* Other Link */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-3">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-3">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Other Special Link</h4>
            <p className="text-sm text-gray-600">Photos, videos, website, or anything special</p>
          </div>
        </div>
        <input
          type="url"
          value={links.other}
          onChange={(e) => handleLinkChange('other', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="https://drive.google.com/..."
        />
      </div>

      {/* Link Preview */}
      {(links.song || links.movie || links.other) && (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-4">Link Preview</h4>
          <div className="space-y-3">
            {links.song && (
              <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                <Music className="w-5 h-5 text-pink-500 mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">Special Song</p>
                  <p className="text-sm text-gray-600 truncate">{links.song}</p>
                </div>
              </div>
            )}
            {links.movie && (
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Film className="w-5 h-5 text-blue-500 mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">Special Movie</p>
                  <p className="text-sm text-gray-600 truncate">{links.movie}</p>
                </div>
              </div>
            )}
            {links.other && (
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <LinkIcon className="w-5 h-5 text-green-500 mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">Special Link</p>
                  <p className="text-sm text-gray-600 truncate">{links.other}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinksForm;