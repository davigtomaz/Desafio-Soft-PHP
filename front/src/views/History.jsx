
import '../index.css'
import HistoryComponent from '../components/history/HistoryComponent.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function History() {
    const navigate = useNavigate()
    const logged = useSelector((rootReducer) => rootReducer.userReducer.Logged)
  
  function Verify(){
    if(!logged){
      return navigate('/')
    }
  }
    useEffect(() => {
      Verify();
    }, []);
  

  return (
      
    <div >
        <HistoryComponent />
    </div>
  )
}

export default History
