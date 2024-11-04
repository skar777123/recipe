import React from "react";
import Cards from "./Cards";

const Profile = () => {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <h1
          style={{
            color: "#1a56db",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Profile
        </h1>
      </div>
      <div className="flex flex-row justify-center">
        <div class="w-full max-w-sm p-6 flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <hr
          style={{
            width: "70%",
            marginTop: "30px",
          }}
        />
      </div>
      <div className="flex flex-row justify-center">
        <h1
          style={{
            marginTop: "20px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Your{" "}
          <span
            style={{
              color: "#1a56db ",
            }}
          >
            Recipes
          </span>
        </h1>
      </div>
      <Cards />
    </div>
  );
};

export default Profile;
