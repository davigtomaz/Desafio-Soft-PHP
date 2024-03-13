
import '../index.css'
import FormHome from '../components/home/FormHome.jsx'
import TableHome from '../components/home/TableHome.jsx'

function Home() {

  return (
    <div >
      <div className='container'>
        <div className='gridItem1'>
          <FormHome />
        </div>
        <div className='gridItem2'>
        <TableHome />
        </div>
      </div>
    </div>
  )
}

export default Home
