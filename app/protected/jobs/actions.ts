"use server";

import { ImageRegister, Job } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const saveJob = async (job: Job) => {
  const supabase = await createClient();

  return await supabase.from("jobs").insert(job).select("*").single();
};

export const updateJob = async (job: Job) => {
  const supabase = await createClient();

  return await supabase
    .from("jobs")
    .update(job)
    .eq("id", job.id)
    .select("*")
    .single();
};

export const getJob = async (id: string) => {
  const supabase = await createClient();

  return await supabase.from("jobs").select("*").eq("id", id).single();
};

export const getJobImages = async (jobId: string) => {
  const supabase = await createClient();

  return await supabase
    .from("job_images")
    .select(
      `
      *
    `
    )
    .eq(
      "id",
      supabase.from("job_job_images").select("job_image_id").eq("job_id", jobId)
    )
    .order("created_at", { ascending: false });
};

export const getJobImagesWithJoin = async (jobId: string) => {
  const supabase = await createClient();

  return await supabase
    .from("job_job_images")
    .select(
      `
      job_image_id,
      job_images!inner(*)
    `
    )
    .eq("job_id", jobId)
    .order("job_images.created_at", { ascending: false });
};

export const getJobImage = async (id: string) => {
  const supabase = await createClient();

  return await supabase.from("job_images").select("*").eq("id", id).single();
};

export const saveJobImage = async (
  image: Omit<ImageRegister, "id" | "preview">,
  jobId: string,
  file: File
) => {
  const supabase = await createClient();
  try {
    const visible = image.visible !== undefined ? image.visible : true;

    let path = null;

    if (visible) {
      ({ path } = await uploadPublicImage(file, `jobs/${jobId}/images`));
    } else {
      ({ path } = await uploadPrivateImage(file, `jobs/${jobId}/images`));
    }

    const imageData = {
      path,
      title: image.title || null,
      description: image.description || null,
      price: image.price || null,
      visible,
      categories: image.categories ? JSON.stringify(image.categories) : null,
      watermark_config: image.watermark_config
        ? JSON.stringify(image.watermark_config)
        : null,
    };

    const { data: newImage, error: imageError } = await supabase
      .from("job_images")
      .insert(imageData)
      .select("id")
      .single();

    if (imageError) {
      throw imageError;
    }

    const { error: relationError } = await supabase
      .from("job_job_images")
      .insert({
        job_id: jobId,
        job_image_id: newImage.id,
      });

    if (relationError) {
      throw relationError;
    }

    return true;
  } catch (error) {
    console.error("Error saving job image:", error);

    return false;
  }
};

export const updateJobImage = async (
  image: Partial<ImageRegister> & { id: string }
) => {
  const supabase = await createClient();

  return await supabase
    .from("job_images")
    .update(image)
    .eq("id", image.id)
    .select("*")
    .single();
};

export const deleteJobImage = async (id: string) => {
  const supabase = await createClient();

  return await supabase.from("job_images").delete().eq("id", id);
};

export const uploadPublicImage = async (file: File, path: string) => {
  const supabase = await createClient();

  const fileExt = file.name.split(".").pop();

  const fileName = `${new Date().getTime()}.${fileExt}`;
  const fullPath = `${path}/${fileName}`;

  const { error } = await supabase.storage
    .from("job_images_public")
    .upload(fullPath, file);

  if (error) {
    throw error;
  }

  return { path: fullPath };
};

export const uploadPrivateImage = async (file: File, path: string) => {
  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${new Date().getTime()}.${fileExt}`;
  const fullPath = `${path}/${fileName}`;

  const { error } = await supabase.storage
    .from("job_images_private")
    .upload(fullPath, file);

  if (error) {
    throw error;
  }

  return { path: fullPath };
};
