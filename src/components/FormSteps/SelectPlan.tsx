import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectPlanSchema, FormData } from '../../utils/formValidation';
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import Button from '../common/Button';
import RadioButton from '../common/RadioButton';
import { useState } from 'react';
import Switch from '../common/Switch';

interface SelectPlanProps {
  nextStep: () => void;
  prevStep: () => void;
}

const SelectPlan: React.FC<SelectPlanProps> = ({ nextStep, prevStep }) => {
  const [isYearly, setIsYearly] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(selectPlanSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    dispatch(updateFormData({ ...data, billing: isYearly ? 'Yearly' : 'Monthly' }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Plan</h2>
      <p className="text-gray-600 mb-6">Choose the plan that best suits your needs.</p>

      <Switch
        label="Billing Type"
        checked={isYearly}
        onChange={() => setIsYearly(!isYearly)}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RadioButton
          label="Arcade"
          value="Arcade"
          price={isYearly ? 90 : 9}
          register={register}
          name="plan"
          isYearly={isYearly}
        />
        <RadioButton
          label="Advanced"
          value="Advanced"
          price={isYearly ? 120 : 12}
          register={register}
          name="plan"
          isYearly={isYearly}
        />
        <RadioButton
          label="Pro"
          value="Pro"
          price={isYearly ? 150 : 15}
          register={register}
          name="plan"
          isYearly={isYearly}
        />
      </div>

      {errors.plan && <p className="text-red-500 text-sm mt-2">{errors.plan.message}</p>}

      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={prevStep}>Go Back</Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default SelectPlan;