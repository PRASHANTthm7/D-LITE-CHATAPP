# D-Lite v2 Schema

This is the planned Supabase schema for D-Lite v2.

```sql
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
  role text default 'Member', -- Owner, Admin, Moderator, Member
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
  type text, -- 'audio' or 'video'
  status text default 'connecting',
  started_at timestamp with time zone default now(),
  ended_at timestamp with time zone
);
```
