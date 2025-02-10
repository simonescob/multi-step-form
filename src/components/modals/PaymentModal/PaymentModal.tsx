import BaseModal from '../BaseModal/BaseModal';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentMethodSelected: (method: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentMethodSelected }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
      <div className="space-y-3">
        <button
          onClick={() => onPaymentMethodSelected('paypal')}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Pay with PayPal
        </button>
        <button
          onClick={() => onPaymentMethodSelected('stripe')}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Pay with Stripe
        </button>
      </div>
    </BaseModal>
  );
};

export default PaymentModal; 