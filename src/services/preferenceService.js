import { apiFetch } from "./api";

export const preferenceService = {
  async createPreference(amount, payerEmail) {
    return apiFetch("/payments/preference", {
      method: "POST",
      body: JSON.stringify({ amount, payer_email: payerEmail }),
    });
  },
};
