import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { CheckCircle, Heart, Truck, Smartphone, Copy, Download, MessageCircle } from 'lucide-react';

const ConfirmationPage = ({ orderId }) => {
  // Use orderId prop instead of useParams
  const {id}=useParams();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Remove dummy data - these should come from props or API call
  const orderDetails = {
    id: id,
    customerName: '', // Will be populated from actual order data
    recipientName: '', // Will be populated from actual order data
    designName: '', // Will be populated from actual order data
    numberOfPhotos: 0, // Will be populated from actual order data
    generatedLink: `https://www.momentoss.in/gcard/${id}`,
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

  const downloadPDF = async () => {
    setDownloading(true);
    
    try {
      // Simply trigger the browser's print dialog to save current page as PDF
      window.print();
      
    } catch (error) {
      console.error('Error opening print dialog:', error);
      alert('Unable to open print dialog. Please try again or use Ctrl+P.');
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  const sendToWhatsApp = () => {
    const message = `Hi! I've just created a memory page on Momentoss. Here's the link: ${orderDetails.generatedLink} 
    My Name = {Enter Your Name} `;
    const whatsappUrl = `https://wa.me/+917007886882?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Confirmed! 🎉
          </h1>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Card ID : </h2>
            <span className="text-sm text-gray-500">#{orderDetails.id}</span>
          </div>

          <div className="space-y-4">
            {orderDetails.customerName && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">From:</span>
                <span className="font-medium text-gray-800">{orderDetails.customerName}</span>
              </div>
            )}
            {orderDetails.recipientName && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">To:</span>
                <span className="font-medium text-gray-800">{orderDetails.recipientName}</span>
              </div>
            )}
            {orderDetails.designName && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Design:</span>
                <span className="font-medium text-gray-800">{orderDetails.designName}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order Date : </span>
              <span className="font-medium text-gray-800">{orderDetails.orderDate}</span>
            </div>
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="text-center mb-8">
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className={`inline-flex items-center px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
              downloading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105'
            }`}
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Preparing Download...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Download Confirmation
              </>
            )}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Save a copy of your order confirmation for your records
          </p>
        </div>

        {/* Generated Link Card */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8 border border-pink-100">
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-pink-500 mr-3" />
            <h3 className="text-lg font-bold text-gray-800">Your Memory Link</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Share this link with others or send it to us for processing.
          </p>
          <div className="flex items-center space-x-2 p-4 bg-white rounded-lg border mb-4">
            <input
              type="text"
              value={orderDetails.generatedLink}
              readOnly
              className="flex-1 bg-transparent text-gray-700 text-sm focus:outline-none"
            />
            <button
              onClick={copyLink}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-pink-500 text-white hover:bg-pink-600 hover:scale-105'
              }`}
            >
              {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.open(`/gcard/${id}`, '_blank')}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-5 h-5 mr-2" />
              Preview Memory Page
            </button>
            
            <button
              onClick={sendToWhatsApp}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Send Link to Us
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            Keep this link safe - it's the heart of your memory card!
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">What happens next?</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">NFC Programming</h4>
                <p className="text-gray-600 text-sm">
                  We'll program your unique memory link into a beautiful NFC card
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Quality Check</h4>
                <p className="text-gray-600 text-sm">
                  Every card is tested to ensure it works perfectly on all devices
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Safe Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Your card will be carefully packaged and shipped to you in {orderDetails.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Questions about your order? We're here to help!
          </p>
          <button
            onClick={() => window.open('/contact', '_blank')}
            className="inline-flex items-center px-6 py-3 border-2 border-pink-500 text-pink-500 font-bold rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-105"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;