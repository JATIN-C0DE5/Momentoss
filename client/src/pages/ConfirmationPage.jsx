import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Heart, Truck, Smartphone, Copy } from 'lucide-react';
import { useState } from 'react';

const ConfirmationPage = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // TODO: Replace with actual API call to fetch order details when backend is ready
  const orderDetails = {
    id: id,
    customerName: 'John Doe',
    recipientName: 'Jane Smith',
    designName: 'Romantic Hearts',
    numberOfPhotos: 3,
    generatedLink: `https://momentoss.in/gcard/${id}`,
    estimatedDelivery: '3-5 business days',
    orderDate: new Date().toLocaleDateString()
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(orderDetails.generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Your beautiful memory card is being prepared with love
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
            <span className="text-sm text-gray-500">#{orderDetails.id}</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">From:</span>
              <span className="font-medium text-gray-800">{orderDetails.customerName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">To:</span>
              <span className="font-medium text-gray-800">{orderDetails.recipientName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Design:</span>
              <span className="font-medium text-gray-800">{orderDetails.designName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Photos:</span>
              <span className="font-medium text-gray-800">{orderDetails.numberOfPhotos} memories</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium text-gray-800">{orderDetails.orderDate}</span>
            </div>
          </div>
        </div>

        {/* Generated Link Card */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-pink-500 mr-3" />
            <h3 className="text-lg font-bold text-gray-800">Your Memory Link</h3>
          </div>
          <p className="text-gray-600 mb-4">
            This unique link has been generated for your memory card. We'll embed it in your NFC card.
          </p>
          <div className="flex items-center space-x-2 p-4 bg-white rounded-lg">
            <input
              type="text"
              value={orderDetails.generatedLink}
              readOnly
              className="flex-1 bg-transparent text-gray-700 text-sm focus:outline-none"
            />
            <button
              onClick={copyLink}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Keep this link safe - it's the heart of your memory card!
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">What happens next?</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">NFC Programming</h4>
                <p className="text-gray-600 text-sm">
                  We'll program your unique memory link into a beautiful NFC card
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Quality Check</h4>
                <p className="text-gray-600 text-sm">
                  Every card is tested to ensure it works perfectly on all devices
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Safe Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Your card will be carefully packaged and shipped to you in {orderDetails.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Preview Your Memory Page</h3>
          <p className="text-gray-600 mb-4">
            Want to see how your memory page will look? Click the link above or visit it directly!
          </p>
          <Link
            to={`/gcard/${id}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:shadow-lg transition-all"
          >
            <Heart className="w-5 h-5 mr-2" />
            Preview Memory Page
          </Link>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Questions about your order? We're here to help!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border-2 border-pink-500 text-pink-500 font-bold rounded-full hover:bg-pink-500 hover:text-white transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;