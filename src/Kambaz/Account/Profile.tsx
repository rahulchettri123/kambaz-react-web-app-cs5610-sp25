
import { Form, Button } from "react-bootstrap";
import * as client from "./client";
import {  useNavigate }
  from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch }
  from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer);
    const fetchProfile = () => {
      if (!currentUser)
        return navigate("/Kambaz/Account/Signin");
      setProfile(currentUser);
    };
    const updateProfile = async () => {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
    };
  
    const signout = async () => {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kambaz/Account/Signin");
    };
  
    useEffect(() => { fetchProfile(); }, []);
  
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h3 className="mb-3">Profile</h3>
      {profile && ( <div>

        <Form className="mx-auto" style={{ width: "1000px" }}>
  <Form.Group className="mb-3">
    <Form.Control
      id="wd-username"
      className="form-control w-100"
      defaultValue={profile.username}
      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      placeholder="Username"
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Control
      id="wd-password"
      className="form-control w-100"
      type="password"
      defaultValue={profile.password}
      onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      placeholder="Password"
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Control
      id="wd-firstname"
      className="form-control w-100"
      defaultValue={profile.firstName}
      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      placeholder="First Name"
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Control
      id="wd-lastname"
      className="form-control w-100"
      defaultValue={profile.lastName}
      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      placeholder="Last Name"
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Control
      id="wd-dob"
      className="form-control w-100"
      type="date"
      defaultValue={profile.dob}
      onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Control
      id="wd-email"
      className="form-control w-100"
      type="email"
      defaultValue={profile.email}
      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Select
      id="wd-role"
      className="form-control w-100"
      defaultValue={profile.role}
      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
    >
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
      <option value="FACULTY">Faculty</option>
      <option value="STUDENT">Student</option>
    </Form.Select>
  </Form.Group>
  <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
  <Button variant="danger" className="w-100" onClick={signout}>
    Signout
  </Button>
</Form>


    </div>
    )}
    </div>
  );
}
