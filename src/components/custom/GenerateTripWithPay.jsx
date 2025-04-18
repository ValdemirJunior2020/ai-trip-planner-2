import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PropTypes from "prop-types";

// ✅ Define admin users
const ADMIN_EMAILS = ["infojr.83@gmail.com"];

function GenerateTripWithPay({ onTripGenerate, destination, days, budget, group }) {
  const [showPaypal, setShowPaypal] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = ADMIN_EMAILS.includes(user?.email);

  const validateFields = () => {
    if (!destination || !days || !budget || !group) {
      toast.error("🚫 Please complete all trip preferences before generating your trip.");
      return false;
    }
    return true;
  };

  const savePaymentLog = async (details) => {
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
      await onTripGenerate();
    } catch (err) {
      console.error("Trip generation failed:", err);
      toast.error("😓 Payment succeeded, but generating the trip failed.");
    }

    setLoading(false);
  };

  const handleClick = () => {
    if (!validateFields()) return;
    setShowPaypal(true);
  };

  const handleAdminGenerate = async () => {
    if (!validateFields()) return;
    setLoading(true);
    await onTripGenerate();
    setLoading(false);
  };

  return (
    <div className="my-10 justify-end flex flex-col items-center gap-4">
      {isAdmin && (
        <p className="text-green-400 text-sm font-semibold">
          Admin Access: Payment skipped
        </p>
      )}

      {isAdmin ? (
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold border-2 border-yellow-300 shadow-md hover:scale-105 transition-all duration-300 animate-glow"
          disabled={loading}
          onClick={handleAdminGenerate}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            <>👑 Generate Trip (Admin Free)</>
          )}
        </Button>
      ) : (
        <>
          {!showPaypal && (
            <Button
              className="bg-green-500 hover:bg-green-600 text-black font-bold"
              disabled={loading}
              onClick={handleClick}
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
              forceReRender={[loading]}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "1.99",
                      },
                    },
                  ],
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
              onCancel={() => {
                toast.error("❌ Payment cancelled.");
                setShowPaypal(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

GenerateTripWithPay.propTypes = {
  onTripGenerate: PropTypes.func.isRequired,
  destination: PropTypes.string,
  days: PropTypes.string,
  budget: PropTypes.string,
  group: PropTypes.string,
};

export default GenerateTripWithPay;
