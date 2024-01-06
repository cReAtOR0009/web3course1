import { BsShieldFillCheck } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";
import { IoSpeedometer } from "react-icons/io5";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Wrapper } from "./hoc/index";

const ServiceCard = ({ color, title, icon, subtitle }) =>{
  const { isDarkTheme } = useContext(TransactionContext);
  return(
  <div className={`flex flex-row justify-start items-start hover:bg-blue-700 transition duration-300 ease-in-out white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl ${isDarkTheme ? "dark-theme" : ""}`}>
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
  )
  };

const Services = () => {
  const { isDarkTheme } = useContext(TransactionContext);

  return (
    <div className={`flex w-full justify-center items-center gradient-bg-services ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Services that we
            <br />
            continue to improve
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          Opt for the premier option when it comes to buying and selling your crypto assets, benefiting from our array of super-friendly services.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Security guarantee"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Rest assured, security is guaranteed. We consistently uphold privacy standards and ensure the quality of our products."
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Speed"
            icon={<IoSpeedometer fontSize={21} className="text-white" />}
            subtitle="Experience swift and efficient transactions, ensuring timely execution and responsiveness for your trading needs."
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="Mobile Accessibility"
            icon={<FiActivity  fontSize={21} className="text-white" />}
            subtitle="Enable mobile applications for sending crypto Assest on-the-go, providing flexibility and convenience."
          />
        </div>
      </div>
    </div>
  );
};

export default Wrapper(Services, "services");
