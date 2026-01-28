"use client";

interface ProjectSlackMessageProps {
  message: string;
}

export default function ProjectSlackMessage({ message }: ProjectSlackMessageProps) {
  // Parse the message format: "Name (Role): 'message'"
  const match = message.match(/^(.+?)\s*\((.+?)\):\s*"?(.+)"?$/);

  const name = match?.[1] || "Team Member";
  const role = match?.[2] || "";
  const content = match?.[3] || message;

  // Generate avatar color based on name
  const colors = [
    "bg-teal-500",
    "bg-primary-500",
    "bg-accent-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-blue-500",
  ];
  const colorIndex = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;

  return (
    <div className="flex gap-3 p-4 bg-sand-900/50 rounded-lg border border-sand-800">
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-lg ${colors[colorIndex]} flex items-center justify-center text-white text-sm font-bold`}
      >
        {name.charAt(0)}
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sand-100 text-sm">{name}</span>
          {role && (
            <span className="text-xs text-sand-500">{role}</span>
          )}
        </div>
        <p className="text-sand-300 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
