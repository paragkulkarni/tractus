import './App.css';
import Contract from './components/Contract';
import ContractShow from './components/ContractShow';
import axios from 'axios';
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/esm/Button';
import SearchData from './components/SearchData';
import io from 'socket.io-client';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import { useLocation } from 'react-router-dom';
import socket from './socket';

// const socket = io("http://localhost:4000",{
//   path: "/socket.io",
//   transports: ["websocket"],
//   rejectUnauthorized: false
// });
const App = () => {
  
  const [data, setData] = useState({
    dataArray: [],
    limit: 5,
    activePage: 1
  });
  const [notification, setNotification] = useState([]);
  const location = useLocation();
  // console.log(location.state)
  


  // const getAllListOfContractor = () => {
  //   const result = axios.get('http://127.0.0.1:4000/list')
  //   console.log(result.data)

  //   // setData(result.data)
    
  // }\

  const getData=(pageNo)=>{ 
    axios.get(`http://localhost:4000/list?pageno=${pageNo}&itemsPerPage=${data.limit}`).then(res => {
      setData((prev) => ({
        ...prev,
        dataArray:res.data
      }))
    })
  }

  

  useEffect(() => {
  
    // console.log("check navigate")
    getData(data.activePage)

    socket.emit("msg", "I will ping you from frontend");
    socket.on("welcome", (data) => {
      console.log(data)
    })
   
    socket.on("pushNotifications", (data) => {
      // console.log("Recieved", data)
      setNotification((prev) => [...prev, data.message])
    });
    if (location.state) {
      setNotification((prev) => [...prev, location.state.message])
    }
    return () => {
      socket.off("pushNotifications");
    }
    
  }, [data.limit])
  



  const onFilter = (fName) => {
    if (fName=="all") { 
      getData(data.activePage)
    } else {
      console.log(data)
      let filterData = data.dataArray.filter((item) => item.status == fName)
      setData((prev) => ({
        ...prev,
        dataArray:filterData
      }))
    }

  }

  const searchdata = (searchData) => {

    if(isNaN(searchData)) {
      let searchArray = data.dataArray.filter(item => item.whose_created.includes(searchData));
      setData((prev) => ({
        ...prev,
        dataArray:searchArray
      }))
    } else {
      let searchArray = data.dataArray.filter(item => item.id==parseInt(searchData));
      setData((prev) => ({
        ...prev,
        dataArray:searchArray
      }))
    }
    // setData(searchData)
  }


  const handlePageChange = (pageNumber) => {
    setData((prev) => ({ ...prev, activePage: pageNumber }));
    getData(pageNumber)

  }


  return (
    <div className="container col text-center">
      <h1 className='text-center'>Contract Application</h1>
      <div className='row text-center'>
        <Contract />
        <div>
          <Card  bg="danger" className="my-2 text-white">
            <Card.Body>
              <Card.Text>Notification : {notification.length==0?'Empty':notification}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className='row col text-center'>
        <div className='row my-2'>
          <div className='col-2'></div>
          <div className='col-4'>
            <h5><b>Filter</b></h5>
            <Button className='me-2' onClick={()=>onFilter('all')}>All</Button>
            <Button className='me-2' onClick={()=>onFilter('start')}>Start</Button>
            <Button className='me-2' onClick={()=>onFilter('pending')}>Pending</Button>
            <Button className='me-2' onClick={()=>onFilter('complete')}>Fulfilled</Button>
          </div>
          <div className='col-4'>
            <h5 className='text-start'><b>Search by Client Name or Id</b></h5>
            <div className='col-4'><SearchData searchdata={searchdata} /></div>
            <div className='col-8'></div>
          </div>
          <div className='col-2'></div>
          
        </div>

        <div className='mx-auto row'>
          <div className='col-2'></div>
          <div className='col-8'>
            {data.dataArray.map((dataObj,index) => {
              return (
                <div>
                <ContractShow key={index} details={{
                  id: dataObj.id,
                  title: dataObj.title,
                  agreement: dataObj.contract_agg,
                  contract_owner: dataObj.whose_created,
                  status: dataObj.status
                  }} />
                  
                </div>
              )

            })}
          </div>
          <div className='col-2'></div>
        </div>
        <div className='mx-auto row'>
          <div className='col-2'></div>
          <div className='col-8 text-center'>
          <span><Pagination> 
            {
              data.dataArray.map((_, index) => {
                return (
                  <Pagination.Item
                    onClick={() => handlePageChange(index + 1)}
                    key={index + 1}
                    active={index + 1 === 1}
                  >
                    {index+1}
                  </Pagination.Item>
                )
              })
            }
            </Pagination> 
            </span>
            </div>
            <div className='col-2'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
