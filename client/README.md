# Sample Hardhat Project

Project Description:
This project is web application that interacts with the Ethereum blockchain to manage and display transactions. The application includes functionalities which  includes connecting a user's wallet, sending transactions, fetching and displaying transaction history by calling specific functions on the smart contract, and also managing a dark/light theme toggle. The Ethereum blockchain interactions are facilitated by the ethers.js library using hardhat, and the React framework is used for building the user interface.

Techniques I  Used:

React.js:
The project is built using React.js, a popular JavaScript library for building user interfaces. React components are used to structure the application, useEffect hook, and state management hooks like useState are employed to handle component-level state.

Context API:
The React Context API is utilized to manage and share state across different components of the website efficiently. The TransactionContext is created to provide a centralized state for managing transaction-related data and functions which gives the code a better structure, management and readability .

Ethers.js:
Ethers.js is used for Ethereum-related interactions. It provides an abstraction for working with Ethereum contracts, signing transactions, and interacting with the blockchain.

Web3:
The code checks for the existence of the ethereum object, which is commonly used to connect to a user's wallet (MetaMask) and interact with the Ethereum blockchain using the Web3 API.

LocalStorage:
The project uses localStorage to store and retrieve the transaction count, presumably for persisting some application state across page reloads.

Event Handling:
Event handling is employed for various purposes, such as handling scroll events (handleScroll) and responding to changes in Ethereum account, when connecting a wallet, when calling functions and methods on the contract and more.

Conditional Rendering:
There are conditional rendering techniques used, where certain components or styles are conditionally rendered based on the application state.

CSS Framework:
used a CSS framework -Tailwind CSS for styling.

the following commands shows our way around the code:

```shell
// to run in production
npx run dev
// to build the application from this github repo
npm install 
npm run build
// I have built this already, except you want to make changes on your end, you can simply take the build folder(dist) and deploy to your server, you need to add an environment variable named "VITE_GIPHY_API", whoose value is the api key for generating the giph images, you can find this here:(https://api.giphy.com/v1/gifs) by following the neccessary steps, i have provided a fallback image, just incase you didnt get this
npx hardhat run scripts/deploy.js

//Thank you

```
