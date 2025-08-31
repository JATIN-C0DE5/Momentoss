import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SwipeableStack from '../components/SwipeableStack.jsx';
import { Lock, Heart, Music, Film, Link as LinkIcon, ArrowRight, Feather } from 'lucide-react';
import getGiftCard from "../appwrite/get.js"
const RecipientPage = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const [pinEntered, setPinEntered] = useState(false);
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardData, setCardData] = useState(null);


  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res= await getGiftCard(hash,pin);
      if (!res.authenticated) {
        setError('Invalid PIN. Please try again.');
        setIsLoading(false);
        return; 
      } 
     
  const doc = res.doc;
  console.log("Fetched document:", doc);

  // build frontend-compatible structure
  const formattedCard = {
    senderName: doc.name,
    recipientName: doc.recipient,
    msg :doc.usr_msg,
    memories: (doc.image_paths || []).map((path, idx) => ({
      id: idx + 1,
      image: path,
      caption: Array.isArray(doc.image_descriptions)
        ? doc.image_descriptions[idx] || ''
        : ''
    })),
    links: {
      song: doc.song_link || null,
      movie: doc.movie_link || null,
      other: doc.other_link || null
    }
  };

  setCardData(formattedCard);
  setPinEntered(true);
  setError('');
  setIsLoading(false);
  return;

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!pinEntered) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3e8ff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-2xl border-4 border-amber-100 transform rotate-1 relative"
               style={{
                 background: 'linear-gradient(135deg, #fefbf3 0%, #fff8e7 100%)',
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
               }}>
            
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-5 rounded-lg"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Cpath d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                 }}>
            </div>

            <div className="p-8 relative z-10">
              {/* Wax seal effect */}
              <div className="absolute -top-6 right-8 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                <Heart className="w-6 h-6 text-white" />
              </div>

              <div className="text-center mb-8 pt-4">
                <div className="flex items-center justify-center mb-6">
                  <Feather className="w-8 h-8 text-amber-600 mr-2" />
                  <h1 className="text-2xl font-serif font-bold text-amber-900">
                    A Letter For You
                  </h1>
                </div>
                <p className="text-amber-700 font-serif italic">
                  Someone has written you a beautiful memory letter
                </p>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center justify-center mb-4 text-amber-800 font-serif font-medium">
                    <Lock className="w-5 h-5 mr-2" />
                    Enter the secret code
                  </label>
                  <div className="flex justify-center space-x-3">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="password"
                        maxLength="1"
                        value={pin[index] || ''}
                        onChange={(e) => {
                          const newPin = pin.split('');
                          newPin[index] = e.target.value;
                          setPin(newPin.join(''));
                          
                          if (e.target.value && index < 3) {
                            const nextInput = e.target.parentElement.children[index + 1];
                            if (nextInput) nextInput.focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-xl font-serif font-bold border-2 border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 transition-all"
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="text-center text-red-600 text-sm bg-red-50 py-2 px-4 rounded-md border border-red-200 font-serif">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || pin.length !== 4}
                  className={`w-full py-3 rounded-md font-serif font-bold text-lg transition-all ${
                    isLoading || pin.length !== 4
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-600 text-white shadow-lg hover:bg-amber-700 hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Opening Letter...
                    </span>
                  ) : (
                    'Open Letter'
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-amber-600 mt-6 font-serif italic">
                Hint: Ask the sender 
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50"
         style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3e8ff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
         }}>
      
      {/* Letter Paper Container */}
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative"
           style={{
             background: 'linear-gradient(135deg, #fefbf3 0%, #fff8e7 100%)',
             boxShadow: 'inset 0 0 20px rgba(245, 158, 11, 0.1)'
           }}>
        
        {/* Paper holes on the left */}
        <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-center space-y-8">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-amber-100 rounded-full border-2 border-amber-200"></div>
          ))}
        </div>

        {/* Letter Header */}
        <div className="pt-12 pb-8 px-8 border-b border-amber-200">
          <div className="text-center">
            <div className="mb-6">
              <p className="text-lg text-amber-700 font-serif italic mb-2">My Dearest,</p>
              <h1 className="text-3xl font-serif font-bold text-amber-900">
                {cardData.recipientName}
              </h1>
              <div className="w-32 h-px bg-amber-400 mx-auto mt-4"></div>
            </div>
          </div>
        </div>

        {/* Letter Body */}
        <div className="px-8 py-8">
          {/* Opening Message */}
          <div className="mb-8">
            <p className="text-amber-800 leading-relaxed font-serif italic text-center">
              "I've gathered our most treasured moments and put them in this letter. 
              Each memory is a testament to the beautiful journey we've shared..."
            </p>
          </div>

          {/* Swipeable Memory Cards */}
          <SwipeableStack memories={cardData.memories} />

          {/* Special Links Section */}
          {(cardData.links.song || cardData.links.movie || cardData.links.other) && (
            <div className="mb-8 p-6 bg-amber-50 rounded-lg border-2 border-amber-200 shadow-inner">
              <h3 className="text-lg font-serif font-bold text-amber-900 mb-6 text-center">
                Special Dedications
              </h3>
              <div className="space-y-4">
                {cardData.links.song && (
                  <a
                    href={cardData.links.song}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white rounded-lg border-2 border-pink-200 hover:border-pink-300 transition-all group shadow-sm"
                  >
                    <div className="w-14 h-14 bg-pink-100 border-2 border-pink-300 rounded-full flex items-center justify-center mr-4 group-hover:bg-pink-200 transition-colors">
                      <Music className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-amber-900">Our Song</h4>
                      <p className="text-sm text-amber-700">The melody that plays in my heart when I think of you</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}

                {cardData.links.movie && (
                  <a
                    href={cardData.links.movie}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all group shadow-sm"
                  >
                    <div className="w-14 h-14 bg-blue-100 border-2 border-blue-300 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                      <Film className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-amber-900">Our Movie</h4>
                      <p className="text-sm text-amber-700">The story that reminds me of our own beautiful tale</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}

                {cardData.links.other && (
                  <a
                    href={cardData.links.other}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white rounded-lg border-2 border-green-200 hover:border-green-300 transition-all group shadow-sm"
                  >
                    <div className="w-14 h-14 bg-green-100 border-2 border-green-300 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                      <LinkIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-amber-900">Something Special</h4>
                      <p className="text-sm text-amber-700">A little surprise crafted just for you</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Letter Closing */}
          <div className="text-center mb-8 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
            <div className="space-y-4">
              <p className="text-amber-800 font-serif italic leading-relaxed">
                {cardData.msg || "Every moment with you is a treasure I hold close to my heart. Here's to many more memories together."}
              </p>
              <div className="space-y-2">
                <p className="text-lg text-amber-700 font-serif italic">Forever yours,</p>
                <h2 className="text-2xl font-serif font-bold text-amber-900">
                  {cardData.senderName}
                </h2>
                <div className="flex justify-center space-x-1 mt-3">
                  <Heart className="w-5 h-5 text-red-400 fill-current" />
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                  <Heart className="w-5 h-5 text-red-400 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Momentoss Credit */}
        <div className="text-center py-8 border-t border-amber-200">
          <button 
            onClick={() => navigate('/')}
            className="font-serif text-amber-600 hover:text-amber-800 transition-colors group"
          >
            <span className="text-lg font-bold">Momentoss</span>
            <br />
            <span className="text-sm italic group-hover:underline">Your Bond, Your Story</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientPage;