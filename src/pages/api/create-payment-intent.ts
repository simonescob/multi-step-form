import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;
      console.log('Amount:', amount);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount*100000, // Convert dollars to cents
        currency: 'USD',
        payment_method_types: ['card'],
        // payment_method: 'card',
        description: 'Subscription payment',
        metadata: {
          plan: 'Pro', // Example metadata
          billing: 'Monthly'
        },
        capture_method: 'automatic',
        setup_future_usage: 'off_session', // Allow future payments
        receipt_email: 'snsimonescobari@gmail.com', // Example email
        // automatic_payment_methods: {
        //   enabled: true
        // },
        use_stripe_sdk: true // Enable Stripe.js integration
      });

      console.log('Payment intent:', paymentIntent);

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}