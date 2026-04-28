import { SettingsSidebar } from "@/features/settings/components/SettingsSidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full max-w-6xl mx-auto overflow-hidden bg-surface-1 shadow-2xl md:my-8 md:rounded-3xl border border-border-default animate-in fade-in duration-500">
      <SettingsSidebar />
      <div className="flex-1 overflow-y-auto p-8 relative bg-surface-1/50 backdrop-blur-3xl">
        {children}
      </div>
    </div>
  );
}
