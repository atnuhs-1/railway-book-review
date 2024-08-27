import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
            
            <img width={30} height={30} src={auth.userInfo?.iconUrl} className="rounded-full"/>
            <div className="p-2">{auth.userInfo?.name}</div>
            <div>
              <button onClick={handleLogOut} className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300">Log out</button>
            </div>
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
