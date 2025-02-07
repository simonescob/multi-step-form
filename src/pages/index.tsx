import { useState } from 'react';
import PersonalInfo from '../components/FormSteps/PersonalInfo';
import SelectPlan from '../components/FormSteps/SelectPlan';
import AddOns from '../components/FormSteps/AddOns';
import Summary from '../components/FormSteps/Summary';

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-1/4 bg-blue-600 text-white rounded-lg p-6">
            <div className="space-y-4">
              <div className={`flex items-center space-x-3 ${currentStep === 1 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 1 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>1</div>
                <div>
                  <p className="text-sm">STEP 1</p>
                  <p className="text-sm">YOUR INFO</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${currentStep === 2 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 2 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>2</div>
                <div>
                  <p className="text-sm">STEP 2</p>
                  <p className="text-sm">SELECT PLAN</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${currentStep === 3 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 3 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>3</div>
                <div>
                  <p className="text-sm">STEP 3</p>
                  <p className="text-sm">ADD-ONS</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${currentStep === 4 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 4 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>4</div>
                <div>
                  <p className="text-sm">STEP 4</p>
                  <p className="text-sm">SUMMARY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="w-3/4">
            {currentStep === 1 && <PersonalInfo nextStep={nextStep} />}
            {currentStep === 2 && <SelectPlan nextStep={nextStep} prevStep={prevStep} />}
            {currentStep === 3 && <AddOns nextStep={nextStep} prevStep={prevStep} />}
            {currentStep === 4 && <Summary prevStep={prevStep} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;