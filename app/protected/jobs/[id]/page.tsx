import JobsForm from "@/app/protected/jobs/_components/JobsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJob } from "../actions";
import { Job } from "@/types";

export default async function Web(props: {
  params: Promise<{ id: number }>;
}) {
  const params: {
    id: number;
  } = await props.params;

  const job = await getJob(params.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Altere a página de um trabalho</CardTitle>
        <CardDescription>
          Configure as páginas dos trabalhos que você fez.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobsForm 
          data={job.data as Job}
        />
      </CardContent>
    </Card>
  );
}
