import React, {useEffect} from 'react';

import {useAxios} from "./hooks/useAxios";
import Layout from "./components/layout/layout/Layout";
import Catalog from "./components/catalog/catalog/Catalog";
import AppForm from "./components/appForm/AppForm";

import ProductPresentation from "./components/catalog/productPresentation/ProductPresentation";
import {
  getCatalogProducts,
  productActions,
  productSelector,
  useAppDispatch,
  useAppSelector,
  windowSelector
} from "./redux";
import {useCart} from "./hooks/useCart";
import CartLink from "./components/catalog/cart/cartLink/CartLink";



function App() {

  const {client} = useAxios()


  const dispatch = useAppDispatch()
  const {productList} = useAppSelector(productSelector)
  const {menu,cart} = useAppSelector(windowSelector)

  useEffect(() => {
    dispatch(getCatalogProducts(client))
  },[])
  useEffect(() => {
    const body = document.querySelector('body')
    console.log(cart)
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
      <CartLink />
      <AppForm />
      <ProductPresentation />
    </Layout>
  );
}

export default App;
