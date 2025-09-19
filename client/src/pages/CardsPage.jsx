import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardGrid from '../components/CardGrid';
import MemoryUploadForm from '../components/MemoryUploadForm';
import LinksForm from '../components/LinksForm';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import createCard from "../appwrite/createCrad"

const CardsPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedDesign: null,
    customerName: '',
    customerNumber: '',
    recipientName: '',
    pin: '',
    numberOfPhotos: 5, // Fixed to 5, no longer user-controlled
    memories: [],
    links: {
      song: '',
      movie: '',
      other: ''
    },
    sweetMessage: '' // New field for the letter body
  });

  const steps = [
    { id: 1, title: 'Choose Design', component: 'design'},
    { id: 2, title: 'Basic Details', component: 'details'},
    { id: 3, title: 'Add Memories', component: 'memories'},
    { id: 4, title: 'Special Touch', component: 'links'}
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting form data:", formData);

      // 🔗 Call our Appwrite function
      const res = await createCard(formData);

      if (res.success) {
        // Navigate to confirmation page with real document ID
        navigate(`/confirmation/${res.doc.$id}`);
      } else {
        console.error("Error creating card:", res.error);
        alert("Failed to create card: " + res.error);
      }
    } catch (error) {
      console.error("Unexpected error creating card:", error);
      alert("Unexpected error occurred: " + error.message);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedDesign !== null;
      case 2:
        return formData.customerName && formData.recipientName && formData.pin;
      case 3:
        // At least one memory should be uploaded, but not mandatory to fill all 5
        return formData.memories.some(memory => memory?.image && memory?.caption);
      case 4:
        // Sweet message is required, links are optional
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-yellow-50 via-red-50 to-yellow-50">
      <div className="">
        
        {/* New 4-Segment Progress Bar */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex-1 h-3 rounded-full transition-all duration-700 ease-out shadow-lg ${
                    step.id <= currentStep
                      ? 'bg-gradient-to-r from-red-500 to-red-400'
                      : 'bg-red-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-yellow-50/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-red-200/30">
          {currentStep === 1 && (
            <CardGrid
              selectedDesign={formData.selectedDesign}
              onSelectDesign={(design) =>
                setFormData({ ...formData, selectedDesign: design })
              }
            />
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-red-600 mr-3 animate-pulse" fill="currentColor" />
                  <h3 className="text-3xl font-bold text-amber-900">Basic Details</h3>
                  <Heart className="w-8 h-8 text-red-600 ml-3 animate-pulse" fill="currentColor" />
                </div>
                <p className="text-amber-800">Help us personalize your memory card perfectly</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-amber-900 mb-3">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-500 bg-white/80 text-amber-900 font-medium shadow-lg transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-amber-900 mb-3">
                      Your Phone Number
                    </label>
                    <input
                      type="number"
                      value={formData.customerNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, customerNumber: e.target.value })
                      }
                      className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-500 bg-white/80 text-amber-900 font-medium shadow-lg transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-amber-900 mb-3">
                      Recipient's Name
                    </label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientName: e.target.value })
                      }
                      className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-500 bg-white/80 text-amber-900 font-medium shadow-lg transition-all duration-300"
                      placeholder="Enter recipient's name"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-amber-900 mb-3">
                      PIN (4 digits)
                    </label>
                    <input
                      type="password"
                      maxLength="4"
                      value={formData.pin}
                      onChange={(e) =>
                        setFormData({ ...formData, pin: e.target.value })
                      }
                      className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-500 bg-white/80 text-amber-900 font-medium shadow-lg transition-all duration-300"
                      placeholder="Enter 4-digit PIN"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <MemoryUploadForm
              memories={formData.memories}
              numberOfPhotos={formData.numberOfPhotos}
              onMemoriesChange={(memories) =>
                setFormData({ ...formData, memories })
              }
            />
          )}

          {currentStep === 4 && (
            <LinksForm
              links={formData.links}
              sweetMessage={formData.sweetMessage}
              onLinksChange={(links) =>
                setFormData({ ...formData, links })
              }
              onSweetMessageChange={(message) =>
                setFormData({ ...formData, sweetMessage: message })
              }
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
              currentStep === 1
                ? 'bg-red-200 text-red-400 cursor-not-allowed'
                : 'bg-white text-amber-900 hover:bg-red-50 hover:shadow-xl hover:scale-105 border-2 border-red-200'
            }`}
          >
            <ArrowLeft className="w-6 h-6 mr-3" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
              isStepValid()
                ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 hover:shadow-xl hover:scale-105 shadow-red-600/30'
                : 'bg-red-200 text-red-400 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length ? 'Create' : 'Next'}
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsPage;