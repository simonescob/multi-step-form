import { useDispatch, useSelector } from 'react-redux';
import { nextStep, prevStep } from '../store/slices/formSlice';
import { RootState } from '../store/store';

const useFormNavigation = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.form.currentStep);

  const goToNextStep = () => dispatch(nextStep());
  const goToPrevStep = () => dispatch(prevStep());

  return { currentStep, goToNextStep, goToPrevStep };
};

export default useFormNavigation;