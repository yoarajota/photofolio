"use client"

import { Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Job } from "@/types"
import Link from "next/link"

function JobItem({ job }: { job: Job }) {
  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 items-center">
            <div>
              <p className="text-xs text-muted-foreground">Título</p>
              <p>{job.title}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Caminho</p>
              <p>{job.slug}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p>{job.active ? "Ativo" : "Inativo"}</p>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="icon" asChild>
                <Link href={job.slug} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/protected/jobs/${job.id}`} className="ml-2">
                  Editar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function JobsManager({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Páginas de Trabalhos</h3>
        <p className="text-sm text-muted-foreground">Lista de trabalhos disponíveis.</p>
      </div>

      <div className="space-y-2">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}