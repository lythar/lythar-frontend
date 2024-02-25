import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { User } from "@/types/globals";

interface UserDisplayProps {
  user: User;
  isOnline: boolean;
}

export default function UserDisplay({ user, isOnline }: UserDisplayProps) {
  return (
    <div className={cn("flex items-center", isOnline ? null : "opacity-50")}>
      <Avatar>
        <AvatarImage
          src={`http://${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}`}
        />
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
