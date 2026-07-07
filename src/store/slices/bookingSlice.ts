import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BookingFormData, BookingStep } from '@/types';

interface BookingState {
  currentStep: number;
  steps: BookingStep[];
  formData: Partial<BookingFormData>;
  isProcessing: boolean;
  error: string | null;
}

const initialSteps: BookingStep[] = [
  { id: 1, title: 'Select Date', description: 'Choose your preferred date', isCompleted: false, isActive: true },
  { id: 2, title: 'Select Time', description: 'Pick a time slot', isCompleted: false, isActive: false },
  { id: 3, title: 'Confirm Session', description: 'Review session details', isCompleted: false, isActive: false },
  { id: 4, title: 'Payment', description: 'Complete payment', isCompleted: false, isActive: false },
  { id: 5, title: 'Booking Confirmed', description: 'Session booked!', isCompleted: false, isActive: false },
];

const initialState: BookingState = {
  currentStep: 1,
  steps: initialSteps,
  formData: {},
  isProcessing: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      state.steps = state.steps.map(step => ({
        ...step,
        isActive: step.id === action.payload,
        isCompleted: step.id < action.payload,
      }));
    },
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
        state.steps = state.steps.map(step => ({
          ...step,
          isActive: step.id === state.currentStep,
          isCompleted: step.id < state.currentStep,
        }));
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        state.steps = state.steps.map(step => ({
          ...step,
          isActive: step.id === state.currentStep,
          isCompleted: step.id < state.currentStep,
        }));
      }
    },
    updateFormData: (state, action: PayloadAction<Partial<BookingFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setBookingError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const { setStep, nextStep, prevStep, updateFormData, setProcessing, setBookingError, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
