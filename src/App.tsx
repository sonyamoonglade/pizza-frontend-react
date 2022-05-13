import React, {useEffect} from 'react';
import {useAppDispatch} from "./redux/hooks/AppDispatch";
import {useAppSelector} from "./redux/hooks/AppSelector";
import {getCatalogProducts} from "./redux/product/product.async-actions";
import {useAxios} from "./hooks/useAxios";
import Layout from "./components/layout/layout/Layout";
import Catalog from "./components/catalog/catalog/Catalog";
import AppForm from "./components/appForm/AppForm";
import {productSelector} from "./redux/product/products.selectors";
import ProductPresentation from "./components/catalog/productPresentation/ProductPresentation";



function App() {

  const dispatch = useAppDispatch()
  const {client} = useAxios()
  const {productList,isPresentingNow} = useAppSelector(productSelector)

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
