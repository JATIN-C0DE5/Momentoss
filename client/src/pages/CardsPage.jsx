import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardGrid from '../components/CardGrid';
import MemoryUploadForm from '../components/MemoryUploadForm';
import LinksForm from '../components/LinksForm';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
    { id: 1, title: 'Choose Design', component: 'design' },
    { id: 2, title: 'Basic Details', component: 'details' },
    { id: 3, title: 'Add Memories', component: 'memories' },
    { id: 4, title: 'Special', component: 'links' } // Updated title
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Updated Progress Indicator - More visually appealing horizontal bars */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                {/* Circular indicator without numbers */}
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.id <= currentStep
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg scale-125'
                      : 'bg-gray-300'
                  }`}
                >
                </div>
                {/* Progress bar between steps */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 relative">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ease-out ${
                          step.id < currentStep 
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-full' 
                            : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Step title with progress indicator */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-500 text-sm">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          {currentStep === 1 && (
            <CardGrid
              selectedDesign={formData.selectedDesign}
              onSelectDesign={(design) =>
                setFormData({ ...formData, selectedDesign: design })
              }
            />
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Phone Number
                </label>
                <input
                  type="number"
                  value={formData.customerNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, customerNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient's Name
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter recipient's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN (4 digits)
                </label>
                <input
                  type="password"
                  maxLength="4"
                  value={formData.pin}
                  onChange={(e) =>
                    setFormData({ ...formData, pin: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter 4-digit PIN"
                />
              </div>

              {/* Removed: Number of photos selector and addSongMovie checkbox */}
              {/* Now fixed to 5 photos maximum, user can upload as many as they want up to 5 */}
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
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              isStepValid()
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length ? 'Create Card' : 'Next'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsPage;