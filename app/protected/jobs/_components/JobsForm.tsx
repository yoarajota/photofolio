import { ImageUploader } from "./ImageUploader";
import JobConfig from "./JobConfig";

export default function JobsForm({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
return <>
    <JobConfig setActiveTab={setActiveTab} />
      <div className="bg-border w-full h-[1px] my-6" />
    <ImageUploader />
  </>
}