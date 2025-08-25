declare module "@paystack/inline-js" {
    export interface PaystackOptions {
      key: string;
      email: string;
      amount: number;
      currency?: string;
      ref?: string;
      callback: (response: any) => void;
      onClose: () => void;
      metadata?: Record<string, unknown>;
    }
  
    export interface PaystackHandler {
      openIframe(): void;
    }
  
    export interface PaystackPop {
      setup(options: PaystackOptions): PaystackHandler;
    }
  
    const PaystackPop: PaystackPop;
    export default PaystackPop;  
  }
  