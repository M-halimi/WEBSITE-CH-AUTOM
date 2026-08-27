"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is AutoFlows Hub?",
    answer:
      "AutoFlows Hub is a specialized marketplace and agency for business automation workflows. We provide production-ready, verified blueprints for WhatsApp Cloud API, AI customer agents (GPT-4o), E-Commerce cart recovery, CRM synchronization, and automated PDF invoicing.",
  },
  {
    question: "How do these automations save me time and money?",
    answer:
      "By replacing repetitive manual work (such as answering customer FAQs, verifying orders, copying lead data into spreadsheets, or creating PDF invoices) with instant, automated pipelines that run 24/7 in under 3 seconds without hiring additional staff.",
  },
  {
    question: "What platforms and tools do you support?",
    answer:
      "Our workflows run natively on n8n (self-hosted or cloud), Make.com, WhatsApp Business Cloud API, OpenAI GPT-4o, Shopify, Google Sheets, Notion, Stripe, and Meta Lead Ads. We also provide raw JSON export files for 1-click import.",
  },
  {
    question: "How does the setup and deployment work?",
    answer:
      "You can choose any workflow from our catalog and either download the ready blueprint or hire our automation engineers to install, configure your API keys, and test everything directly on your accounts within 24–48 hours.",
  },
  {
    question: "Can I request a custom workflow tailored specifically for my business?",
    answer:
      "Yes! If your business has unique requirements, proprietary CRM systems, or complex multi-step AI logic, submit a brief via our Custom Request page or chat directly on WhatsApp. We design and deliver custom systems in 48–72 hours.",
  },
  {
    question: "Are my API keys, customer data, and accounts secure?",
    answer:
      "Absolutely. We never store your customer data or private API keys on external servers. All workflows run directly on your own n8n/Make instance and connect securely through official encrypted endpoints (e.g. Meta Cloud API, Stripe, OpenAI).",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-2 max-w-4xl mx-auto w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-[8px] bg-[#232323] hover:bg-[#2d2d2d] transition-colors overflow-hidden"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex items-center justify-between p-6 text-left text-white text-lg sm:text-2xl font-normal focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <span className="shrink-0 ml-4">
                {isOpen ? (
                  <X className="h-6 w-6 sm:h-8 sm:w-8 text-white transition-transform" />
                ) : (
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-white transition-transform" />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-[#cbd5e1] text-sm sm:text-base leading-relaxed border-t border-[#414141]/40 animate-in fade-in-50 duration-150">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
