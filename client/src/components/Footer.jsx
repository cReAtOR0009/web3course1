import logo from "../../images/logo.png";
import { useContext } from "react";
import { menuItems } from "../content";
import { TransactionContext } from "../context/TransactionContext";
import { Wrapper } from "./hoc/index";

const Footer = () => {
  const { isActive, setIsactive } = useContext(TransactionContext);
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.route}`}
              className={`text-white mx-4 p-1 px-4 rounded-lg cursor-pointer ${
                isActive === item.title
                  ? " bg-blue-700 rounded-full "
                  : "text-yellow"
              }`}
              onClick={() => {
                setIsactive(item.title), setToggleMenu(false);
              }}
              // className="text-white text-base text-center mx-2 cursor-pointer"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">
          dymystifying the web3 world
        </p>
        <p className="text-white text-sm text-center font-medium mt-2">
          Twitter:{" "}
          <a href="https://twitter.com/Webmaniacz" target="_blank">
            @Webmaniacz
          </a>
        </p>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">@Creator2022</p>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  );
};

export default Wrapper(Footer, "contact_us");
