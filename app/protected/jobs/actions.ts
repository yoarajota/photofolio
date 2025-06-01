"use server";

import { Job } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const saveJob = async (job: Job) => {
  const supabase = await createClient();

  return await supabase.from("jobs").insert(job).select("*");
};
