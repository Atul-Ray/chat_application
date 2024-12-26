import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import defaultPic from "../assets/defaultPic.png";
import { UserRound, Mail, Camera } from "lucide-react";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [showProfile, setShowProfile ] = useState(authUser.profilePic || defaultPic);

  const handleImage = async (e) => {
    console.log("hadle image triggered");
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('file selected',file);
      
      if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=async()=>{
      const base64Image= reader.result;
      setShowProfile(base64Image);
      await updateProfile({profilePic:base64Image})

    }
    }
  };
  return (
    <div className="container flex flex-col gap-6 mx-auto mt-10 lg:m-20 lg:p-10  ">
      <div className="flex flex-col gap-2 shadow-2xl p-4 rounded-lg">
        <div className="w-full flex justify-center items-center my-8">
          <div className="relative">
            <img
              className="rounded-full size-32 border-solid border-4 bg-red-700"
              src={authUser.profilePic || showProfile || defaultPic}
            />

            <label>
              <Camera className="absolute top-24 left-24 size-7 text-slate-700 " />
              <input
                className="absolute top-24 left-24 hidden"
                type="file"
                onChange={handleImage}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>
<p className="text-center text-stone-700">
  {isUpdatingProfile?'updating...':''}
  </p>
        <p className="text-center font-bold">
          click on camera icon to change profile
        </p>

        <label className="input input-bordered flex items-center gap-2">
          <UserRound />
          <input
            type="text"
            className="grow"
            value={authUser.fullName}
            readOnly
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <Mail />
          <input
            type="email"
            className="grow"
            value={authUser.email}
            readOnly
          />
        </label>

        <div></div>
      </div>

      <div className="p-4 shadow-2xl flex flex-col gap-2 rounded-lg">
        <h1>Account Information</h1>
        <div className="flex justify-between border-b">
          <h1>Member Since</h1>
          <p>{authUser.createdAt}</p>
        </div>

        <div className="flex justify-between">
          <h1>Account Status</h1>
          <p className="text-green-500">Active</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
