import Link from "next/link";
import { MessageSquare, Heart, ShieldCheck, Zap } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const waLink = generateWhatsAppLink({});

  return (
    <footer className="bg-white border-t border-[#d6d6d6] text-[#222222]">
      {/* Warm Cream Seller/Custom Banner */}
      <div className="bg-[#fdf6e8] border-b border-[#f5e8c8] py-8">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-[#a66523]">
            Have a unique business workflow to automate?
          </h3>
          <p className="text-xs sm:text-sm text-[#595959] max-w-xl mx-auto">
            Our certified automation engineers design and deploy custom n8n & WhatsApp pipelines in 48 hours.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/request">
              <span className="inline-flex items-center justify-center px-5 py-2 rounded-full text-xs font-semibold bg-[#f1641e] text-white hover:bg-[#d44e0d] transition-colors">
                Request Custom Workflow
              </span>
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center justify-center px-5 py-2 rounded-full text-xs font-semibold bg-white text-[#222222] border border-[#bdbdbd] hover:bg-[#f6f6f6] transition-colors gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-[#f1641e]" />
                WhatsApp Us
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Links */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#222222]">Shop Workflows</h4>
            <ul className="space-y-2 text-[#595959]">
              <li><Link href="/workflows" className="hover:text-[#f1641e] hover:underline">All Blueprints</Link></li>
              <li><Link href="/workflows?category=whatsapp-messaging" className="hover:text-[#f1641e] hover:underline">WhatsApp Cloud API</Link></li>
              <li><Link href="/workflows?category=ai-smart-agents" className="hover:text-[#f1641e] hover:underline">AI GPT-4o Customer Agents</Link></li>
              <li><Link href="/workflows?category=ecommerce-orders" className="hover:text-[#f1641e] hover:underline">E-Commerce & Shopify</Link></li>
              <li><Link href="/workflows?category=crm-lead-generation" className="hover:text-[#f1641e] hover:underline">Meta Ads & CRM Sync</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#222222]">Engines & Platforms</h4>
            <ul className="space-y-2 text-[#595959]">
              <li><Link href="/workflows?platform=n8n" className="hover:text-[#f1641e] hover:underline">n8n Community & Cloud</Link></li>
              <li><Link href="/workflows?platform=make" className="hover:text-[#f1641e] hover:underline">Make.com Blueprints</Link></li>
              <li><Link href="/workflows?platform=openai" className="hover:text-[#f1641e] hover:underline">OpenAI Function Calling</Link></li>
              <li><Link href="/workflows?platform=stripe" className="hover:text-[#f1641e] hover:underline">Stripe & Auto-Invoicing</Link></li>
              <li><Link href="/workflows?platform=google-sheets" className="hover:text-[#f1641e] hover:underline">Google Sheets Sync</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#222222]">Custom Services</h4>
            <ul className="space-y-2 text-[#595959]">
              <li><Link href="/request" className="hover:text-[#f1641e] hover:underline">Bespoke Workflow Request</Link></li>
              <li><Link href="/request" className="hover:text-[#f1641e] hover:underline">Turnkey 48-Hour Setup</Link></li>
              <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#f1641e] hover:underline">Engineering Consultation</a></li>
              <li><Link href="/admin" className="hover:text-[#f1641e] hover:underline">Admin Management Portal</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#222222]">Security & Guarantee</h4>
            <ul className="space-y-2 text-[#595959]">
              <li className="flex items-center gap-1.5 text-[#258635] font-medium">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Code Ownership
              </li>
              <li><span>Zero recurring platform lock-in fees</span></li>
              <li><span>Cloud API end-to-end encrypted</span></li>
              <li><span>Guaranteed 24/7 reliability</span></li>
            </ul>
          </div>
        </div>

        {/* Legal Strip */}
        <div className="mt-12 pt-6 border-t border-[#e6e6e6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#757575]">
          <div className="flex items-center gap-2">
            <span className="etsy-wordmark text-lg text-[#f1641e]">AutoFlows</span>
            <span>© 2026 AutoFlows Hub Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/workflows" className="text-[#258ddb] hover:underline">Marketplace Catalog</Link>
            <Link href="/request" className="text-[#258ddb] hover:underline">Custom Orders</Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-[#258ddb] hover:underline">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
