

import JobsDashboard from "@/components/pages/protected/jobs/JobsDashboard";

export default async function Web() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Trabalhos</h1>
        <p className="text-muted-foreground">Gerencie seu portfólio, imagens e vendas em um só lugar.</p>

        <JobsDashboard />
      </div>
    </>
    )
}

