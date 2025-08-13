import { DropdownMenu } from "./DropdownMenu";
import { Button } from "../atoms/Button";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export default function NotificationDropdown() {
  const messages = useSelector((state: RootState) => state.messages.list);

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {messages.length > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 py-0 text-xs">
              {messages.length}
            </Badge>
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-64">
        {messages.length === 0 ? (
          <DropdownMenu.Item className="text-sm text-muted-foreground">
            No messages yet
          </DropdownMenu.Item>
        ) : (
          messages.map((msg) => (
            <DropdownMenu.Item key={msg.id} className="text-sm break-words">
              {msg.text}
            </DropdownMenu.Item>
          ))
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
