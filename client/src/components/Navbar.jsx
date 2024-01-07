import { useState, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { FaMoon, FaRegMoon } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext";
import { menuItems } from "../content";
// import { Link } from "react-router-dom";

import logo from "../../images/logo.png";

const NavBarListItem = ({ title, route, classProps, isactive, setIsactive, onClick }) => (
  <li
    className={`mx-4 p-1 px-4 rounded-lg cursor-pointer  ${classProps}`}
    onClick={onClick}
  >
    <a href={`#${route}`}>{title}</a>
  </li>
);

const Navbar = () => {
  console.log("Navbar");
  const [toggleMenu, setToggleMenu] = useState(false);
  const {
    handleScroll,
    isScrolled,
    isDarkTheme,
    toggleTheme,
    isActive,
    setIsactive,
  } = useContext(TransactionContext);
  console.log("isActive: ", isActive);

  return (
    <nav
      className={`w-full flex fixed backdrop-blur borderBlur shadow-2xl ${
        isScrolled ? " shadow-[#2A0E61]" : ""
      } ${
        isDarkTheme ? "dark-theme" : ""
      } z-10 md:justify-center justify-between items-center p-4 border-b-4`}
    >
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
       <a href="/" > <img src={logo} alt="Logo" className="w-32 cursor-pointer" /></a>
      </div>
      <ul
        className={`text-white md:flex hidden list-none flex-row justify-between items-center flex-initial space-x-4 ${
          isDarkTheme ? "dark-theme" : ""
        }`}
      >
        {menuItems.map((item, index) => (
          <NavBarListItem
            key={item + index}
            title={item.title}
            route={item.route}
            classProps={`text-lg  ${
              isActive === item.title
                ? "text-white bg-blue-700 rounded-full "
                : "text-yellow"
            }`}
            onClick={() => setIsactive(item.title)}
          />
        ))}
        <li
          className=" py-2 px-1 mx-4 rounded-full cursor-pointer "
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FaRegMoon /> : <FaMoon />}
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu ? (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <>
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
            <ul
              className={`z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in ${
                isDarkTheme ? "dark-theme" : ""
              }`}
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {menuItems.map((item, index) => (
                <NavBarListItem
                  key={item.title + index}
                  title={item.title}
                  route={item.route}
                  onClick={() => {
                    setIsactive(item.title), 
                    setToggleMenu(false)}} 
                  classProps={`text-lg hover:bg-blue-400 ${
                    isActive === item.title
                      ? "text-white bg-blue-700 rounded-full "
                      : ""
                  }`}
                />
              ))}
              <li
                className=" py-2 px-1 mx-4 rounded-full cursor-pointer "
                onClick={toggleTheme}
              >
                {isDarkTheme ? <FaRegMoon /> : <FaMoon />}
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
