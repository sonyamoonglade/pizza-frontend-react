import React, {useEffect} from 'react';

import {useAxios} from "./hooks/useAxios";
import Layout from "./components/layout/layout/Layout";
import Catalog from "./components/catalog/catalog/Catalog";
import AppForm from "./components/appForm/AppForm";

import ProductPresentation from "./components/catalog/productPresentation/ProductPresentation";
import {getCatalogProducts, productSelector, useAppDispatch, useAppSelector} from "./redux";



function App() {

  const dispatch = useAppDispatch()
  const {client} = useAxios()
  const {productList} = useAppSelector(productSelector)

  //@ts-ignore
  useEffect(() => {
    dispatch(getCatalogProducts(client))

  },[])

  return (
    <Layout >

      {productList.length !== 0 &&
          <Catalog productList={productList} />
      }

      <AppForm />
      <ProductPresentation />
    </Layout>
  );
}

export default App;
