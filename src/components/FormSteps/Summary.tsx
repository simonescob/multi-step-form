import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../common/Button';
import PaymentModal from '../modals/PaymentModal/PaymentModal';
import { useEffect, useState } from 'react';
import { loadStripe, StripeCardElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';

interface SummaryProps {
  prevStep: () => void;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
// console.log('stripePromise:', );
stripePromise.then((stripe) => {
  console.log('stripe promise:', stripe);
});

function calculateTotalAmount(formData: { name?: string; email?: string; phone?: string; plan?: string; billing?: string; addOns?: { service?: boolean; storage?: boolean; customization?: boolean; }; }) {
  // Define plan prices
  const planPrices: { [key: string]: number } = {
    "Pro": 15.00,
    "Advanced": 12.00,
    "Arcade": 9.00
  };

  // Get base amount based on selected plan
  const baseAmount = planPrices[formData.plan || 'Arcade'] || 0.00;
  console.log('baseAmount:', baseAmount);
  
  // Calculate add-ons
  const addOnAmount = formData.addOns?.service ? 5.00 : 0.00;
  
  // Calculate and return total
  const total = parseFloat((baseAmount + addOnAmount).toFixed(2));
  return total;
}

const Summary: React.FC<SummaryProps> = ({ prevStep }) => {
  const stripe = useStripe();
  const elements = useElements();
  const formData = useSelector((state: RootState) => state.form.formData);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  console.log('Form data in Summary:', formData);
  const handleSubmit = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentMethodSelected = async (paymentMethodId: string) => {
    try {
      // 1. Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotalAmount(formData), // Ensure this returns amount in cents
        }),
      });

      console.log('Response:', response);

      const { clientSecret } = await response.json();
      
      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // 2. Confirm payment with Stripe
      if (!stripe) {
        throw new Error('Stripe is not loaded');
      }

      const cardElement = elements?.getElement(CardElement) as StripeCardElement || {};

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name || 'Customer', // Fallback value
            email: formData.email || 'customer@example.com', // Fallback value
            phone: formData.phone || '+15555555555', // Fallback value
            address: {
              line1: '123 Main St', // Example address
              city: 'San Francisco',
              state: 'CA',
              postal_code: '94111',
              country: 'US'
            }
          },
          metadata: {
            plan: formData.plan || 'Basic', // Fallback value
            billing: formData.billing || 'Monthly' // Fallback value
          }
        }
      });

      if (error) {
        console.log('Error in payment method selected:', error);
        throw error;
      }

      if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        setIsPaymentModalOpen(false);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
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

const SummaryWrapper: React.FC<SummaryProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <Summary {...props} />
    </Elements>
  );
};

export default SummaryWrapper;
