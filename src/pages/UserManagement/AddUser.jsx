// src/pages/UserManagement/AddUser.jsx
import { Mail, Timer, User } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "../../components/Inputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDataCenters,
  fetchDataCentersByUser,
} from "../../slices/DataCenterSlice";
import { createUser, fetchUsersByCreator } from "../../slices/UserSlice";
import "../../styles/pages/management-pages.css";
import Swal from "sweetalert2";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useStore } from "../../contexts/storecontexts";

const AddUser = () => {
  const dispatch = useDispatch();

    const {user: currentUser} = useStore();
    console.log('CurrentUser>', currentUser);

  // const { CurrentUser } = useSelector((s) => s.User);
  const { DataCenters = [], isLoading } = useSelector(
    (s) => s.DataCenter || {} );

    console.log("Add User DataCenter", DataCenters);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      dataCenters: [],
      timer: "", // new
    });
    


 const timerMap = {
  "15m": 15 * 60 + "s",
  "30m": 30 * 60 + "s",
  "6h": 6 * 3600 + "s",
  "12h": 12 * 3600 + "s",
  "1d": 24 * 3600 + "s",
};


    // console.log("><>CurrentUser<><", CurrentUser)
    // ---------------- FETCH DATACENTERS BASED ON ROLE ----------------
    useEffect(() => {
    if (!currentUser) return;
    
    if (currentUser.role === "admin") {
      dispatch(fetchAllDataCenters());
      
    } else if (currentUser.role === "manager") {
      dispatch(fetchDataCentersByUser(currentUser._id));
    }
  }, [dispatch, currentUser]);
  
  
  
  console.log("DATACENTERS", DataCenters);
  console.log("currentUser>>>>>", currentUser);
  
  // ---------------- INPUT HANDLER ----------------
  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ---------------- SUBMIT HANDLER ----------------
  const onsubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      return Swal.fire({
        icon: "error",
        title: "Missing fields",
        text: "Name and Email are required",
      });
    }

    if (currentUser.role === "admin" && !formData.timer) {
    return Swal.fire({
      icon: "error",
      title: "Missing Timer",
      text: "Timer is required when creating a manager",
    });
  }

    if (formData.dataCenters.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Missing Data Center",
        text: "At least one Data Center must be assigned",
      });
    }

    setIsSubmitting(true);

    console.log("FormData>>", formData);

    try {
      
      const payload = {
        name: formData.name,
        email: formData.email,
        dataCenters: formData.dataCenters,
      };


       // ONLY admins send timer
    if (currentUser.role === "admin") {
      payload.timer = formData.timer ? timerMap[formData.timer] : null;
    }

      console.log("payload_for_both_manager, admin>>", payload);

      await dispatch(createUser(payload)).unwrap();
      dispatch(fetchUsersByCreator(currentUser._id));
      Swal.fire({
        icon: "success",
        title: "User created",
        text: "Setup email has been sent",
      });

      setFormData({
        name: "",
        email: "",
        dataCenters: [],
        timer: ""
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err || "Unable to create user",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- BLOCK NORMAL USERS ----------------
  if (currentUser?.role === "user") {
    return null;
  }

  return (
    <div className="md:p-none p-[1rem] AddingPage user-add-container rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
      <h2 className="user-add-title font-semibold mb-1 text-center">
        Add User
      </h2>
      <p className="user-add-subtitle text-gray-500 mb-6 text-center">
        Create a new user
      </p>

      <form onSubmit={onsubmit}>
        <div className="user-add-form space-y-4 max-w-sm mx-auto w-full">
          <InputField
            type="text"
            name="name"
            placeholder="Name"
            onchange={onchange}
            value={formData.name}
            label="Name"
            icon={<User />}
          />

          <InputField
            type="email"
            name="email"
            placeholder="Email"
            onchange={onchange}
            value={formData.email}
            label="Email"
            icon={<Mail />}
          />


  {currentUser?.role === "admin" && ( 
<div>

        <FormControl fullWidth>
          <InputLabel id="timer-select-label">Timer</InputLabel>
          <Select
            labelId="timer-select-label"
            id="timer-select"
            value={formData.timer}
            label="Timer"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                timer: e.target.value, // eg: "30m", "1d"
              }));
            }}
          >
            <MenuItem value="">Select Duration</MenuItem>
            <MenuItem value="15m">15 minutes</MenuItem>
            <MenuItem value="30m">30 minutes</MenuItem>
            <MenuItem value="6h">6 hours</MenuItem>
            <MenuItem value="12h">12 hours</MenuItem>
            <MenuItem value="1d">1 day</MenuItem>
          </Select>
        </FormControl>

</div>

)}


{/* 
          {currentUser?.role === "admin" && (
          <InputField
          type="number"
          name="timer"
          placeholder="Timer (seconds)"
          onchange={onchange}
          value={formData.timer}
          label="Timer (seconds)"
          icon={<Timer/>}
          />
          )} */}

{/* 
          {currentUser?.role === "admin" && (
  <TextField
    select
    label="Timer"
    value={formData.timer}
    onChange={(e) => setFormData((p) => ({ ...p, timer: e.target.value }))}
    fullWidth
    SelectProps={{ native: true }}
  >
    <option value="">Select Duration</option>
    <option value="900s">15 minutes</option>
    <option value="1800s">30 minutes</option>
    <option value="21600s">6 hours</option>
    <option value="43200s">12 hours</option>
    <option value="86400s">1 day</option>
  </TextField>
)} */}




          <Autocomplete
            multiple
            options={DataCenters}
            getOptionLabel={(option) => option?.name || ""}
            value={DataCenters.filter((dc) =>
              formData.dataCenters.includes(dc._id)
            )}
            onChange={(e, value) =>
              setFormData((p) => ({
                ...p,
                dataCenters: value.map((v) => v._id),
              }))
            }
            loading={isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Data Centers"
                placeholder="Search Data Centers"
              />
            )}
          />
        </div>

        <div className="max-w-sm mx-auto w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 bg-blue-600 text-white px-6 py-2 rounded-md w-full ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
