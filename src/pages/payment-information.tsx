import Image from 'next/image';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { QrCode, CreditCard, Link, Mail } from 'lucide-react';

interface PaymentInfo {
  qrCode: string;
  timeout: number;
  amount: number;
  address: string;
  status: string;
  email?: string;
}

const PaymentInformationPage: React.FC = () => {
  const router = useRouter();

  const safeExtractParam = (param: string | string[] | undefined): string | undefined => {
    return Array.isArray(param) ? param[0] : param;
  };

  const paymentInfo = useMemo<PaymentInfo | null>(() => {
    const qrCode = safeExtractParam(router.query.qrCode);
    const timeout = safeExtractParam(router.query.timeout);
    const amount = safeExtractParam(router.query.amount);
    const address = safeExtractParam(router.query.address);
    const status = safeExtractParam(router.query.status);
    const email = safeExtractParam(router.query.email);

    if (!qrCode || !timeout || !amount || !address || !status) {
      return null;
    }

    return {
      qrCode,
      timeout: parseInt(timeout, 10),
      amount: parseFloat(amount),
      address,
      status,
      email
    };
  }, [router.query]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!paymentInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading payment information...</p>
          <p className="text-sm text-gray-500 mt-2">
            If this takes too long, please return to the previous page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-4">
          <h1 className="text-2xl font-bold">Payment Information</h1>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="border-4 border-blue-200 rounded-lg p-2">
              <Image 
                src={paymentInfo.qrCode} 
                alt="Payment QR Code" 
                width={250} 
                height={250} 
                priority 
                className="rounded-md"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <CreditCard className="mr-3 text-blue-500" size={24} />
              <span>
                <strong>Amount:</strong> {formatPrice(paymentInfo.amount)}
              </span>
            </div>
            
            <div className="flex items-center">
              <QrCode className="mr-3 text-green-500" size={24} />
              <span>
                <strong>Address:</strong> {truncateAddress(paymentInfo.address)}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 text-green-500" size={24} />
              <span>
                <strong>email:</strong> {paymentInfo.email}
              </span>
            </div>
            
            
            <div className="flex items-center">
              <Link className="mr-3 text-purple-500" size={24} />
              <a 
                href={paymentInfo.status} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Check Payment Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformationPage;