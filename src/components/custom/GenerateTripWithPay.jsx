import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PropTypes from "prop-types";

function GenerateTripWithPay({ onTripGenerate }) {
  const [showPaypal, setShowPaypal] = useState(false);
  const [loading, setLoading] = useState(false);

  const savePaymentLog = async (details) => {
    const user = JSON.parse(localStorage.getItem("user"));

    await setDoc(doc(db, "TripPayments", details.id), {
      userEmail: user?.email || "unknown",
      amount: 1.99,
      paidAt: new Date().toISOString(),
      payerName: details?.payer?.name?.given_name,
      status: "PAID",
      tripGenerated: false,
    });
  };

  const handlePaymentApproved = async (details) => {
    const name = details?.payer?.name?.given_name || "Traveler";
    toast.success(`🎉 Payment successful! Welcome, ${name}. Generating your trip...`);
    setShowPaypal(false);
    setLoading(true);

    try {
      await savePaymentLog(details);
      await onTripGenerate(); // Run trip generation function
    } catch (err) {
      console.error("Trip generation failed:", err);
      toast.error("😓 Payment succeeded, but generating the trip failed.");
    }

    setLoading(false);
  };

  return (
    <div className="my-10 justify-end flex flex-col items-center gap-4">
      {!showPaypal && (
        <Button
          className="bg-green-500 hover:bg-green-600 text-black font-bold"
          disabled={loading}
          onClick={() => setShowPaypal(true)}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip - $1.99"
          )}
        </Button>
      )}

      {showPaypal && (
        <PayPalButtons
          style={{ layout: "vertical" }}
          disabled={loading}
          forceReRender={[loading]} // ensures re-render if state changes
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: "1.99",
                },
              }],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            await handlePaymentApproved(details);
          }}
          onError={(err) => {
            toast.error("❌ Payment error. Please try again.");
            console.error("PayPal Error:", err);
          }}
        />
      )}
    </div>
  );
}

GenerateTripWithPay.propTypes = {
  onTripGenerate: PropTypes.func.isRequired,
};

export default GenerateTripWithPay;
