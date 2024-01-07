import { useState, useEffect, createContext, useContext } from "react";
import {ethers} from "ethers";

import {contractABI, contractAddress} from "../utils/constants"

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider =  new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract

    // console.log(provider, signer, transactionContract)
}
  
export const TransactionProvider = ({children}) => {

    const [currentAccount, setcurrentAccount] = useState("");
    const [formData, setformData] = useState({adressTo:"", amount:"", keyword:"", message:"" })
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [transactions, setTransactions] =  useState([])
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isActive, setIsactive] = useState("Home")
    const testContext = "working context"
    // console.log("isActive: ", isActive)

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
      };

    const handleScroll = () => {
        const scrolled = window.scrollY > 0;
        setIsScrolled(scrolled);
        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        }
    }

    const handleChange = (e, name) => {
        setformData((prevState) => ({...prevState, [name]:e.target.value}))
    }

    const getAllTransactions =async () => {
        try {
            if(!ethereum) return alert ("please install meatamask")

            const transactionContract = getEthereumContract()
            const availableTransactions = await transactionContract.getAllTransactions()

            const structuredTransactions= availableTransactions.map((transaction) => ({
                addressTo:transaction.receiver,
                addressFrom: transaction.sender,
                timeStamp:new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount:parseInt(transaction.amount._hex) / (10 ** 18)

            }))
            console.log(structuredTransactions)

            setTransactions(structuredTransactions)
        } catch (error) {
            console.log(error)
        }
    }
    const checkIfWalletIsConnected = async () => {

        try {
            
            if(!ethereum) return alert ("please install meatamask")
    
            const accounts = await ethereum.request({method :"eth_accounts"})
            console.log(accounts)

            if(accounts.length) {
                setcurrentAccount(accounts[0])

                getAllTransactions()
            } else{
                console.log("no accounts Found")
            }
        }
         catch (error) {
            console.log(error)
            throw new Error("No Ethereum Object")
        }
    }

    const checkIfTransactionsExist = async () => {

        try {
            const transactionContract = getEthereumContract()
            const transactionCount = await transactionContract.getTransactionsCount()

            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.log(error)

            throw new Error ("no ethereum object")
            
        }

    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert ("please return Metamask")

            const accounts = await ethereum.request({method :"eth_requestAccounts"})
            
            setcurrentAccount(accounts[0])

            ethereum.on('accountsChanged', (newAccounts) => {
                setcurrentAccount(newAccounts[0]);
                alert(`Switched to ${newAccounts[0]}`);
              });

        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum Object")
        }
    }
   
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert ("please install Metamask")

            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const pasrsedAmount = ethers.utils.parseEther(amount)

        
            await ethereum.request({
                method:"eth_sendTransaction",
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:"0x5208",
                    value:pasrsedAmount._hex
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, pasrsedAmount, message, keyword);

            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`success - ${transactionHash.hash}`) 

            const transactionCount = await transactionContract.getTransactionsCount()
            setTransactionCount(transactionCount.toNumber())
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum Object")
        }
    }
    useEffect(() => {
        getAllTransactions()
      checkIfWalletIsConnected()
      checkIfTransactionsExist()
      handleScroll()
    }, [])
    
    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setformData, handleChange,sendTransaction, testContext, transactions, isLoading, handleScroll, isScrolled, isDarkTheme, toggleTheme, isActive, setIsactive }}>
            {children}
        </TransactionContext.Provider>
    )
}