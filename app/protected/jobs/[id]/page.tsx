import JobsForm from "@/app/protected/jobs/_components/JobsDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Web(props: {
  searchParams: Promise<{
    tab?: string;
  }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Altere a página de um trabalho</CardTitle>
        <CardDescription>
          Configure as páginas dos trabalhos que você fez.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobsForm />
      </CardContent>
    </Card>
  );
}
