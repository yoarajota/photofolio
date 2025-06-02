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
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Web(props: { params: Promise<{ id: number }> }) {
  const params: {
    id: number;
  } = await props.params;

  const job = await getJob(params.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="/protected/jobs">
            <Button size="icon" variant="outline" className="mr-2">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          
          Altere a página de um trabalho
        </CardTitle>
        <CardDescription>
          Configure as páginas dos trabalhos que você fez.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobsForm data={job.data as Job} />
      </CardContent>
    </Card>
  );
}
