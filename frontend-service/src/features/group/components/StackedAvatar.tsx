import { User } from "@/features/dashboard/lib/mock-data";

export interface StackedAvatarProps {
  members: User[];
  max?: number;
}

export function StackedAvatar({ members, max = 3 }: StackedAvatarProps) {
  const visible = members.slice(0, max);
  const excess = members.length - max;

  const bgColors = ["bg-brand-300", "bg-brand-400", "bg-brand-500", "bg-brand-600"] as const;
  const zIndexes = ["z-30", "z-20", "z-10", "z-0"] as const;

  return (
    <div className="flex -space-x-2">
      {visible.map((member, i) => (
        <div
          key={member.id}
          className={`w-10 h-10 rounded-full border-2 border-surface flex items-center justify-center text-white text-xs font-bold ${bgColors[i] ?? "bg-brand-300"} ${zIndexes[i] ?? "z-0"}`}
        >
          {member.initials}
        </div>
      ))}
      {excess > 0 && (
        <div className="w-10 h-10 rounded-full border-2 border-surface bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold z-0">
          +{excess}
        </div>
      )}
    </div>
  );
}
