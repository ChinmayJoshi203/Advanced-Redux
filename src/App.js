import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui";
import Notification from "./components/UI/Notification";
import { cartActions } from "./store/cart";

let isInitial=true; 

function App() {
  const cartisVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification=useSelector(state=>state.ui.notification)
  const dispatch = useDispatch();
  useEffect(() => {

    if(isInitial){
      fetch("https://advanced-redux-29300-default-rtdb.firebaseio.com/cart.json")
      .then((response)=>{
        if(!response.ok){
          throw new Error("Failed to retrieve data")
        }
        const data=response.json()
        return data
      })
      .then((data)=>{
        console.log("Data",data.items.slice())
        dispatch(cartActions.replaceCart({
          items: data.items || [],
          quantity: data.quantity
        }))
      })
      .catch(error=>{
        dispatch(uiActions.showNotification({
          status: "error",
              title: "error",
              message: "cart data not recevied!",
        }))
      })


      isInitial=false;
      return;
    }
      
      if(cart.changed)
      {
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "sending",
            message: "sending cart data",
          })
        );  
        fetch(
          "https://advanced-redux-29300-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({items:cart.items, quantity: cart.quantity}),
          }
        )
          .then((repsonse) => {
            if (!repsonse.ok) {
              throw new Error("Sending Cart Data Failed");
            }
            dispatch(
              uiActions.showNotification({
                status: "success",
                title: "success",
                message: "cart data send succesfully",
              })
            );
          })
          .catch((error) => {
            dispatch(
              uiActions.showNotification({
                status: "error",
                title: "error",
                message: "cart data not sent!",
              })
            );
          });
      }
    
  }, [cart,dispatch]);

  return (
    <Fragment>
     {notification && <Notification 
       status={notification.status}
       title={notification.title}
       message={notification.message}
      />}
       <Layout>
      {cartisVisible && <Cart />}
      <Products />
    </Layout>
    </Fragment>
   
  );
}

export default App;
