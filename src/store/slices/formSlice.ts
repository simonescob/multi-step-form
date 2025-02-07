import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  currentStep: number;
  formData: {
    name?: string;
    email?: string;
    phone?: string;
    plan?: string;
    addOns?: {
      service?: boolean;
      storage?: boolean;
      customization?: boolean;
    };
  };
}

const initialState: FormState = {
  currentStep: 1,
  formData: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
  },
});

export const { updateFormData, nextStep, prevStep } = formSlice.actions;
export default formSlice.reducer;