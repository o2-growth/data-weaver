import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Checkout temporariamente desativado.
 * O CTA leva o usuário direto para o login (modo livre / remix).
 */
export function useCheckout() {
  const navigate = useNavigate();

  const startCheckout = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return { startCheckout, CheckoutDialog: null };
}
