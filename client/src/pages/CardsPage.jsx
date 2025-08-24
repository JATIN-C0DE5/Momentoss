import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardGrid from '../components/CardGrid';
import MemoryUploadForm from '../components/MemoryUploadForm';
import LinksForm from '../components/LinksForm';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const CardsPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedDesign: null,
    customerName: '',
    customerNumber: '',
    recipientName: '',
    pin: '',
    numberOfPhotos: 3,
    addSongMovie: false,
    memories: [],
    links: {
      song: '',
      movie: '',
      other: ''
    }
  });

  const steps = [
    { id: 1, title: 'Choose Design', component: 'design' },
    { id: 2, title: 'Card Details', component: 'details' },
    { id: 3, title: 'Add Memories', component: 'memories' },
    { id: 4, title: 'Add Links', component: 'links' }
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
      // TODO: Replace with actual API call when backend is ready
      console.log('Submitting form data:', formData);
      
      // Simulate API call
      const mockCardId = 'card_' + Date.now();
      
      // Navigate to confirmation page
      navigate(`/confirmation/${mockCardId}`);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedDesign !== null;
      case 2:
        return formData.customerName && formData.recipientName && formData.pin;
      case 3:
        return formData.memories.length === formData.numberOfPhotos;
      case 4:
        return !formData.addSongMovie || formData.links.song || formData.links.movie || formData.links.other;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.id <= currentStep
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step.id < currentStep ? 'bg-pink-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {steps[currentStep - 1].title}
          </h2>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Photos/Memories
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        numberOfPhotos: Math.max(1, formData.numberOfPhotos - 1)
                      })
                    }
                    className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold hover:bg-pink-600"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 w-8 text-center">
                    {formData.numberOfPhotos}
                  </span>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        numberOfPhotos: Math.min(5, formData.numberOfPhotos + 1)
                      })
                    }
                    className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold hover:bg-pink-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.addSongMovie}
                    onChange={(e) =>
                      setFormData({ ...formData, addSongMovie: e.target.checked })
                    }
                    className="w-5 h-5 text-pink-500 focus:ring-pink-500 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Add song, movie, or other special links
                  </span>
                </label>
              </div> */}
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
              onLinksChange={(links) =>
                setFormData({ ...formData, links })
              }
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
              isStepValid()
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
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