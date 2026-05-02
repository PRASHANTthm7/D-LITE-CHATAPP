-- Enable extensions
create extension if not exists "uuid-ossp";

-- Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade,
  email text,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  status text default 'Available',
  last_seen_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- Direct Messages
create table public.direct_messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) on delete cascade,
  receiver_id uuid references public.profiles(id) on delete cascade,
  content text,
  media_url text,
  reply_to_id uuid references public.direct_messages(id) on delete set null,
  status text default 'sent',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Message Reactions
create table public.message_reactions (
  id uuid default uuid_generate_v4() primary key,
  message_id uuid references public.direct_messages(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  emoji text,
  created_at timestamp with time zone default now(),
  unique(message_id, user_id, emoji)
);

-- Groups
create table public.groups (
  id uuid default uuid_generate_v4() primary key,
  name text,
  description text,
  avatar_url text,
  is_public boolean default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- Group Members
create table public.group_members (
  group_id uuid references public.groups(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text default 'Member',
  joined_at timestamp with time zone default now(),
  primary key (group_id, user_id)
);

-- Group Messages
create table public.group_messages (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  content text,
  media_url text,
  reply_to_id uuid references public.group_messages(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- Calls
create table public.calls (
  id uuid default uuid_generate_v4() primary key,
  caller_id uuid references public.profiles(id) on delete cascade,
  receiver_id uuid references public.profiles(id) on delete set null,
  group_id uuid references public.groups(id) on delete cascade,
  type text,
  status text default 'connecting',
  started_at timestamp with time zone default now(),
  ended_at timestamp with time zone
);

-- Trigger: auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username, display_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.direct_messages enable row level security;
alter table public.message_reactions enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.group_messages enable row level security;
alter table public.calls enable row level security;

-- profiles policies
create policy "profiles_select" on public.profiles for select to authenticated using (true);
create policy "profiles_insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update" on public.profiles for update to authenticated using (auth.uid() = id);

-- direct_messages policies
create policy "dm_select" on public.direct_messages for select to authenticated
  using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "dm_insert" on public.direct_messages for insert to authenticated
  with check (auth.uid() = sender_id);
create policy "dm_update" on public.direct_messages for update to authenticated
  using (auth.uid() = sender_id);
create policy "dm_delete" on public.direct_messages for delete to authenticated
  using (auth.uid() = sender_id);

-- message_reactions policies
create policy "reactions_select" on public.message_reactions for select to authenticated using (true);
create policy "reactions_insert" on public.message_reactions for insert to authenticated with check (auth.uid() = user_id);
create policy "reactions_delete" on public.message_reactions for delete to authenticated using (auth.uid() = user_id);

-- groups policies
create policy "groups_select" on public.groups for select to authenticated
  using (is_public = true or id in (select group_id from public.group_members where user_id = auth.uid()));
create policy "groups_insert" on public.groups for insert to authenticated with check (auth.uid() = created_by);
create policy "groups_update" on public.groups for update to authenticated using (auth.uid() = created_by);

-- group_members policies
create policy "gm_select" on public.group_members for select to authenticated
  using (group_id in (select group_id from public.group_members where user_id = auth.uid()));
create policy "gm_insert" on public.group_members for insert to authenticated
  with check (auth.uid() = user_id or group_id in (select group_id from public.group_members where user_id = auth.uid() and role in ('Owner', 'Admin')));
create policy "gm_delete" on public.group_members for delete to authenticated using (auth.uid() = user_id);

-- group_messages policies
create policy "gmsg_select" on public.group_messages for select to authenticated
  using (group_id in (select group_id from public.group_members where user_id = auth.uid()));
create policy "gmsg_insert" on public.group_messages for insert to authenticated
  with check (auth.uid() = sender_id and group_id in (select group_id from public.group_members where user_id = auth.uid()));
create policy "gmsg_update" on public.group_messages for update to authenticated
  using (auth.uid() = sender_id);

-- calls policies
create policy "calls_select" on public.calls for select to authenticated
  using (auth.uid() = caller_id or auth.uid() = receiver_id);
create policy "calls_insert" on public.calls for insert to authenticated with check (auth.uid() = caller_id);
create policy "calls_update" on public.calls for update to authenticated
  using (auth.uid() = caller_id or auth.uid() = receiver_id);

-- Enable Realtime on messaging tables
alter publication supabase_realtime add table public.direct_messages;
alter publication supabase_realtime add table public.message_reactions;
alter publication supabase_realtime add table public.group_messages;
alter publication supabase_realtime add table public.profiles;
