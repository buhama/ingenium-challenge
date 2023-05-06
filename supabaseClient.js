import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://ingenium-challenge.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycHlxanB5bmRubmFuZGdsZWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzODc5MzYsImV4cCI6MTk5ODk2MzkzNn0.EKdYI68NFxBzHusrVqxcVlSk6cwtavgP3ISplg7qGGI')
