import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../common/Button';
import PaymentModal from '../modals/PaymentModal/PaymentModal';
import { useState } from 'react';

interface SummaryProps {
  prevStep: () => void;
}

const Summary: React.FC<SummaryProps> = ({ prevStep }) => {
  const formData = useSelector((state: RootState) => state.form.formData);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  console.log('Form data in Summary:', formData);
  const handleSubmit = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentMethodSelected = (method: string) => {
    console.log('Selected payment method:', method);
    setIsPaymentModalOpen(false);
    alert(`Payment successful with ${method}`);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <p className="text-gray-600 mb-6">Review your selections before submitting.</p>

      <div className="mb-6">
        <h3 className="font-bold">Personal Info</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold">Selected Plan</h3>
        <p>{formData.plan}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold">Add-Ons</h3>
        <ul>
          {formData.addOns?.service && <li>Additional Service</li>}
          {formData.addOns?.storage && <li>Extra Storage</li>}
          {formData.addOns?.customization && <li>Customization</li>}
        </ul>
      </div>

      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={prevStep}>Back</Button>
        <Button type="button" onClick={handleSubmit}>Submit</Button>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentMethodSelected={handlePaymentMethodSelected}
      />
    </div>
  );
};

export default Summary;