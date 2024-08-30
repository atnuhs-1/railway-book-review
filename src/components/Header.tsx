import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const auth = useAuth();

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <div className="flex justify-between border p-4">
      <h2 className="text-3xl  font-bold">
        <Link to={`/`}>Book Review</Link>
      </h2>
      <div className="flex justify-end space-x-4">
        {auth.isAuthenticated ? (
          <>
            <div className="p-2">{auth.userInfo?.name}</div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={auth.userInfo?.iconUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link to={`/profile`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>
                    <button onClick={handleLogOut} className="">
                      Log out
                    </button>
                  </span>
                  <div></div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <div className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300">
              <Link to={`/login`}>Log in</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
