import { prisma } from "@/lib/prisma";
import { getAllPlatforms } from "@/lib/ensurePlatforms";
import { WorkflowForm } from "@/components/admin/WorkflowForm";

export const dynamic = "force-dynamic";

export default async function NewWorkflowPage() {
  const [categories, platforms] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    getAllPlatforms(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Create New Workflow
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Add a new verified automation template to the marketplace catalog.
        </p>
      </div>

      <WorkflowForm categories={categories} platforms={platforms} />
    </div>
  );
}
