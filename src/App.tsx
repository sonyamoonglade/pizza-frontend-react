import React, {useEffect} from 'react';

import {useAxios} from "./hooks/useAxios";
import Layout from "./components/layout/layout/Layout";
import AppForm from "./components/appForm/AppForm";

import {
  getCatalogProducts,
  productSelector,
  useAppDispatch,
  useAppSelector,
  windowSelector
} from "./redux";
import CartLink from "./components/cart/cartLink/CartLink";
import OrderLink from "./components/order/orderLink/OrderLink";
import ProductPresentation from "./components/product/productPresentation/ProductPresentation";
import Catalog from "./components/catalog/Catalog";

export const baseBackendUrl = "https://pizza-fullstack.herokuapp.com"


function App() {

  const {client} = useAxios()


  const dispatch = useAppDispatch()
  const {productList,isCartEmpty} = useAppSelector(productSelector)
  const {navigation,cart} = useAppSelector(windowSelector)

  useEffect(() => {
    dispatch(getCatalogProducts(client))
  },[])
  useEffect(() => {
    const body = document.querySelector('body')
    if(navigation || cart){
      body.style.overflow = 'hidden'
    }
    else {
      body.style.overflow = 'visible'
    }

  },[navigation,cart])


  return (
    <Layout >

      {
        productList.length !== 0 &&
        <Catalog productList={productList} />
      }
      {cart && <OrderLink />}
      {!isCartEmpty && <CartLink />}
      <AppForm />
      <ProductPresentation />
    </Layout>
  );
}

export default App;
