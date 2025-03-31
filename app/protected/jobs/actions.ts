"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const a = async (formData: FormData) => {
  const supabase = await createClient();

  return redirect("/protected");
};