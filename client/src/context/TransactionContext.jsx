// Import necessary dependencies from React and ethers
import { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

// Import contract ABI and address from constants
import { contractABI, contractAddress } from "../utils/constants";

// Create a context for managing transaction-related state
export const TransactionContext = createContext();

// Destructure the 'ethereum' object from the global window object
const { ethereum } = window;

// Function to get an Ethereum contract instance
const getEthereumContract = () => {
  // Create a Web3Provider using the 'ethereum' object
  const provider = new ethers.providers.Web3Provider(ethereum);

  // Get the signer from the provider
  const signer = provider.getSigner();

  // Create a contract instance using the ABI, address, and signer
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // Return the contract instance
  return transactionContract;

  // console.log(provider, signer, transactionContract)
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState("");
  const [formData, setformData] = useState({
    adressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isActive, setIsactive] = useState("Home");
  const testContext = "working context";
  // console.log("isActive: ", isActive)

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    localStorage.setItem("Transactiontheme", JSON.stringify(!isDarkTheme));
  };

  const getTheme = () => {
    const theme = JSON.parse(localStorage.getItem("Transactiontheme"));
    if (theme) {
      setIsDarkTheme(theme);
    }
  };

  const handleScroll = () => {
    // Check if the user has scrolled beyond the top of the page
    const scrolled = window.scrollY > 0;

    // Update the state 'isScrolled' based on the scroll position
    setIsScrolled(scrolled);

    // Add an event listener for the 'scroll' event on the window
    window.addEventListener("scroll", handleScroll);

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  };

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      // Check if the 'ethereum' object is available (Metamask is installed)
      if (!ethereum) return alert("Please install Metamask");

      // Get an instance of the Ethereum smart contract
      const transactionContract = getEthereumContract();

      // Fetch all transactions from the smart contract
      const availableTransactions =
        await transactionContract.getAllTransactions();

      // Map and structure the transactions for better representation
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timeStamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      // Log the structured transactions to the console
      // console.log(structuredTransactions);

      // Set the state with the structured transactions
      setTransactions(structuredTransactions);
    } catch (error) {
      // Log any errors that occur during the process
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      // Check if the 'ethereum' object is available (Metamask is installed)
      if (!ethereum) return alert("Please install Metamask");

      // Request user accounts from Metamask
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //   console.log(accounts);

      // Check if any accounts are available
      if (accounts.length) {
        // Set the current account state with the first account from the response
        setcurrentAccount(accounts[0]);

        // Fetch all transactions for the connected account
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      // Log any errors that occur during the process
      console.log(error);

      // Throw a custom error indicating a problem with the Ethereum object
      throw new Error("No Ethereum Object");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      // Get an instance of the Ethereum smart contract
      const transactionContract = getEthereumContract();

      // Retrieve the total count of transactions from the smart contract
      const transactionCount = await transactionContract.getTransactionsCount();

      // Store the transaction count in the local storage
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      // Log any errors that occur during the process
      console.log(error);

      // Throw a custom error indicating a problem with the Ethereum object
      throw new Error("No Ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      // Check if the 'ethereum' object is available (Metamask is installed)
      if (!ethereum) return alert("Please install Metamask");

      // Request user accounts from Metamask
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set the current account state with the first account from the response
      setcurrentAccount(accounts[0]);

      // Listen for changes in the connected accounts
      ethereum.on("accountsChanged", (newAccounts) => {
        // Update the current account state with the new account
        setcurrentAccount(newAccounts[0]);
        // Show an alert indicating the switch to the new account
        alert(`Switched to ${newAccounts[0]}`);
      });
    } catch (error) {
      // Log any errors that occur during the process
      console.log(error);
      // Throw a custom error indicating a problem with the Ethereum object
      throw new Error("No Ethereum Object");
    }
  };

  const sendTransaction = async () => {
    try {
      // Check if the 'ethereum' object is available (Metamask is installed)
      if (!ethereum) return alert("Please install Metamask");

      // Destructure values from the 'formData' object
      const { addressTo, amount, keyword, message } = formData;

      // Get Ethereum smart contract instance
      const transactionContract = getEthereumContract();

      // Parse the amount to Wei using ethers.js utility
      const parsedAmount = ethers.utils.parseEther(amount);

      // Request the user to send an Ethereum transaction using Metamask
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // Gas limit
            value: parsedAmount._hex, // Amount in hexadecimal format
          },
        ],
      });

      // Call the 'addToBlockchain' method on the smart contract
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      // Set loading state
      setIsLoading(true);
      //   console.log(`Loading - ${transactionHash.hash}`);

      // Wait for the Ethereum transaction to be mined
      await transactionHash.wait();

      // Set loading state to false after successful transaction
      setIsLoading(false);
      //   console.log(`Success - ${transactionHash.hash}`);

      // Retrieve the updated transaction count from the smart contract
      const transactionCount = await transactionContract.getTransactionsCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  useEffect(() => {
    getAllTransactions();
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
    handleScroll();
    getTheme();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setformData,
        handleChange,
        sendTransaction,
        testContext,
        transactions,
        isLoading,
        handleScroll,
        isScrolled,
        isDarkTheme,
        toggleTheme,
        isActive,
        setIsactive,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
