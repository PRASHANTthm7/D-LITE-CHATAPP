import { SettingsSidebar } from "@/features/settings/components/SettingsSidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-canvas">
      <SettingsSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
