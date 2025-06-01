"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { JobsManager } from "@/app/protected/_components/JobsManager";
import { useSearchParams } from "next/navigation";
import { getAllJobs } from "../../actions";
import JobsForm from "./JobsForm";
import { Job } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";

export default function JobsDashboard({ tab }: { tab?: string }) {
  const [activeTab, setActiveTab] = useState<string>(tab ?? "jobs");
  const [jobs, setJobs] = useState<Job[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("tab")) {
      setActiveTab(searchParams.get("tab") ?? "jobs");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsData = await getAllJobs();

      setJobs(jobsData);
    };

    fetchJobs();
  }, []);

  return (
    <Tabs
      defaultValue="jobs"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-4"
    >
      <TabsContent value="jobs" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Gerenciamento de Trabalhos Feitos
              <Button variant="outline" onClick={() => setActiveTab("new")}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Trabalho
              </Button>
            </CardTitle>
            <CardDescription>
              Configure as páginas dos trabalhos que você fez.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobsManager jobs={jobs} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="new" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "new" ? (
                <Button
                  size="icon"
                  variant="outline"
                  className="mr-2"
                  onClick={() => setActiveTab("jobs")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              ) : (
                <></>
              )}
              Crie ou altere a página de um trabalho
            </CardTitle>
            <CardDescription>
              Configure as páginas dos trabalhos que você fez.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobsForm setActiveTab={setActiveTab} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
