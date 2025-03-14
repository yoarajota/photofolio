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
import { ImageUploader } from "./ImageUploader";
import { useSearchParams } from "next/navigation";
import JobConfig from "./JobConfig";

export default function JobsDashboard({
  tab,
}: {
  tab?: string;
}) {
  const [activeTab, setActiveTab] = useState<string>(tab ?? "jobs");

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("tab")) {
      setActiveTab(searchParams.get("tab") ?? "jobs")
    }
  }, [searchParams])

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
            <CardTitle>Gerenciamento de Trabalhos Feitos</CardTitle>
            <CardDescription>
              Configure as páginas dos trabalhos que você fez.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobsManager />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="new" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Trabalhos Feitos</CardTitle>
            <CardDescription>
              Configure as páginas dos trabalhos que você fez.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobConfig />

            <div className="bg-border w-full h-[1px] my-6" />

            <ImageUploader />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
