"use server";

import { createClient } from "@/utils/supabase/server";

export const getAllJobs = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  console.log(error);

  return data ?? [];
};
