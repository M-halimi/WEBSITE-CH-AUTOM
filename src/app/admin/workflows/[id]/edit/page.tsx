import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WorkflowForm } from "@/components/admin/WorkflowForm";

export const dynamic = "force-dynamic";

interface EditWorkflowPageProps {
  params: {
    id: string;
  };
}

export default async function EditWorkflowPage({
  params,
}: EditWorkflowPageProps) {
  const [workflow, categories, platforms] = await Promise.all([
    prisma.workflow.findUnique({
      where: { id: params.id },
      include: {
        platforms: true,
        steps: { orderBy: { order: "asc" } },
      },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.platform.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!workflow) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Edit Workflow
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Modify configuration, visual steps, and status for: {workflow.title}
        </p>
      </div>

      <WorkflowForm
        initialData={workflow}
        categories={categories}
        platforms={platforms}
      />
    </div>
  );
}
