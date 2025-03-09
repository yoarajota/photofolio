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
import { JobsManager } from "@/components/pages/protected/JobsManager";
import { useSearchParams } from "next/navigation";
import { ImageUploader } from "./ImageUploader";

export default function JobsDashboard({ tab }: { tab?: string }) {
  const [activeTab, setActiveTab] = useState<string>(tab ?? "overview");
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("tab")) {
      setActiveTab(searchParams.get("tab") ?? "overview")
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
      <TabsContent value="jobs" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Trabalhos Feitos</CardTitle>
            <CardDescription>
              Configure as páginas dos trabalhos que você fez.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploader />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
