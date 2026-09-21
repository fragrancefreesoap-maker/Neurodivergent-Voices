create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, role text not null check (role in ('teacher','caregiver','student','admin')), display_name text, created_at timestamptz not null default now());
create table if not exists public.classes (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, name text not null, created_at timestamptz not null default now());
create table if not exists public.class_members (class_id uuid not null references public.classes(id) on delete cascade, student_id uuid not null references auth.users(id) on delete cascade, created_at timestamptz not null default now(), primary key (class_id,student_id));
create table if not exists public.lesson_assignments (id uuid primary key default gen_random_uuid(), class_id uuid references public.classes(id) on delete cascade, student_id uuid not null references auth.users(id) on delete cascade, lesson_id text not null, status text not null default 'Assigned' check (status in ('Assigned','Learning','Demonstrated','Mastered')), updated_at timestamptz not null default now());
create table if not exists public.observations (id uuid primary key default gen_random_uuid(), author_id uuid not null references auth.users(id) on delete cascade, student_id uuid not null references auth.users(id) on delete cascade, note text not null, created_at timestamptz not null default now());
alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.lesson_assignments enable row level security;
alter table public.observations enable row level security;
create policy "profiles own row" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "classes owner" on public.classes for all using (auth.uid()=owner_id) with check (auth.uid()=owner_id);
-- Before real student records are enabled, add policies that explicitly authorize the teacher/caregiver relationship for class_members, assignments, and observations.
