import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, FormData } from '../../utils/formValidation';
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import Input from '../common/Input';
import Button from '../common/Button';

interface PersonalInfoProps {
  nextStep: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(personalInfoSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    dispatch(updateFormData(data));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
      <p className="text-gray-600 mb-6">Please provide your name, email address, and phone number.</p>

      <Input
        label="Name"
        {...register('name')}
        error={errors.name}
        placeholder="e.g. Stephen King"
      />
      <Input
        label="Email Address"
        {...register('email')}
        error={errors.email}
        placeholder="e.g. stephenking@lorem.com"
      />
      <Input
        label="Phone Number"
        {...register('phone')}
        error={errors.phone}
        placeholder="e.g. +1 234 567 890"
      />

      <div className="mt-6 flex justify-end">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default PersonalInfo;