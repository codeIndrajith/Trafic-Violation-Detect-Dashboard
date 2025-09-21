import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaCheckCircle,
  FaUser,
  FaFileAlt,
  FaCreditCard,
  FaPaypal,
  FaExclamationTriangle,
} from "react-icons/fa";
import { createPayment } from "../../utils/payment/payments";

declare global {
  interface Window {
    paypal: any;
  }
}

const CheckoutPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const userId = "user123";
  const violationId = "violation456";
  const amount = 25.0;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_PAYPAL_SRC;
    script.addEventListener("load", () => {
      console.log("PayPal SDK loaded");
      renderPayPalButtons();
    });
    script.addEventListener("error", () => {
      setError("Failed to load PayPal SDK");
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const renderPayPalButtons = () => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: function (data: any, actions: any) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                  },
                },
              ],
            });
          },
          onApprove: async function (data: any, actions: any) {
            setIsProcessing(true);
            setError(null);

            try {
              const details = await actions.order.capture();
              setPaymentDetails(details);
              await createPayment({
                userId,
                violationId,
                amount,
                paypalOrderId: details.id,
                status: details.status,
                createTime: details.create_time,
                payerEmail: details.payer.email_address,
              });

              setPaymentSuccess(true);
            } catch (error) {
              console.error("Payment failed:", error);
              setError("Payment processing failed. Please try again.");
            } finally {
              setIsProcessing(false);
            }
          },
          onError: function (err: any) {
            setError(
              "An error occurred with the PayPal payment. Please try again."
            );
            console.error("PayPal error:", err);
          },
        })
        .render("#paypal-button-container");
    }
  };

  if (paymentSuccess && paymentDetails) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-3">Payment Details</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{paymentDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold capitalize">
                  {paymentDetails.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payer Email:</span>
                <span className="font-medium">
                  {paymentDetails.payer.email_address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold flex items-center">
                  <FaPaypal className="text-blue-500 mr-1" /> PayPal
                </span>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            onClick={() => setPaymentSuccess(false)}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="">
        <div className="text-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 mt-2">
            Securely pay your violation fee using PayPal
          </p>
        </div>

        <div className="bg-white flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 w-full md:w-1/2 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Violation Fee</span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Method
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                  <FaPaypal className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold">PayPal</h3>
                  <p className="text-sm text-gray-600">
                    Pay securely with your PayPal account
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
                <FaExclamationTriangle className="mr-2" />
                {error}
              </div>
            )}

            {/* PayPal button container */}
            <div id="paypal-button-container" className="mb-4"></div>

            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
              <FaLock className="mr-2" />
              <span>Your payment is secured with SSL encryption</span>
            </div>
          </div>
        </div>
        {/* Order Details */}
        <div className="bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium">{userId}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaFileAlt className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Violation ID</p>
                <p className="font-medium">{violationId}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaCreditCard className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-medium">${amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By completing your payment, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
