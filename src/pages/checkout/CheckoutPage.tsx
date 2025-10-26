import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaCheckCircle,
  FaPaypal,
  FaExclamationTriangle,
} from "react-icons/fa";
import { createPayment } from "../../utils/payment/payments";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
  const [amountInRS, setAmountInRS] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isPaypalEnabled, setIsPaypalEnabled] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const userId = "user123";
  const violationId = "violation";
  const exchangeRate = 303.7;

  // EmailJS configuration (replace with your actual credentials)
  const emailjsConfig = {
    serviceId: import.meta.env.VITE_SERVICE_ID,
    templateId: import.meta.env.VITE_TEMPLATE_ID2,
    publicKey: import.meta.env.VITE_PUBLIC_KEY,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_PAYPAL_SRC;
    script.addEventListener("load", () => {
      console.log("PayPal SDK loaded");
      if (isPaypalEnabled) {
        renderPayPalButtons();
      }
    });
    script.addEventListener("error", () => {
      setError("Failed to load PayPal SDK");
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isPaypalEnabled]);

  // Convert RS to USD and enable/disable PayPal button - FIXED CONVERSION
  useEffect(() => {
    if (
      amountInRS &&
      !isNaN(parseFloat(amountInRS)) &&
      parseFloat(amountInRS) > 0
    ) {
      const rsValue = parseFloat(amountInRS);
      // Fix: Proper rounding to 2 decimal places
      const usdValue = rsValue / exchangeRate;
      const roundedUsd = Math.round(usdValue * 100) / 100; // Proper rounding to 2 decimal places
      setConvertedAmount(roundedUsd);
      setIsPaypalEnabled(true);

      console.log(`Conversion: RS ${rsValue} = $${roundedUsd} USD`);
    } else {
      setConvertedAmount(0);
      setIsPaypalEnabled(false);
    }
  }, [amountInRS]);

  const renderPayPalButtons = () => {
    if (window.paypal && isPaypalEnabled) {
      // Clear any existing buttons
      const container = document.getElementById("paypal-button-container");
      if (container) {
        container.innerHTML = "";
      }

      window.paypal
        .Buttons({
          createOrder: function (data: any, actions: any) {
            console.log(
              "Creating PayPal order with amount:",
              convertedAmount,
              data
            );
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: convertedAmount.toFixed(2), // Ensure 2 decimal places
                    currency_code: "USD", // Added currency code
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

              // Create payment record - FIXED: Store both amounts
              await createPayment({
                userId,
                violationId,
                amount: convertedAmount,
                amountInRS: parseFloat(amountInRS), // Store RS amount as well
                paypalOrderId: details.id,
                status: details.status,
                createTime: details.create_time,
                payerEmail: details.payer.email_address,
              });

              console.log(data);

              // Send email using EmailJS - FIXED: Ensure amounts are correct
              await sendConfirmationEmail(details);

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

  const sendConfirmationEmail = async (paymentDetails: any) => {
    try {
      // FIXED: Ensure proper formatting of amounts
      const templateParams = {
        to_email: userInfo?.email,
        from_name: "Police Station",
        user_name: userInfo?.role,
        transaction_id: paymentDetails.id,
        amount_rs: parseFloat(amountInRS).toFixed(2), // Fixed: Ensure 2 decimal places
        amount_usd: convertedAmount.toFixed(2), // Fixed: Use the converted amount
        payment_date: new Date().toLocaleDateString(),
        status: paymentDetails.status,
      };

      console.log("Sending email with amounts:", {
        amount_rs: templateParams.amount_rs,
        amount_usd: templateParams.amount_usd,
        originalInput: amountInRS,
      });

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      console.log("Confirmation email sent successfully");
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't show error to user as payment was successful
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and one decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmountInRS(value);
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
            successfully. A confirmation email has been sent to your email
            address.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-3">Payment Details</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{paymentDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid (RS):</span>
                <span className="font-semibold">
                  RS {parseFloat(amountInRS).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid (USD):</span>
                <span className="font-semibold">
                  ${convertedAmount.toFixed(2)}
                </span>
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
          <div className="p-6 w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Enter Payment Amount
            </h2>

            <div className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount in Sri Lankan Rupees (RS)
                </label>
                <input
                  type="text"
                  id="amount"
                  value={amountInRS}
                  onChange={handleAmountChange}
                  placeholder="Enter amount in RS"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {amountInRS && !isNaN(parseFloat(amountInRS)) && (
                  <div className="text-sm text-gray-600 mt-2">
                    <p>Exchange rate: 1 USD = {exchangeRate} LKR</p>
                    <p className="font-semibold">
                      RS {parseFloat(amountInRS).toFixed(2)} = $
                      {convertedAmount.toFixed(2)} USD
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Payment Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount in RS:</span>
                    <span className="font-medium">
                      {amountInRS
                        ? `RS ${parseFloat(amountInRS).toFixed(2)}`
                        : "--"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount in USD:</span>
                    <span className="font-medium">
                      {convertedAmount > 0
                        ? `$${convertedAmount.toFixed(2)}`
                        : "--"}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      {convertedAmount > 0
                        ? `$${convertedAmount.toFixed(2)}`
                        : "--"}
                    </span>
                  </div>
                </div>
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
            <div id="paypal-button-container" className="mb-4">
              {!isPaypalEnabled && (
                <div className="text-center py-4 text-gray-500">
                  Please enter a valid amount in RS to enable PayPal payment
                </div>
              )}
            </div>

            {isProcessing && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-gray-600 mt-2">Processing payment...</p>
              </div>
            )}

            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
              <FaLock className="mr-2" />
              <span>Your payment is secured with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
