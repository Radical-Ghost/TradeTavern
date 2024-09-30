import React from 'react';
import Navigationbar from './comp/Navbar';
import Graph from './comp/StockGraph';

const Invest = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Navigationbar/>
      <div className="content p-4" style={{marginTop:'-23px' , marginLeft:'-24px' , width: '100%', padding:'0px' , width: '100%'}}>
        <h1>Invest page</h1>
        
      </div>
    </div>
  );
};

export default Invest;
