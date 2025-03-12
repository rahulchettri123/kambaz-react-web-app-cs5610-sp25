import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser
    ? [{ label: "Profile", path: "/Kambaz/Account/Profile" }]
    : [
        { label: "Signin", path: "/Kambaz/Account/Signin" },
        { label: "Signup", path: "/Kambaz/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation">
      {links.map((link) => (
        <Link key={link.path} to={link.path}><br />
          {link.label}
          
        </Link>
        
      ))}
    </div>
    
  );
}
