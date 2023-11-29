import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const PaymentFrom = () => {
  const prices = useLoaderData();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const price = prices[0].price;
  // console.log(prices[0]);

  const { data = [], refetch } = useQuery({
    queryKey: ["PaymentUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);

      return res.data;
    },
  });
  // console.log(data[0]);
  const userInfo = {
    Image: data[0]?.Image,
    badge: prices[0]?.plan,
    email: data[0]?.email,
    name: data[0]?.name,
  };
  // console.log(userInfo);
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment Error", error);
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log(confirmError);
    }
    if (paymentIntent.status === "succeeded") {
      const update = await axiosSecure.patch(`/users/${data[0]._id}`, userInfo);

      console.log(update);
      if (update.data.modifiedCount > 0) {
        // reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: ` updated to the Badge`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setTransactionId(paymentIntent.id);
      const payment = {
        email: user.email,
        transactionId: paymentIntent.id,
        date: new Date(),
        // cartIds: cart.map((item) => item._id),
        // menuItemIds: cart.map((item) => item.menuId),
        status: "pending",
      };

      const res = await axiosSecure.post("/payment", payment);

      if (res?.data?.paymentResult?.acknowledged) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Payment!",
          text: "Your Payment has been Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}></CardElement>
      <button className="btn btn-outline bg-orange-400 my-10 " type="submit">
        Pay
      </button>
      <p className="text-red-600 text-lg">{error}</p>
      {transactionId && (
        <p className="text-blue-600 text-lg">
          Your transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default PaymentFrom;
