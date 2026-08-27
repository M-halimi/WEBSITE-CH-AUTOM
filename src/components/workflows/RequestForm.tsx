"use client";

import * as React from "react";
import { Send, Loader2, CheckCircle2, MessageSquare, Lock } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitLeadRequest } from "@/actions/leadActions";
import { generateLeadWhatsAppLink } from "@/lib/whatsapp";

export function RequestForm() {
  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [directWaLink, setDirectWaLink] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

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
    });
    setDirectWaLink(waUrl);

    const res = await submitLeadRequest(formData);
    setPending(false);

    if (res.success) {
      setSubmitted(true);
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      } catch (err) {}

      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }
    } else {
      setErrorMessage(res.error || "Failed to submit request.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-5">
        <div className="mx-auto h-16 w-16 rounded-full bg-[#e8f5e9] text-[#258635] flex items-center justify-center">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#222222]">Brief Saved & Opening WhatsApp! 🚀</h3>
          <p className="text-sm text-[#595959] mt-2 max-w-md mx-auto leading-relaxed">
            Your project details have been logged in our database and forwarded to WhatsApp so our team can answer immediately.
          </p>
        </div>
        <div className="pt-2">
          {directWaLink && (
            <a href={directWaLink} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="lg" className="gap-2 font-semibold rounded-full">
                <MessageSquare className="h-4 w-4" />
                Click here if WhatsApp didn&apos;t open automatically
              </Button>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3 rounded-[8px] bg-[#ffebee] border border-[#b3261e] text-[#b3261e] text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#222222] block mb-1">
            Your Full Name *
          </label>
          <Input required name="name" placeholder="Mohamed Alami" className="h-11" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#222222] block mb-1">
            Email Address *
          </label>
          <Input required type="email" name="email" placeholder="mohamed@company.ma" className="h-11" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#222222] block mb-1">
            WhatsApp Phone Number *
          </label>
          <Input required type="tel" name="whatsapp" placeholder="+212 6..." className="h-11" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#222222] block mb-1">
            Company / Brand Name
          </label>
          <Input name="company" placeholder="e.g. Atlas Commerce" className="h-11" />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#222222] block mb-1">
          Describe Your Automation Requirement *
        </label>
        <Textarea
          required
          name="message"
          rows={4}
          placeholder="e.g. We want to automatically send WhatsApp PDF invoices whenever a Shopify order is paid, and sync the customer info to Google Sheets."
          className="text-sm leading-relaxed"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={pending}
          size="lg"
          className="w-full font-semibold bg-[#f1641e] hover:bg-[#d44e0d] text-white text-sm h-12 gap-2 rounded-full shadow-sm"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Opening WhatsApp...
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4" />
              Submit Brief & Open WhatsApp Chat
            </>
          )}
        </Button>
      </div>

      <p className="text-[11px] text-[#757575] text-center flex items-center justify-center gap-1">
        <Lock className="h-3 w-3" />
        Direct WhatsApp transmission to our lead engineering team.
      </p>
    </form>
  );
}
