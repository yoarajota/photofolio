-- Create the posts table with UUID primary key
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    seo_description VARCHAR(160) NOT NULL,
    seo_keywords TEXT,
    slug VARCHAR(255) NOT NULL,
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
CREATE INDEX idx_posts_slug ON posts (slug);

-- Create a trigger to update the updated_at timestamp on row updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 

-- enable row level security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

create policy "ALL PERMISSIONS FOR AUTHENTICATED ON public.posts" on "public"."posts" as PERMISSIVE for ALL to authenticated using ( true ) with check ( true );