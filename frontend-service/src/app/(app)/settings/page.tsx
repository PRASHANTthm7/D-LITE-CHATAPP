import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { ProfileForm } from "@/features/settings/components/ProfileForm";
import { getUser } from "@/core/auth/get-user";

export default async function ProfileSettingsPage() {
  const user = await getUser();
  const meta = user?.user_metadata ?? {};

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <SettingsHeader title="My Profile" description="Manage your personal information and how you appear to others." />
      <ProfileForm
        initialName={(meta.full_name as string) ?? ""}
        initialUsername={(meta.username as string) ?? ""}
        initialEmail={user?.email ?? ""}
        initialBio={(meta.bio as string) ?? ""}
        initialAvatarUrl={(meta.avatar_url as string) ?? undefined}
      />
    </div>
  );
}
