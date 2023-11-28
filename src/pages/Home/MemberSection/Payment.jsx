import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import PaymentFrom from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
  return (
    <div>
      <SectionTitle heading="Payment" subHeading="payment Now"></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <PaymentFrom></PaymentFrom>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
