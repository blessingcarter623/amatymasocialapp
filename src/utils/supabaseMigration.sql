
-- This file is for reference only and should be executed manually in the Supabase SQL editor

-- Add is_admin field to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create merchandise table
CREATE TABLE IF NOT EXISTS merchandise (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image TEXT,
  category TEXT,
  available_sizes TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies for merchandise table

-- Enable RLS on merchandise table
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY merchandise_select_policy ON merchandise
  FOR SELECT USING (true);

-- Create policy for admin insert
CREATE POLICY merchandise_insert_policy ON merchandise
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create policy for admin update
CREATE POLICY merchandise_update_policy ON merchandise
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create policy for admin delete
CREATE POLICY merchandise_delete_policy ON merchandise
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create storage bucket for product images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to product images
CREATE POLICY product_images_select_policy ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow admin users to insert product images
CREATE POLICY product_images_insert_policy ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );
