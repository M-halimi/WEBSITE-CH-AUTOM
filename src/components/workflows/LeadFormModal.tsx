"use client";

import * as React from "react";
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Loader2,
  Lock,
  ArrowRight
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

    // Generate direct WhatsApp Link with all lead details
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

      // Automatically open WhatsApp in new tab with the structured lead message
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }
    } else {
      setErrorMessage(res.error || "Failed to submit request.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-5 animate-in fade-in-50">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Opening WhatsApp & Saved! 🚀</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
                Your request details have been saved in our CRM and WhatsApp has been opened automatically.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              {directWaLink && (
                <a href={directWaLink} target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button variant="whatsapp" size="lg" className="w-full justify-center gap-2 font-bold shadow-md shadow-emerald-500/20">
                    <MessageSquare className="h-5 w-5" />
                    Click here if WhatsApp didn&apos;t open
                  </Button>
                </a>
              )}
              <Button variant="outline" onClick={onClose} className="w-full">
                Close & Browse More
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                {workflowTitle ? "Get This Automation" : "Custom Automation Request"}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {workflowTitle ? `Deploy: ${workflowTitle}` : "Let's Build Your Custom Workflow"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submit below to instantly connect on WhatsApp and register your project with our engineering team.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Your Full Name *
                </label>
                <Input
                  required
                  name="name"
                  placeholder="e.g. Mohamed Alami"
                  className="h-10 text-sm"
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
                    className="h-10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Your WhatsApp Number *
                  </label>
                  <Input
                    required
                    type="tel"
                    name="whatsapp"
                    placeholder="+212 6..."
                    className="h-10 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Company / Brand Name (Optional)
                </label>
                <Input
                  name="company"
                  placeholder="e.g. Acme Agency"
                  className="h-10 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Additional Notes / Specific Requirements
                </label>
                <Textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us any specific tools or accounts you use..."
                  className="text-sm"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full h-11 text-sm font-bold gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20"
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

              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" />
                Direct WhatsApp transmission + Secure CRM storage.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
