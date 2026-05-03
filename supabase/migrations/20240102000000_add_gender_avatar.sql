-- Add gender column to profiles
alter table public.profiles add column if not exists gender text;

-- Store avatar_url from auth metadata in profiles
alter table public.profiles alter column avatar_url set default null;

-- Fix calls.group_id: cascade delete doesn't make sense — set null when group is deleted
alter table public.calls drop constraint if exists calls_group_id_fkey;
alter table public.calls
  add constraint calls_group_id_fkey
  foreign key (group_id) references public.groups(id) on delete set null;

-- Update trigger to also copy avatar_url and gender
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username, display_name, avatar_url, gender)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'gender'
  )
  on conflict (id) do update
    set
      display_name = excluded.display_name,
      avatar_url   = excluded.avatar_url,
      gender       = excluded.gender;
  return new;
end;
$$ language plpgsql security definer;
