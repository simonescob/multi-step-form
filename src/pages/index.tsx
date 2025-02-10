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
      <div className="w-[940px] h-[600px] bg-white rounded-lg shadow-lg p-6 max-w-4xl">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-[275px] h-full bg-purple-sidebar text-white rounded-lg p-6 relative">
            <img src="/bg-desktop.png" alt="sidebar" className="absolute bottom-0 left-0 w-full rounded-b-lg" />
            <div className="space-y-4">
              <div className={`flex items-center space-x-3 ${currentStep === 1 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 1 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>1</div>
                <div>
                  <p className="text-sm text-blue-light">STEP 1</p>
                  <p className="text-sm">YOUR INFO</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${currentStep === 2 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 2 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>2</div>
                <div>
                  <p className="text-sm text-blue-light">STEP 2</p>
                  <p className="text-sm">SELECT PLAN</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${currentStep === 3 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 3 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>3</div>
                <div>
                  <p className="text-sm text-blue-light">STEP 3</p>
                  <p className="text-sm">ADD-ONS</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${currentStep === 4 ? 'font-bold' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 4 ? 'bg-blue-200 text-blue-900 border-blue-200' : 'border-white'}`}>4</div>
                <div>
                  <p className="text-sm text-blue-light">STEP 4</p>
                  <p className="text-sm">SUMMARY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="w-3/4  px-24 py-6">
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