import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getApiUrl, getInitials } from "@/lib/utils";
import { User } from "@/types/globals";

interface UserDisplayProps {
  user: User;
  isOnline: boolean;
}

export default function UserDisplay({ user, isOnline }: UserDisplayProps) {
  return (
    <div className={cn("flex items-center", isOnline ? null : "opacity-50")}>
      <Avatar>
        <AvatarImage src={`${getApiUrl()}${user.avatarUrl}`} />
        <AvatarFallback>
          {getInitials(`${user.name} ${user.lastName}`)}
        </AvatarFallback>
      </Avatar>
      <span className="ml-2">
        {user.name} {user.lastName}
      </span>
    </div>
  );
}
