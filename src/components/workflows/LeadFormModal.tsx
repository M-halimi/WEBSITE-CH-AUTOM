"use client";

import * as React from "react";
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Loader2,
  Lock
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-lg rounded-[8px] border border-[#414141] bg-[#232323] p-6 sm:p-8 animate-in zoom-in-95 duration-150 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-[6px] p-2 text-[#808080] hover:bg-[#2d2d2d] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-5">
            <div className="mx-auto h-14 w-14 rounded-[8px] bg-[#161616] border border-[#e50914] flex items-center justify-center text-[#e50914]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Opening WhatsApp & Saved! 🚀</h3>
              <p className="text-xs sm:text-sm text-[#808080] mt-2 max-w-sm mx-auto leading-relaxed">
                Your request details have been saved in our CRM and WhatsApp has been opened automatically.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              {directWaLink && (
                <a href={directWaLink} target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button variant="default" size="lg" className="w-full justify-center gap-2 font-medium">
                    <MessageSquare className="h-5 w-5" />
                    Click here if WhatsApp didn&apos;t open
                  </Button>
                </a>
              )}
              <Button variant="secondary" onClick={onClose} className="w-full">
                Close & Browse More
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-xs font-medium bg-[#161616] text-[#e50914] border border-[#414141] mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                {workflowTitle ? "Get This Automation" : "Custom Automation Request"}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                {workflowTitle ? `Deploy: ${workflowTitle}` : "Let's Build Your Custom Workflow"}
              </h3>
              <p className="text-xs text-[#808080] leading-relaxed">
                Submit below to connect directly on WhatsApp and register your project with our team.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-[8px] bg-[#e50914]/10 border border-[#e50914] text-[#e50914] text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-white block mb-1">
                  Your Full Name *
                </label>
                <Input
                  required
                  name="name"
                  placeholder="e.g. Mohamed Alami"
                  className="h-11 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-white block mb-1">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    className="h-11 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white block mb-1">
                    Your WhatsApp Number *
                  </label>
                  <Input
                    required
                    type="tel"
                    name="whatsapp"
                    placeholder="+212 6..."
                    className="h-11 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white block mb-1">
                  Company / Brand Name (Optional)
                </label>
                <Input
                  name="company"
                  placeholder="e.g. Acme Agency"
                  className="h-11 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-white block mb-1">
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
                  className="w-full h-12 text-base font-medium gap-2 bg-[#e50914] hover:bg-[#c11119] text-white"
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

              <p className="text-[11px] text-[#808080] text-center flex items-center justify-center gap-1">
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
