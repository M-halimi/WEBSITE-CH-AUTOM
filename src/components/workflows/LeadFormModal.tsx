"use client";

import * as React from "react";
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Loader2, 
  Lock, 
  Zap 
} from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitLeadRequest } from "@/actions/leadActions";
import { generateLeadWhatsAppLink } from "@/lib/whatsapp";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowTitle?: string;
  workflowId?: string;
  workflowSlug?: string;
}

export function LeadFormModal({
  isOpen,
  onClose,
  workflowTitle,
  workflowId,
  workflowSlug,
}: LeadFormModalProps) {
  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [directWaLink, setDirectWaLink] = React.useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    if (workflowId) {
      formData.set("workflowId", workflowId);
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    const waUrl = generateLeadWhatsAppLink({
      name,
      email,
      whatsapp,
      company,
      message,
      workflowTitle,
    });
    setDirectWaLink(waUrl);

    const res = await submitLeadRequest(formData);
    setPending(false);

    if (res.success) {
      setSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}

      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }
    } else {
      setErrorMessage(res.error || "Failed to submit request.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 text-foreground">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-[#ffd233] flex items-center justify-center border border-amber-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Request Registered & WhatsApp Opening! 🚀</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
                Your blueprint details have been securely logged and WhatsApp has been triggered to connect you directly with our engineering team.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              {directWaLink && (
                <a href={directWaLink} target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button variant="default" size="lg" className="w-full justify-center gap-2 rounded-full bg-[#ffd233] text-black font-bold">
                    <MessageSquare className="h-4 w-4" />
                    Click here if WhatsApp didn&apos;t open
                  </Button>
                </a>
              )}
              <Button variant="outline" onClick={onClose} className="w-full rounded-full">
                Close & Continue
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black mb-2 shadow-xs">
                <Zap className="h-3.5 w-3.5 fill-current" />
                {workflowTitle ? "Deploy Automation" : "Custom Blueprint"}
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {workflowTitle ? `Get: ${workflowTitle}` : "Let's Build Your Workflow"}
              </h3>
              <p className="text-xs text-muted-foreground">
                Submit below to connect directly with our engineering team on WhatsApp.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} method="POST" className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Your Full Name *
                </label>
                <Input
                  required
                  name="name"
                  placeholder="e.g. Mohamed Alami"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    WhatsApp Phone *
                  </label>
                  <Input
                    required
                    type="tel"
                    name="whatsapp"
                    placeholder="+212 6..."
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Company / Store Name (Optional)
                </label>
                <Input
                  name="company"
                  placeholder="e.g. Atlas Commerce"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Specific Requirements or Notes
                </label>
                <Textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us what tools or accounts you use..."
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full h-12 text-xs sm:text-sm font-bold rounded-full gap-2 bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs"
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting to WhatsApp...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="h-4 w-4" />
                      Send to WhatsApp & Submit
                    </>
                  )}
                </Button>
              </div>

              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1 pt-1">
                <Lock className="h-3 w-3" />
                Direct WhatsApp connection to our engineering team.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
