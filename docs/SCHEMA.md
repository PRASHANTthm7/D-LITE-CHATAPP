m# D-Lite — Database Schema

Supabase (Postgres) schema used by D-Lite.  
Migrations live in `supabase/migrations/`.

---

## Tables

### `profiles`
Auto-created via trigger when a user signs up through Supabase Auth.

```sql
create table public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  email         text,
  username      text unique,
  display_name  text,
  avatar_url    text,
  bio           text,
  gender        text,                          -- 'male' | 'female'
  status        text default 'Available',
  last_seen_at  timestamptz default now(),
  created_at    timestamptz default now()
);
```

### `direct_messages`

```sql
create table public.direct_messages (
  id          uuid default uuid_generate_v4() primary key,
  sender_id   uuid references public.profiles(id) on delete cascade,
  receiver_id uuid references public.profiles(id) on delete cascade,
  content     text,
  media_url   text,
  reply_to_id uuid references public.direct_messages(id) on delete set null,
  status      text default 'sent',            -- 'sent' | 'delivered' | 'read'
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
```

### `message_reactions`

```sql
create table public.message_reactions (
  id         uuid default uuid_generate_v4() primary key,
  message_id uuid references public.direct_messages(id) on delete cascade,
  user_id    uuid references public.profiles(id) on delete cascade,
  emoji      text,
  created_at timestamptz default now(),
  unique(message_id, user_id, emoji)
);
```

### `groups`

```sql
create table public.groups (
  id          uuid default uuid_generate_v4() primary key,
  name        text,
  description text,
  avatar_url  text,
  is_public   boolean default false,
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz default now()
);
```

### `group_members`

```sql
create table public.group_members (
  group_id  uuid references public.groups(id) on delete cascade,
  user_id   uuid references public.profiles(id) on delete cascade,
  role      text default 'Member',           -- 'Owner' | 'Admin' | 'Moderator' | 'Member'
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);
```

### `group_messages`

```sql
create table public.group_messages (
  id          uuid default uuid_generate_v4() primary key,
  group_id    uuid references public.groups(id) on delete cascade,
  sender_id   uuid references public.profiles(id) on delete set null,
  content     text,
  media_url   text,
  reply_to_id uuid references public.group_messages(id) on delete set null,
  created_at  timestamptz default now()
);
```

### `calls`

```sql
create table public.calls (
  id          uuid default uuid_generate_v4() primary key,
  caller_id   uuid references public.profiles(id) on delete cascade,
  receiver_id uuid references public.profiles(id) on delete set null,
  group_id    uuid references public.groups(id) on delete set null,  -- set null, not cascade
  type        text,                          -- 'audio' | 'video'
  status      text default 'connecting',    -- 'connecting' | 'active' | 'ended' | 'missed'
  started_at  timestamptz default now(),
  ended_at    timestamptz
);
```

---

## Trigger — Auto-create profile on signup

Runs after every new row in `auth.users`. Copies metadata fields set during `supabase.auth.signUp()`.

```sql
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**Metadata fields sent from signup page:**
| Metadata key   | Copied to `profiles` column |
|----------------|-----------------------------|
| `full_name`    | `display_name`              |
| `username`     | `username`                  |
| `avatar_url`   | `avatar_url`                |
| `gender`       | `gender`                    |

---

## Row Level Security (RLS)

All tables have RLS enabled. Key policies:

| Table             | select                          | insert                    | update / delete           |
|-------------------|---------------------------------|---------------------------|---------------------------|
| `profiles`        | any authenticated user          | own row only              | own row only              |
| `direct_messages` | sender or receiver              | sender only               | sender only               |
| `message_reactions` | any authenticated user        | own reaction              | own reaction              |
| `groups`          | public groups + member groups   | creator only              | creator only              |
| `group_members`   | own groups                      | self or Owner/Admin       | self                      |
| `group_messages`  | group members only              | group members, own msg    | own message               |
| `calls`           | caller or receiver              | caller only               | caller or receiver        |

---

## Realtime

These tables have Supabase Realtime enabled:

```sql
alter publication supabase_realtime add table public.direct_messages;
alter publication supabase_realtime add table public.message_reactions;
alter publication supabase_realtime add table public.group_messages;
alter publication supabase_realtime add table public.profiles;
```
