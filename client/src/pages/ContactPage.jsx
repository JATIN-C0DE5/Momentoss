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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-yellow-50 via-red-50 to-yellow-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-600/30">
              <Heart className="w-10 h-10 text-yellow-50" fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-400 to-red-300 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-bold text-amber-900 mb-6">
            We're Here to Help
          </h1>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto leading-relaxed">
            Have questions about your memory card or need support? 
            Our team is ready to assist you with love and care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-yellow-50/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-red-200/30">
            <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center">
              <Heart className="w-8 h-8 text-red-600 mr-3" fill="currentColor" />
              Get in Touch
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6 p-4 bg-white/70 rounded-2xl shadow-lg border border-red-200/20">
                <div className="w-14 h-14 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Mail className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 text-lg mb-2">Email Us</h3>
                  <p className="text-amber-800 font-medium">momentossofficial@gmail.com</p>
                  <p className="text-sm text-amber-700 mt-1">Mon-Sat, 9 AM - 9 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-4 bg-white/70 rounded-2xl shadow-lg border border-red-200/20">
                <div className="w-14 h-14 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Phone className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 text-lg mb-2">Call Us</h3>
                  <p className="text-amber-800 font-medium">+91 7007886882</p>
                  <p className="text-sm text-amber-700 mt-1">Mon-Sat, 9 AM - 9 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-4 bg-white/70 rounded-2xl shadow-lg border border-red-200/20">
                <div className="w-14 h-14 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Clock className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 text-lg mb-2">Response Time</h3>
                  <p className="text-amber-800 font-medium">Average: 3 hours</p>
                  <p className="text-sm text-amber-700 mt-1">Maximum: 24 hours</p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-10 p-8 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border-2 border-red-200/50 shadow-inner">
              <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center">
                <Heart className="w-6 h-6 text-red-600 mr-2" fill="currentColor" />
                Need Immediate Help?
              </h3>
              <p className="text-amber-800 mb-6 leading-relaxed">
                For urgent matters or quick questions, reach out to us directly via WhatsApp or phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/917007886882?text=Hi!%20I%20need%20help%20with%20my%20Momentoss%20memory%20card.%20Could%20you%20please%20assist%20me?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  WhatsApp Support
                </a>
                <a
                  href="tel:+917007886882"
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-2xl hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-yellow-50/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-red-200/30">
            <div className="flex items-center mb-8">
              <HelpCircle className="w-8 h-8 text-red-600 mr-4" />
              <h2 className="text-3xl font-bold text-amber-900">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 bg-white/70 rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg border border-red-200/20">
                    <span className="font-bold text-amber-900 pr-4">
                      {faq.question}
                    </span>
                    <div className="w-6 h-6 text-red-600 transform group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="mt-4 px-6 pb-6 text-amber-800 leading-relaxed bg-red-50/50 rounded-xl ml-2 mr-2">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200/50 shadow-inner">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong className="text-red-700">Didn't find your answer?</strong> Contact us directly via WhatsApp or phone for personalized support!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-3xl p-16 text-white shadow-2xl shadow-red-600/30 border border-red-400/30">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Your Memory Card?
          </h2>
          <p className="text-xl mb-10 opacity-95 leading-relaxed">
            Start building beautiful memories that last forever
          </p>
          <a
            href="/cards"
            className="inline-flex items-center px-10 py-5 bg-white text-red-600 font-bold rounded-full text-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 shadow-xl"
          >
            <Heart className="w-7 h-7 mr-3" fill="currentColor" />
            Create Your Card
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;