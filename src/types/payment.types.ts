import type { PaymentStatus } from './common.types';

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  refundId?: string;
  refundAmount?: number;
  invoice?: Invoice;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = 'razorpay' | 'upi' | 'card' | 'netbanking' | 'wallet';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  userId: string;
  expertName: string;
  technology: string;
  sessionDate: string;
  duration: number;
  baseAmount: number;
  discount: number;
  tax: number;
  totalAmount: number;
  currency: string;
  status: 'paid' | 'pending' | 'refunded';
  generatedAt: string;
  downloadUrl?: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'payout';
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string;
  expertName?: string;
  technology?: string;
  date: string;
  method: PaymentMethod;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  orderId: string;
  prefill: {
    name: string;
    email: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
}

export interface PaymentState {
  isProcessing: boolean;
  currentPayment: Payment | null;
  transactions: Transaction[];
  error: string | null;
}
