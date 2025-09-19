import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Heart, Truck, Smartphone, Copy, Download, MessageCircle } from 'lucide-react';

const ConfirmationPage = ({ orderId }) => {
  const {id} = useParams();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const orderDetails = {
    id: id,
    customerName: '',
    recipientName: '',
    designName: '',
    numberOfPhotos: 0,
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

  const generatePDFContent = () => {
    return `
      <html>
        <head>
          <title>Momentoss Order Confirmation</title>
          <style>
            @page {
              margin: 20mm;
              size: A4;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Arial', sans-serif;
              background: linear-gradient(135deg, #fef7cd 0%, #fed7d7 50%, #fef7cd 100%);
              color: #92400e;
              line-height: 1.2;
              padding: 30px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(255, 255, 255, 0.9);
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15);
              border: 2px solid rgba(220, 38, 38, 0.2);
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 30px;
              border-bottom: 3px solid #dc2626;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #dc2626;
              margin-bottom: 10px;
              letter-spacing: 2px;
            }
            .success-icon {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #10b981, #059669);
              border-radius: 50%;
              display: inline-block;
              margin: 10px 0;
              position: relative;
            }
            .success-icon::after {
              content: '✓';
              color: white;
              font-size: 40px;
              font-weight: bold;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #92400e;
              margin: 10px 0;
            }
            .subtitle {
              font-size: 18px;
              color: #d97706;
              margin-bottom: 30px;
            }
            .order-details {
              background: rgba(254, 242, 242, 0.8);
              border-radius: 15px;
              padding: 30px;
              margin: 30px 0;
              border: 2px solid rgba(220, 38, 38, 0.3);
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 15px 0;
              border-bottom: 1px solid rgba(220, 38, 38, 0.2);
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #92400e;
              font-size: 16px;
            }
            .detail-value {
              font-weight: bold;
              color: #78350f;
              font-size: 16px;
            }
            .link-section {
              background: linear-gradient(135deg, #fef2f2, #fee2e2);
              border-radius: 15px;
              padding: 25px;
              margin: 30px 0;
              border: 2px solid #dc2626;
              text-align: center;
            }
            .link-title {
              font-size: 20px;
              font-weight: bold;
              color: #dc2626;
              margin-bottom: 15px;
            }
            .memory-link {
              background: white;
              padding: 15px;
              border-radius: 10px;
              border: 2px solid rgba(220, 38, 38, 0.3);
              font-family: monospace;
              font-size: 14px;
              color: #92400e;
              word-break: break-all;
              margin: 15px 0;
            }
            .steps-section {
              margin: 10px 0;
            }
            .steps-title {
              font-size: 22px;
              font-weight: bold;
              color: #92400e;
              text-align: center;
              margin-bottom: 25px;
            }
            .step {
              display: flex;
              align-items: flex-start;
              margin-bottom: 20px;
              padding: 20px;
              background: rgba(255, 255, 255, 0.7);
              border-radius: 15px;
              border-left: 5px solid #dc2626;
            }
            .step-icon {
              width: 50px;
              height: 50px;
              background: linear-gradient(135deg, #fef2f2, #fee2e2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 20px;
              border: 2px solid #dc2626;
              font-size: 20px;
            }
            .step-content h4 {
              font-size: 18px;
              font-weight: bold;
              color: #92400e;
              margin-bottom: 8px;
            }
            .step-content p {
              color: #d97706;
              font-size: 14px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 30px;
              border-top: 2px solid #dc2626;
            }
            .heart {
              color: #dc2626;
              font-size: 20px;
            }
            .contact-info {
              background: rgba(254, 242, 242, 0.6);
              padding: 20px;
              border-radius: 15px;
              margin-top: 20px;
              border: 1px solid rgba(220, 38, 38, 0.3);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">♡ MOMENTOSS ♡</div>
              <div class="success-icon"></div>
              <h1 class="title">Order Confirmed!</h1>
              

            <div class="order-details">
              <h2 style="font-size: 24px; color: #dc2626; margin-bottom: 20px; text-align: center;">
                ♡ Card Details ♡
              </h2>
              <div class="detail-row">
                <span class="detail-label">Order ID:</span>
                <span class="detail-value">#${orderDetails.id}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Order Date:</span>
                <span class="detail-value">${orderDetails.orderDate}</span>
              </div>
            </div>

            <div class="link-section">
              <h3 class="link-title">♡ Your Memory Link ♡</h3>
              <p style="color: #92400e; margin-bottom: 10px;">Keep this link safe - it's the heart of your memory card!</p>
              <div class="memory-link">${orderDetails.generatedLink}</div>
            </div>

            <div class="steps-section">
              <p style="margin-top: 10px; color: #dc2626; font-weight: bold; font-size: 18px;">
                <span class="heart">♡</span> Thank you for choosing Momentoss! <span class="heart">♡</span>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const downloadPDF = async () => {
    setDownloading(true);
    
    try {
      // Create a new window with the PDF content
      const pdfWindow = window.open('', '_blank');
      const pdfContent = generatePDFContent();
      
      pdfWindow.document.write(pdfContent);
      pdfWindow.document.close();
      
      // Wait a moment for content to load, then trigger print
      setTimeout(() => {
        pdfWindow.focus();
        pdfWindow.print();
        
        // Close the window after printing (optional)
        setTimeout(() => {
          pdfWindow.close();
        }, 1000);
      }, 500);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Unable to generate PDF. Please try again.');
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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-yellow-50 via-red-50 to-yellow-50">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Order Confirmed! 
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="text-l text-amber-800">Your memory card is being crafted with love</p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-yellow-50/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 mb-10 border border-red-200/30">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-amber-900 flex items-center">
              <Heart className="w-7 h-7 text-red-600 mr-3" fill="currentColor" />
              Card :
            </h2>
            <span className="px-4 py-2 bg-gradient-to-r from-red-100 to-red-200 text-red-800 text-sm font-bold rounded-full shadow-md">
              #{orderDetails.id}
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between py-4 px-6 bg-white/70 rounded-2xl border border-red-200/20 shadow-lg">
              <span className="text-amber-800 font-medium">Order Date:</span>
              <span className="font-bold text-amber-900">{orderDetails.orderDate}</span>
            </div>
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="text-center mb-10">
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className={`inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 shadow-xl ${
              downloading
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 hover:shadow-2xl hover:scale-105'
            }`}
          >
            {downloading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Preparing Download...
              </>
            ) : (
              <>
                <Download className="w-6 h-6 mr-3" />
                Download Confirmation
              </>
            )}
          </button>
        
        </div>

        {/* Generated Link Card */}
        <div className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 rounded-3xl p-8 md:p-10 mb-10 border-2 border-red-200/50 shadow-2xl">
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-red-600 mr-4 animate-pulse" fill="currentColor" />
            <h3 className="text-2xl font-bold text-amber-900">Your Memory Link</h3>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-2xl border-2 border-red-200/30 mb-6 shadow-inner">
            <input
              type="text"
              value={orderDetails.generatedLink}
              readOnly
              className="flex-1 bg-transparent text-amber-900 font-medium focus:outline-none"
            />
            <button
              onClick={copyLink}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-red-600 to-red-400 text-white hover:from-red-700 hover:to-red-500 hover:scale-105'
              }`}
            >
              {copied ? 'Copied!' : <Copy className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.open(`/gcard/${id}`, '_blank')}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <Heart className="w-6 h-6 mr-3" fill="currentColor" />
              Preview Memory Page
            </button>
            
            <button
              onClick={sendToWhatsApp}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Send Link to Us
            </button>
          </div>
          
          <p className="text-xs text-amber-700 mt-4 text-center">
            Keep this link safe - it's the heart of your memory card!
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-yellow-50/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 mb-10 border border-red-200/30">
          <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center">
            What happens next?
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-6 p-6 bg-white/70 rounded-2xl shadow-lg border border-red-200/20">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <Smartphone className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-lg mb-2">NFC Programming</h4>
                <p className="text-amber-800 leading-relaxed">
                  We'll program your unique memory link into a beautiful NFC card with love and precision
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white/70 rounded-2xl shadow-lg border border-red-200/20">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <Heart className="w-8 h-8 text-red-600" fill="currentColor" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-lg mb-2">Quality Check</h4>
                <p className="text-amber-800 leading-relaxed">
                  Every card is carefully tested to ensure it works perfectly on all devices
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white/70 rounded-2xl shadow-lg border border-red-200/20">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <Truck className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-lg mb-2">Safe Delivery</h4>
                <p className="text-amber-800 leading-relaxed">
                  Your card will be lovingly packaged and delivered to you in {orderDetails.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-yellow-50/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-red-200/30">
          <Heart className="w-12 h-12 text-red-600 mx-auto mb-6 animate-pulse" fill="currentColor" />
          <h3 className="text-2xl font-bold text-amber-900 mb-4">Need Help?</h3>
          <p className="text-amber-800 mb-8 leading-relaxed">
            Questions about your order? We're here to help with love and care!
          </p>
          <button
            onClick={() => window.open('/contact', '_blank')}
            className="inline-flex items-center px-8 py-4 border-3 border-red-600 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Heart className="w-6 h-6 mr-3" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;