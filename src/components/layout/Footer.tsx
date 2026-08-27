import Link from "next/link";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const waLink = generateWhatsAppLink({});

  return (
    <footer className="bg-black border-t border-[#232323] text-[#808080] text-sm py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="mb-8">
          <p className="text-base text-[#808080]">
            Questions? Contact our automation engineering team:{" "}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-medium inline-flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4 text-[#e50914]" />
              Direct WhatsApp Support
            </a>
          </p>
        </div>

        {/* 4-column footer links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#808080] mb-10">
          <ul className="space-y-3">
            <li>
              <Link href="/workflows" className="hover:underline">
                All Workflows Catalog
              </Link>
            </li>
            <li>
              <Link href="/workflows?category=whatsapp-messaging" className="hover:underline">
                WhatsApp Automations
              </Link>
            </li>
            <li>
              <Link href="/workflows?category=ecommerce-orders" className="hover:underline">
                Shopify & E-Commerce
              </Link>
            </li>
            <li>
              <Link href="/request" className="hover:underline">
                Custom Workflow Request
              </Link>
            </li>
          </ul>

          <ul className="space-y-3">
            <li>
              <Link href="/workflows?category=ai-smart-agents" className="hover:underline">
                OpenAI & GPT-4o Agents
              </Link>
            </li>
            <li>
              <Link href="/workflows?category=crm-lead-generation" className="hover:underline">
                Meta Ads & CRM Sync
              </Link>
            </li>
            <li>
              <Link href="/workflows?platform=n8n" className="hover:underline">
                n8n Blueprint Templates
              </Link>
            </li>
            <li>
              <Link href="/workflows?platform=make" className="hover:underline">
                Make.com Scenarios
              </Link>
            </li>
          </ul>

          <ul className="space-y-3">
            <li>
              <Link href="/workflows?category=finance-invoicing" className="hover:underline">
                Stripe & Invoicing
              </Link>
            </li>
            <li>
              <Link href="/workflows?difficulty=BEGINNER" className="hover:underline">
                Beginner Automations
              </Link>
            </li>
            <li>
              <Link href="/workflows?difficulty=ADVANCED" className="hover:underline">
                Advanced AI Workflows
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:underline">
                Admin Portal
              </Link>
            </li>
          </ul>

          <ul className="space-y-3">
            <li>
              <span className="text-[#808080]">Server Uptime: 99.9%</span>
            </li>
            <li>
              <span className="text-[#808080]">Security: Cloud API Encrypted</span>
            </li>
            <li>
              <span className="text-[#808080]">Delivery: 48-Hour Guarantee</span>
            </li>
            <li>
              <span className="text-[#808080]">contact@workflows.com</span>
            </li>
          </ul>
        </div>

        <div className="pt-6 border-t border-[#232323] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#808080]">
          <p>AutoFlows Hub Morocco & Global. All rights reserved.</p>
          <p className="text-[11px]">
            Powered by n8n, WhatsApp Cloud API & OpenAI GPT-4o.
          </p>
        </div>
      </div>
    </footer>
  );
}
