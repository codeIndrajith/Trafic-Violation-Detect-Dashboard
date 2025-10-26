import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../../config/firebase";

export interface PaymentData {
  userId: string;
  violationId: string;
  amount: number;
  amountInRS?: number;
  paypalOrderId: string;
  status: string;
  createTime: string;
  payerEmail: string;
}

export const createPayment = async (paymentData: PaymentData) => {
  try {
    const docRef = await addDoc(collection(database, "payments"), {
      ...paymentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Payment recorded with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding payment: ", error);
    throw error;
  }
};
