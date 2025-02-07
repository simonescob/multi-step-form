import { useForm } from 'react-hook-form';
import Button from '../common/Button';

interface AddOnsProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AddOns: React.FC<AddOnsProps> = ({ nextStep, prevStep }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-4">Add-Ons</h2>
      <p className="text-gray-600 mb-6">Enhance your experience with these add-ons.</p>

      <div className="space-y-4 mb-6">
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <input type="checkbox" {...register('addOns.service')} className="mr-4" />
          <div>
            <span className="font-bold">Additional Service</span>
            <p className="text-gray-600">Get priority support and faster response times.</p>
          </div>
        </label>
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <input type="checkbox" {...register('addOns.storage')} className="mr-4" />
          <div>
            <span className="font-bold">Extra Storage</span>
            <p className="text-gray-600">Add 50GB of cloud storage to your plan.</p>
          </div>
        </label>
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <input type="checkbox" {...register('addOns.customization')} className="mr-4" />
          <div>
            <span className="font-bold">Customization</span>
            <p className="text-gray-600">Customize your experience with advanced settings.</p>
          </div>
        </label>
      </div>

      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={prevStep}>Back</Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default AddOns;