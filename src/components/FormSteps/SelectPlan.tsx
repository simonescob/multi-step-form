import { useForm } from 'react-hook-form';
import Button from '../common/Button';

interface SelectPlanProps {
  nextStep: () => void;
  prevStep: () => void;
}

const SelectPlan: React.FC<SelectPlanProps> = ({ nextStep, prevStep }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-4">Select your plan</h2>
      <p className="text-gray-600 mb-6">You have the option of monthly or yearly billing.</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <input type="radio" {...register('plan')} value="arcade" className="hidden" />
          <span className="font-bold">Arcade</span>
          <span className="text-gray-600">$9/mo</span>
        </label>
        <label className="flex flex-col p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <input type="radio" {...register('plan')} value="advanced" className="hidden" />
          <span className="font-bold">Advanced</span>
          <span className="text-gray-600">$12/mo</span>
        </label>
        <label className="flex flex-col p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <input type="radio" {...register('plan')} value="pro" className="hidden" />
          <span className="font-bold">Pro</span>
          <span className="text-gray-600">$15/mo</span>
        </label>
      </div>

      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={prevStep}>Go Back</Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default SelectPlan;