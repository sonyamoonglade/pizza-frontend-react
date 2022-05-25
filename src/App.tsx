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
import {useAuthentication} from "./hooks/useAuthentication";



function App() {

  const {client} = useAxios()


  const dispatch = useAppDispatch()
  const {productList,isCartEmpty} = useAppSelector(productSelector)
  const {menu,cart} = useAppSelector(windowSelector)

  useEffect(() => {
    dispatch(getCatalogProducts(client))
  },[])
  useEffect(() => {
    const body = document.querySelector('body')
    if(menu || cart){
      body.style.overflow = 'hidden'
    }
    else {
      body.style.overflow = 'visible'
    }

  },[menu,cart])


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
