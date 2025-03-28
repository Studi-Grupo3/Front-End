import { useState, useEffect } from "react";
import { paymentService } from "../services/PreferenceService";

export function usePreferenceId(amount, payerEmail) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPreference() {
      try {
        const response = await paymentService.createPreference(amount, payerEmail);
        setPreferenceId(response.preferenceId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPreference();
  }, [amount, payerEmail]);

  return { preferenceId, loading, error };
}
