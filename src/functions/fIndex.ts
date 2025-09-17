const functions = require("firebase-functions");
const Stripe = require("stripe");
const stripe = new Stripe(functions.config().stripe.secret); // store secret key in env

exports.createPaymentLink = functions.https.onCall(async (data: any) => {
  const { fine, reportId } = data;

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Traffic Violation Fine - Report ${reportId}`,
          },
          unit_amount: fine * 100,
        },
        quantity: 1,
      },
    ],
  });

  return { url: paymentLink.url };
});
