import JobsDashboard from "@/app/protected/jobs/_components/JobsDashboard";

export default async function Web(props: {
  searchParams: Promise<{
    tab?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Trabalhos</h1>
        <p className="text-muted-foreground">
          Gerencie seu portfólio, imagens e vendas em um só lugar.
        </p>

        <JobsDashboard tab={searchParams.tab} />
      </div>
    </>
  );
}
