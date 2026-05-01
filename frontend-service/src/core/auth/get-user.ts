import { createClient } from "./supabase-server";
export { getInitials } from "@/shared/utils/initials";

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
