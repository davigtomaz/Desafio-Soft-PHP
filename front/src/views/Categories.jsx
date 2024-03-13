
import '../index.css'
import FormCategories from '../components/categories/FormCategories.jsx'
import TableCategories from '../components/categories/TableCategories.jsx'

function Categories() {


  return (
    <div >
      
      <div className='container'>
        <div className='gridItem1'>
            <FormCategories />
        </div>
        <div className='gridItem2'>
            <TableCategories />
        </div>
      </div>
    </div>
  )
}

export default Categories
