import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

import { Route, Routes, Navigate } from "react-router-dom";
export default function Account() {
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <table width = "100%">
        <tr>
          <td valign = "top">
            <AccountNavigation />
          </td>

          <td>
            <Routes>
              <Route path="/" element={<Navigate to="Signin" />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
