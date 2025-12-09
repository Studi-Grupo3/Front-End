import { useState, useEffect } from "react";
import { preferenceService } from "../../services/preferenceService";

export function usePreferenceId(amount, payerEmail) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPreference() {
      try {
        const response = await preferenceService.create(amount, payerEmail);
        console.log("📦 Resposta da preferência:", response);
        setPreferenceId(response.preferenceId || response.id); // Tenta ambos
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
