import axios from 'axios';
import { useState, useEffect } from 'react';
import {OrderSummary} from "./OrderSummary.jsx";
import './checkout-header.css';
import './CheckoutPage.css';
import {PaymentSummary} from "./PaymentSummary.jsx";

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOptions(response.data);
            })

        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data);
            })
    }, []);

    return (
        <>
            <title>Checkout</title>

        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <a href="/">
                        <img className="logo" src="images/logo.png"/>
                        <img className="mobile-logo" src="images/mobile-logo.png"/>
                    </a>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<a className="return-to-home-link"
                                 href="/orders">3 items</a>)
                </div>

                <div className="checkout-header-right-section">
                    <img src="images/icons/checkout-lock-icon.png"/>
                </div>
            </div>
        </div>

    <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
            <OrderSummary deliveryOptions={deliveryOptions} cart={cart}/>
            <PaymentSummary paymentSummary={paymentSummary} />
        </div>
    </div>
    </>
    );
}