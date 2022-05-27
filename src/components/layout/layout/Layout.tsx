import React, {FC} from 'react';

import './layout.styles.scss'
import Header from "../header/Header";
import OrderHistory from "../../orders/OrderHistory";


interface layoutProps  {
    children: any
}

const Layout:FC<layoutProps> = ({children}) => {




    return (
        <div className='layout'>
            {/*<OrderHistory />*/}
            <Header />
            <main>
                {children}
            </main>

        </div>
    );
};

export default Layout;