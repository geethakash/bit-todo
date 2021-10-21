import React, { useState } from "react";

import { FaClock, FaListUl, FaSearch } from "react-icons/fa";
import { GoTasklist, GoListUnordered } from "react-icons/go";
import Avatar from "../assets/img/avatar.png";
import { useContext } from "react";
import { userContext } from "../Context/UserContext";

function SideBar({ selectedPanel, setSelectedPanel }) {
  const Content = useContext(userContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const SideBarIcon = ({ icon, text, name }) => (
    <div
      className={
        selectedPanel === name
          ? "sidebar-icon group bg-purple-600 rounded-xl text-white"
          : "sidebar-icon group"
      }
      onClick={() => setSelectedPanel(name)}
    >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );

  const SideBarImage = ({ image, text, name }) => (
    <div
      className={
        selectedPanel === name
          ? "sidebar-img group bg-purple-600 rounded-lg border-2 border-purple-700"
          : "sidebar-img group"
      }
      onClick={() => setSelectedPanel(name)}
    >
      <img
        className="w-full h-full group rounded-lg"
        src={image}
        alt="Avatar"
      />
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );

  return (
    <>
      {isSideBarOpen ? (
        <div className="top-0 left-0 h-screen w-16 flex flex-col bg-gray-800 text-white shadow-lg">
          <SideBarImage
            image={Avatar}
            text={Content.user?.username}
            name="user"
          />
          <SideBarIcon
            icon={<GoTasklist size="25" />}
            text="Todo Lists"
            name="todos"
          />
          <SideBarIcon
            icon={<FaListUl size="25" />}
            text="Other Lists"
            name="lists"
          />
          <SideBarIcon
            icon={<FaClock size="25" />}
            name="habits"
            text="Daily Habits"
          />
          <SideBarIcon
            icon={<FaSearch size="25" />}
            name="search"
            text="search"
          />
        </div>
      ) : (
        ""
      )}
      <div className={isSideBarOpen ? "absolute top-0 ml-16 z-10" : "absolute"}>
        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="  h-14 px-4  flex items-center justify-center text-xl text-white border-0 hover:border-yellow-50"
        >
          {isSideBarOpen ? (
            <svg
              width="25"
              height="20"
              viewBox="0 0 31 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="1" width="30" height="3" rx="1.5" fill="#34d399" />
              <rect y="10" width="20" height="3" rx="1.5" fill="#34d399" />
              <rect y="19" width="30" height="3" rx="1.5" fill="#34d399" />
              <path
                d="M26.703 5.32172L21.6261 10.8217C21.2725 11.2048 21.2725 11.7952 21.6261 12.1783L26.703 17.6783C26.8923 17.8834 27.1587 18 27.4378 18L27.716 18C28.5878 18 29.0421 16.9623 28.4508 16.3217L24.6261 12.1783C24.2725 11.7952 24.2725 11.2048 24.6261 10.8217L28.4508 6.67828C29.0421 6.03771 28.5878 5 27.716 5L27.4378 5C27.1587 5 26.8923 5.11664 26.703 5.32172Z"
                fill="#34d399"
              />
            </svg>
          ) : (
            <svg
              width="25"
              height="20"
              viewBox="0 0 31 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="1" width="30" height="3" rx="1.5" fill="#34d399" />
              <rect y="10" width="20" height="3" rx="1.5" fill="#34d399" />
              <rect y="19" width="30" height="3" rx="1.5" fill="#34d399" />
              <path
                d="M22.297 17.6783L27.3739 12.1783C27.7275 11.7952 27.7275 11.2048 27.3739 10.8217L22.297 5.32172C22.1077 5.11664 21.8413 5 21.5622 5H21.284C20.4122 5 19.9579 6.03771 20.5492 6.67828L24.3739 10.8217C24.7275 11.2048 24.7275 11.7952 24.3739 12.1783L20.5492 16.3217C19.9579 16.9623 20.4122 18 21.284 18H21.5622C21.8413 18 22.1077 17.8834 22.297 17.6783Z"
                fill="#34d399"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

export default SideBar;
