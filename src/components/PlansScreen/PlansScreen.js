import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { subscribed, selectUser } from '../../features/userSlice';
import db from '../../firebase';
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        db.collection("products").where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
               products[productDoc.id] = productDoc.data();
               const priceSnap = await productDoc.ref.collection
               ("prices").get();
               priceSnap.docs.forEach((price) => {
                   products[productDoc.id].prices = {
                       priceId: price.id,
                       priceData: price.data()
                   };
               });
            });
            setProducts(products);
        });
    }, []);

    useEffect(() => {
       {Object.entries(products).map(([productId, productData]) => {
        const isCurrentpackage = productData.name?.toLowerCase().includes(subscription?.role);
         return (dispatch(subscribed({
            premiun : isCurrentpackage,
        })));
       }
       )}   
    }, [products])

    const loadCheckOut = async (priceId) => {
        const docRef = await db.collection('customers')
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if(error) {
              alert(`An error occured: ${error.message}`)  
            }

            if(sessionId) {
                const stripe = await loadStripe('pk_test_51JgixgSCDxBCSyPWXepfc6B2aDXEF2Iwn4xuae5HUxIDwkCj0esCywBD5390aCvdShtVQi0cB9ZoHuwRZhI7boiP00otrLX4Ni');
                stripe.redirectToCheckout({ sessionId })
            }
        })
    };



    return (
        <div className="plansScreen">
            {subscription && <p>Renewal date:{new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
               return (
                   <div key={productId} className={`${isCurrentPackage && "plansScreen_plan_disabled"} plansScreen_plan`}>
                       <div>
                           <h5>{productData.name}</h5>
                           <h6>{productData.description}</h6>
                       </div>
                        <button onClick={() => !isCurrentPackage && loadCheckOut(productData?.prices?.priceId)}>
                           {isCurrentPackage ? 'Subscribed' : 'Subscribe'} 
                        </button>
                   </div>
                );
            })}
        </div>
    )
}

export default PlansScreen
