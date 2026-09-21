# Secure cloud setup

The Academy currently works locally. This folder prepares it for a real authenticated cloud backend without putting secrets in GitHub.

## Target provider
The scaffold targets Supabase for hosted Postgres, authentication, and Row Level Security.

## Required before activation
1. Create a Supabase project.
2. Run supabase-schema.sql in the SQL editor.
3. Tighten the class/student RLS policies for the school's actual roles and workflows.
4. Put only the public project URL and anon key in cloud-config.js.
5. Never put a service-role key, password, or private credential in this repository.
6. Enable the desired sign-in method in Supabase Auth.
7. Test separate teacher, caregiver, student, and administrator accounts before real student records are used.

Cloud authentication remains disabled until those steps are completed and verified.
