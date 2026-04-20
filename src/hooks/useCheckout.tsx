import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

const PRICE_ID = "grau_maturidade_unico";

export function useCheckout() {
  const [open, setOpen] = useState(false);

  const startCheckout = useCallback(() => {
    setOpen(true);
  }, []);

  const CheckoutDialog = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#7EBF8E]/20 p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-display text-white text-xl">
            Obter Grau de Maturidade
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {open && (
            <StripeEmbeddedCheckout
              priceId={PRICE_ID}
              returnUrl={`${window.location.origin}/login?paid=true&session_id={CHECKOUT_SESSION_ID}`}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return { startCheckout, CheckoutDialog };
}
