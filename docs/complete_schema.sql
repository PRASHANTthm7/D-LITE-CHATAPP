-- ============================================================
--  D-Lite — Complete Database Schema
--  Run this once on a fresh Supabase project.
--  (Or use: npx supabase db push)
-- ============================================================


-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";


-- ── Tables ───────────────────────────────────────────────────

-- Profiles (auto-created via trigger on signup)
create table if not exists public.profiles (
  id            uuid        primary key references auth.users on delete cascade,
  email         text,
  username      text        unique,
  display_name  text,
  avatar_url    text,
  bio           text,
  gender        text,                          -- 'male' | 'female'
  status        text        default 'Available',
  last_seen_at  timestamptz default now(),
  created_at    timestamptz default now()
);

-- Direct Messages
create table if not exists public.direct_messages (
  id          uuid        primary key default uuid_generate_v4(),
  sender_id   uuid        references public.profiles(id) on delete cascade,
  receiver_id uuid        references public.profiles(id) on delete cascade,
  content     text,
  media_url   text,
  reply_to_id uuid        references public.direct_messages(id) on delete set null,
  status      text        default 'sent',      -- 'sent' | 'delivered' | 'read'
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Message Reactions
create table if not exists public.message_reactions (
  id         uuid        primary key default uuid_generate_v4(),
  message_id uuid        references public.direct_messages(id) on delete cascade,
  user_id    uuid        references public.profiles(id) on delete cascade,
  emoji      text,
  created_at timestamptz default now(),
  unique(message_id, user_id, emoji)
);

-- Groups
create table if not exists public.groups (
  id          uuid        primary key default uuid_generate_v4(),
  name        text        not null,
  description text,
  avatar_url  text,
  is_public   boolean     default false,
  created_by  uuid        references public.profiles(id) on delete set null,
  created_at  timestamptz default now()
);

-- Group Members
create table if not exists public.group_members (
  group_id  uuid        references public.groups(id) on delete cascade,
  user_id   uuid        references public.profiles(id) on delete cascade,
  role      text        default 'Member',      -- 'Owner' | 'Admin' | 'Moderator' | 'Member'
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);

-- Group Messages
create table if not exists public.group_messages (
  id          uuid        primary key default uuid_generate_v4(),
  group_id    uuid        references public.groups(id) on delete cascade,
  sender_id   uuid        references public.profiles(id) on delete set null,
  content     text,
  media_url   text,
  reply_to_id uuid        references public.group_messages(id) on delete set null,
  created_at  timestamptz default now()
);

-- Calls
create table if not exists public.calls (
  id          uuid        primary key default uuid_generate_v4(),
  caller_id   uuid        references public.profiles(id) on delete cascade,
  receiver_id uuid        references public.profiles(id) on delete set null,
  group_id    uuid        references public.groups(id) on delete set null,
  type        text,                            -- 'audio' | 'video'
  status      text        default 'connecting',-- 'connecting' | 'active' | 'ended' | 'missed'
  started_at  timestamptz default now(),
  ended_at    timestamptz
);


-- ── Trigger: auto-create profile on signup ────────────────────
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
    set display_name = excluded.display_name,
        avatar_url   = excluded.avatar_url,
        gender       = excluded.gender;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── Row Level Security ────────────────────────────────────────
alter table public.profiles          enable row level security;
alter table public.direct_messages   enable row level security;
alter table public.message_reactions enable row level security;
alter table public.groups            enable row level security;
alter table public.group_members     enable row level security;
alter table public.group_messages    enable row level security;
alter table public.calls             enable row level security;

-- profiles
create policy "profiles_select" on public.profiles
  for select to authenticated using (true);
create policy "profiles_insert" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- direct_messages
create policy "dm_select" on public.direct_messages
  for select to authenticated using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "dm_insert" on public.direct_messages
  for insert to authenticated with check (auth.uid() = sender_id);
create policy "dm_update" on public.direct_messages
  for update to authenticated using (auth.uid() = sender_id);
create policy "dm_delete" on public.direct_messages
  for delete to authenticated using (auth.uid() = sender_id);

-- message_reactions
create policy "reactions_select" on public.message_reactions
  for select to authenticated using (true);
create policy "reactions_insert" on public.message_reactions
  for insert to authenticated with check (auth.uid() = user_id);
create policy "reactions_delete" on public.message_reactions
  for delete to authenticated using (auth.uid() = user_id);

-- groups
create policy "groups_select" on public.groups
  for select to authenticated
  using (is_public = true or id in (
    select group_id from public.group_members where user_id = auth.uid()
  ));
create policy "groups_insert" on public.groups
  for insert to authenticated with check (auth.uid() = created_by);
create policy "groups_update" on public.groups
  for update to authenticated using (auth.uid() = created_by);
create policy "groups_delete" on public.groups
  for delete to authenticated using (auth.uid() = created_by);

-- group_members
create policy "gm_select" on public.group_members
  for select to authenticated
  using (group_id in (
    select group_id from public.group_members where user_id = auth.uid()
  ));
create policy "gm_insert" on public.group_members
  for insert to authenticated
  with check (
    auth.uid() = user_id or
    group_id in (
      select group_id from public.group_members
      where user_id = auth.uid() and role in ('Owner', 'Admin')
    )
  );
create policy "gm_delete" on public.group_members
  for delete to authenticated using (auth.uid() = user_id);

-- group_messages
create policy "gmsg_select" on public.group_messages
  for select to authenticated
  using (group_id in (
    select group_id from public.group_members where user_id = auth.uid()
  ));
create policy "gmsg_insert" on public.group_messages
  for insert to authenticated
  with check (
    auth.uid() = sender_id and
    group_id in (select group_id from public.group_members where user_id = auth.uid())
  );
create policy "gmsg_update" on public.group_messages
  for update to authenticated using (auth.uid() = sender_id);
create policy "gmsg_delete" on public.group_messages
  for delete to authenticated using (auth.uid() = sender_id);

-- calls
create policy "calls_select" on public.calls
  for select to authenticated
  using (auth.uid() = caller_id or auth.uid() = receiver_id);
create policy "calls_insert" on public.calls
  for insert to authenticated with check (auth.uid() = caller_id);
create policy "calls_update" on public.calls
  for update to authenticated
  using (auth.uid() = caller_id or auth.uid() = receiver_id);


-- ── Realtime ──────────────────────────────────────────────────
alter publication supabase_realtime add table public.direct_messages;
alter publication supabase_realtime add table public.message_reactions;
alter publication supabase_realtime add table public.group_messages;
alter publication supabase_realtime add table public.profiles;
