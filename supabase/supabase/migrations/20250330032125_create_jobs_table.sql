-- Create the jobs table with UUID primary key
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    seo_description VARCHAR(160) NOT NULL,
    seo_keywords TEXT,
    slug VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Add constraints that match your Zod schema
    CONSTRAINT title_min_length CHECK (length(title) >= 3),
    CONSTRAINT slug_min_length CHECK (length(slug) >= 3),
    CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
    
    -- Ensure slug is unique
    CONSTRAINT unique_slug UNIQUE (slug)
);

-- Create an index on the slug for faster lookups
CREATE INDEX idx_jobs_slug ON jobs (slug);

-- Create a trigger to update the updated_at timestamp on row updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 

-- enable row level security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

create policy "ALL PERMISSIONS FOR AUTHENTICATED ON public.jobs" on "public"."jobs" as PERMISSIVE for ALL to authenticated using ( true ) with check ( true );

-- IMAGES
-- IMAGES
-- IMAGES

CREATE TABLE job_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    "path" TEXT NOT NULL,
    title TEXT,
    "description" TEXT,
    price TEXT,
    visible BOOLEAN DEFAULT TRUE,
    categories JSONB,
    watermark_config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_job_images_job_id ON job_images(job_id);

CREATE OR REPLACE FUNCTION validate_job_image_fields()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(NEW.description) > 255 THEN
        RAISE EXCEPTION 'Description must be 255 characters or less';
    END IF;
    IF LENGTH(NEW.price) > 50 THEN
        RAISE EXCEPTION 'Price must be 50 characters or less';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_job_images_fields
BEFORE INSERT OR UPDATE ON job_images
FOR EACH ROW
EXECUTE FUNCTION validate_job_image_fields();

CREATE TRIGGER update_job_images_updated_at
BEFORE UPDATE ON job_images
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE job_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ALL PERMISSIONS FOR AUTHENTICATED ON public.job_images" 
ON "public"."job_images" 
AS PERMISSIVE FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- BUCKET

INSERT INTO storage.buckets (id, name, public) 
VALUES ('job_images_public', 'job_images_public', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (
  bucket_id = 'job_images_public'
);

CREATE POLICY "Authenticated Users Can Upload" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'job_images_public'
);

CREATE POLICY "Authenticated Users Can Update Own Files" ON storage.objects
FOR UPDATE TO authenticated USING (
  bucket_id = 'job_images_public' AND (auth.uid() = owner)
);

CREATE POLICY "Authenticated Users Can Delete Own Files" ON storage.objects
FOR DELETE TO authenticated USING (
  bucket_id = 'job_images_public' AND (auth.uid() = owner)
);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('job_images_private', 'job_images_private', false)
ON CONFLICT DO NOTHING;

CREATE POLICY "Owners Only Select" ON storage.objects
FOR SELECT TO authenticated USING (
  bucket_id = 'job_images_private' AND (auth.uid() = owner)
);

CREATE POLICY "Authenticated Users Can Upload Private" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'job_images_private'
);

CREATE POLICY "Owners Only Update" ON storage.objects
FOR UPDATE TO authenticated USING (
  bucket_id = 'job_images_private' AND (auth.uid() = owner)
);

CREATE POLICY "Owners Only Delete" ON storage.objects
FOR DELETE TO authenticated USING (
  bucket_id = 'job_images_private' AND (auth.uid() = owner)
);

-- IMAGES
-- IMAGES
-- IMAGES

-- table relation between jobs and job_images

CREATE TABLE job_job_images (
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    job_image_id UUID NOT NULL REFERENCES job_images(id) ON DELETE CASCADE,
    PRIMARY KEY (job_id, job_image_id)
);

-- Create an index on the job_id for faster lookups
CREATE INDEX idx_job_job_images_job_id ON job_job_images(job_id);
-- Create an index on the job_image_id for faster lookups
CREATE INDEX idx_job_job_images_job_image_id ON job_job_images(job_image_id);

-- enable row level security
ALTER TABLE job_job_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ALL PERMISSIONS FOR AUTHENTICATED ON public.job_job_images"
ON "public"."job_job_images"
AS PERMISSIVE FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);