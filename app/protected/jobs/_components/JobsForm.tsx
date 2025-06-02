import { Job } from "@/types";
import { ImageUploader } from "./ImageUploader";
import JobConfig from "./JobConfig";

interface JobsFormProps {
  setActiveTab?: (tab: string) => void;
  data?: Job;
}

export default function JobsForm({ setActiveTab, data }: JobsFormProps) {
  return (
    <>
      <JobConfig setActiveTab={setActiveTab} data={data} />

      {data?.id && (
        <>
          <div className="bg-border w-full h-[1px] my-6" />
          <ImageUploader />
        </>
      )}
    </>
  );
}
