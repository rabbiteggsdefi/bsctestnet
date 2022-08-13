import React , { useCallback , useState } from 'react';
// import Image from 'next/image';
import toast from "../components/Toast";
import styles from '../styles/Home.module.css';
import SimpleStorageContract from "../config/contracts/Dstate.json";
import { TOKENNAME ,BASECOIN, CONTADDRESS ,TXNURL , RXSQTY, TIPS, GUIDE, TOKENADDRESS} from '../config/constclient';
import Web3 from "web3";

export default function Basket(props) {
  const { cartItems, onAdd, onRemove, isConnected, web3, accounts } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = itemsPrice;
  const [isLoading, setIsLoading] = useState(false);
  const ContractAddress = CONTADDRESS;
  // env 


  const notify = useCallback((type, message , action) => {
    toast({ type, message, action });
  }, []);

  const copyToken = async () => {
    navigator.clipboard.writeText(TOKENADDRESS);
    notify("success","Address Copied! Please Import token into MetaMask ", GUIDE);
   }


   const callCont = async (totalPrize) => {
    try {

      if(accounts) {

      let totalamt = totalPrize.toString();


      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        ContractAddress
      );

        if(!instance) {
          notify("info","Please try again! To know about tips and tricks ", TIPS);
        }
        else {
      await instance.methods.buy().send({ from: accounts , value: Web3.utils.toWei(totalamt, 'ether')}, 
      function(error, transactionHash){
        if (error) {

          notify("info","Please try again! To know the steps ", GUIDE);
        } else {

          notify("success", "Please find the receipt  " , TXNURL + transactionHash);
          notify("info","Minting is the fuel,Please encourage others", TIPS);
        
        }
    });
  }
  } else
  {
    
  }
    } catch (error) {

      notify("info","Please try again! To know the steps ", GUIDE);

    }
  }; 

  const buyTok = async (totalPrize) => {
    try {
    setIsLoading(true);
    
    
    await callCont(totalPrize);
    setIsLoading(false);

  } catch (err) {
    setIsLoading(false);
  }
  }


  return (
    <div className={styles.block}>
      <div>
      <div className={styles.lineqty}></div>
        {cartItems.map((item) => (<span key={item.id}>
          <div className={styles.brow}>  <center>
            <div className={styles.bcolumn}>
            {totalPrice.toFixed(3)} 
            </div>
            <div className={styles.bcolumn}>
              <button onClick={() => onRemove(item)} className={styles.remove}>
                -
              </button>{' '} {item.qty} 
              <button onClick={() => onAdd(item)} className={styles.add}>
                +
              </button>
            </div> </center>
           </div>
             <div className={styles.infi}>You receive {RXSQTY * item.qty} {TOKENNAME}</div></span>
        ))}

        {cartItems.length !== 0 && (
          <>
              <div className={styles.menulinef} ><button
                              onClick={(e) => {
                                e.preventDefault();
                                copyToken();
                              }
                            }
              >Copy Token Address</button></div>
              <div>
              
              {isConnected && (<button className={styles.paybutton} 
                onClick={(e) => {
                    e.preventDefault();
                    buyTok(totalPrice.toFixed(3));
                  }
                }
               disabled={isLoading}>
                 {isLoading && <span className={styles.loaderMint}></span>}
                Mint
              </button>)}

              </div>

          </>
        )}
      </div>
    </div>
  );
}
