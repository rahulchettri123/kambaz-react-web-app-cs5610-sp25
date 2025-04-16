import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser
    ? [{ label: "Profile", path: "/Kambaz/Account/Profile" }]
    : [
        { label: "Signin", path: "/Kambaz/Account/Signin" },
        { label: "Signup", path: "/Kambaz/Account/Signup" },
      ];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");


  return (
    <div id="wd-account-navigation">
      {links.map((link) => (
        <Link key={link.path} to={link.path}><br />
          {link.label}
          
        </Link>
        
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={
       `list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
    
  );
}
