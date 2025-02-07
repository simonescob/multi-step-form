import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addOnsSchema, FormData } from '../../utils/formValidation';
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';

interface AddOnsProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AddOns: React.FC<AddOnsProps> = ({ nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addOnsSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    dispatch(updateFormData(data));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add-Ons</h2>
      <p className="text-gray-600 mb-6">Enhance your experience with these add-ons.</p>

      <div className="space-y-4">
        <Checkbox
          label="Additional Service"
          description="Get priority support and faster response times."
          register={register}
          name="addOns.service"
        />
        <Checkbox
          label="Extra Storage"
          description="Add 50GB of cloud storage to your plan."
          register={register}
          name="addOns.storage"
        />
        <Checkbox
          label="Customization"
          description="Customize your experience with advanced settings."
          register={register}
          name="addOns.customization"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={prevStep}>Back</Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default AddOns;