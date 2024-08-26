import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between shadow-sm p-4">
      <h2 className="text-3xl  font-bold">
        <Link to={`/`}>Book Review</Link>
      </h2>
      <div className="flex justify-end space-x-4">
        <div className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300">
          <Link to={`/login`}>Log in</Link>
        </div>
        <div className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300">
          <Link to={`/signup`}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
