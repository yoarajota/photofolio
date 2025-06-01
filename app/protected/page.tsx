import DashboardTab from "@/app/protected/_components/DashboardTab";

export default async function Web(props: {
  searchParams: Promise<{
    tab?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Gerencie seu portfólio, imagens e vendas em um só lugar.
        </p>
      </div>

      <DashboardTab tab={searchParams.tab} />
    </>
  );
}
