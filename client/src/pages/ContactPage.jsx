import { Mail, Phone, MapPin, Heart, Clock, HelpCircle, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'We typically ship orders within 1-2 business days. Standard delivery takes 3-5 business days, while express shipping takes 1-2 business days.'
    },
    {
      question: 'What if my NFC card doesn\'t work?',
      answer: 'All our cards are tested before shipping. If you experience any issues, contact us immediately and we\'ll send a replacement at no cost.'
    },
    {
      question: 'Can I edit my memory page after ordering?',
      answer: 'Unfortunately, once your card is printed and shipped, changes cannot be made. Please review your content carefully before submitting your order.'
    },
    {
      question: 'What phones are compatible?',
      answer: 'NFC works with most modern Android phones and iPhones (iPhone 7 and newer). The recipient just needs to tap the card on the back of their phone.'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            We're Here to Help
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about your memory card or need support? 
            Our team is ready to assist you with love and care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information - Now Full Width */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Email Us</h3>
                  <p className="text-gray-600">momentossofficial@gmail.com</p>
                  <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 9 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Call Us</h3>
                  <p className="text-gray-600">+91 7007886882</p>
                  <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 9 PM IST</p>
                </div>
              </div>

              {/* <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Visit Us</h3>
                  <p className="text-gray-600">Greater Noida, Uttar Pradesh</p>
                  <p className="text-sm text-gray-500">India</p>
                </div>
              </div> */}

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Response Time</h3>
                  <p className="text-gray-600">Average: 3 hours</p>
                  <p className="text-sm text-gray-500">Maximum: 24 hours</p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-gray-600 mb-4">
                For urgent matters or quick questions, reach out to us directly via WhatsApp or phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/917007886882?text=Hi!%20I%20need%20help%20with%20my%20Momentoss%20memory%20card.%20Could%20you%20please%20assist%20me?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </a>
                <a
                  href="tel:+917007886882"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-6 h-6 text-indigo-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-800 pr-4">
                      {faq.question}
                    </span>
                    <div className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform flex-shrink-0">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="mt-2 px-4 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Didn't find your answer?</strong> Contact us directly via WhatsApp or phone for personalized support!
              </p>
            </div>

            {/* Additional Help Section */}
            {/* <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Popular Support Topics:
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Order tracking and shipping updates</li>
                <li>• NFC card troubleshooting</li>
                <li>• Custom design requests</li>
                <li>• Refund and return policies</li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Memory Card?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start building beautiful memories that last forever
          </p>
          <a
            href="/cards"
            className="inline-flex items-center px-8 py-4 bg-white text-pink-500 font-bold rounded-full text-lg hover:shadow-lg transition-all hover:scale-105"
          >
            <Heart className="w-6 h-6 mr-2" />
            Create Your Card
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;