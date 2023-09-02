//./components/UpStore.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addItem,addList,addReport,addTrade_data } from '../actions';
import fetchData from './ReqServer';
import LoadServer from './LoadServer';
import LoadReport from './LoadReport';
import loadTrading_data from './loadTrading_data';

const UpStore = ({ items,lists,reports,trade_datas,addItem,addList,addReport,addTrade_data }) => {
    useEffect(()=>{
        fetchData()
            .then(marketListData => {
                addItem(marketListData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            LoadServer()
            .then(response => {
                response.map(item=>addList(item))
            })
            .catch(error => {
                console.error('Error:', error);
            });
            LoadReport()
            .then(response => {
                response.map(item=>addReport(item))
                // addReport(response);
                // console.log(response);
    })
            .catch(error => {
                console.error('Error:', error);
            });
            // response.data.map(item=>addList(item))
            loadTrading_data()
            .then(response => {
                response.map(item=>addTrade_data(item))
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },[])
          

    const handleShowitem=()=>{
    //   console.log(trade_datas);
    }
    return (
        <div>
            {/* <button onClick={handleAdditem}>gotostore</button> */}
            {/* <button onClick={handleShowitem}>show</button> */}
        </div>
    );
};
const mapStateToProps = (state) => ({
  items: state.items,
  lists: state.lists,
  reports: state.reports,
  trade_datas: state.trade_datas,

});
export default connect(mapStateToProps, {addItem,addList,addReport,addTrade_data})(UpStore);

// export default connect(null, { addItem })(UpStore);