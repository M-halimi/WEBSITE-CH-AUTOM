"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  Phone,
  Globe,
  Save,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateClientProfile } from "@/actions/clientAuthActions";

interface ClientProfileFormProps {
  user: any;
}

export function ClientProfileForm({ user }: ClientProfileFormProps) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateClientProfile(formData);
    setPending(false);

    if (res.success) {
      setSuccessMessage(res.message || "Profile updated successfully!");
      router.refresh();
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      setErrorMessage(res.error || "Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold">
          {errorMessage}
        </div>
      )}

      {/* Account Info Card */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
          <User className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
          Personal & Contact Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Full Name *
            </label>
            <Input
              name="name"
              defaultValue={user.name || ""}
              required
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Email Address (Account Identifier)
            </label>
            <Input
              value={user.email}
              disabled
              className="h-10 text-xs bg-muted dark:bg-[#121217] border-border dark:border-[#202026] text-muted-foreground cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Phone / WhatsApp Contact *
            </label>
            <Input
              name="phone"
              defaultValue={user.phone || ""}
              placeholder="+212600000000"
              className="h-10 text-xs font-mono bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Country
            </label>
            <Input
              name="country"
              defaultValue={user.country || "Morocco"}
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>
      </div>

      {/* Business Details Card */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
          <Building2 className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
          Company & Business Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Company / Brand Name
            </label>
            <Input
              name="company"
              defaultValue={user.company || ""}
              placeholder="e.g. Marrakech Artisanal Ltd."
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Business Model / Type
            </label>
            <Input
              name="businessType"
              defaultValue={user.businessType || "E-commerce"}
              placeholder="e.g. E-commerce / Agency / Services"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Industry / Niche
            </label>
            <Input
              name="industry"
              defaultValue={user.clientProfile?.industry || ""}
              placeholder="e.g. Fashion, COD, B2B Logistics"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Website or Store URL
            </label>
            <Input
              name="website"
              defaultValue={user.clientProfile?.website || ""}
              placeholder="https://example.com"
              className="h-10 text-xs font-mono bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          disabled={pending}
          className="h-11 px-8 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs gap-2 shadow-md shadow-[#ffd233]/20"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Profile...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Profile Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

