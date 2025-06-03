import { ImageRegister, Job } from "@/types";
import { ImageUploader } from "./ImageUploader";
import JobConfig from "./JobConfig";

interface JobsFormProps {
  setActiveTab?: (tab: string) => void;
  data?: Job;
  images?: ImageRegister[];
}

export default function JobsForm({
  setActiveTab,
  data,
  images,
}: JobsFormProps) {
  return (
    <>
      <JobConfig setActiveTab={setActiveTab} data={data} />

      {data?.id && (
        <>
          <div className="bg-border w-full h-[1px] my-6" />

          <ImageUploader defaultImages={images} />
        </>
      )}
    </>
  );
}
