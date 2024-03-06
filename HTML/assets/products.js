const url = 'http://localhost/routers/products.php'
const urlCategories = "http://localhost/routers/categories.php"
const listFull = document.getElementById('lista')
select = document.querySelector("select");
const listProducts = []
const listCategories = []
const button = document.getElementById("btn")
const form = document.getElementById('form');

const input_name = document.getElementById('product_name')
const input_amount = document.getElementById('product_amount')
const input_unit = document.getElementById('product_unit')
const input_category = document.getElementById('product_category')
    



async function getAllProducts(){
const response = await fetch(url)
const data = await response.json();  
      listFull.innerHTML = "";

      data.forEach((products, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <tr id="trItens">
        <td>${products.code}</td>
        <td>${products.name}</td>
        <td>${products.amount}</td>
        <td>${products.price}</td>
        <td>${products.name_cat}</td>
        <td>${products.tax_cat}%</td>
        <td><button  class="buttonDelete" onclick="deleteProducts(${products.code})">Delete</button></td>
        </tr>
      `;
      listFull.appendChild(tr);
      });
}
     
async function loadingCategories(){
    const storedCategories = await fetch(urlCategories)
    const data = await storedCategories.json()

    listCategories.push(...data);
    getAllProducts() 
    return data

}

async function selectCategories(){

  const categories =  await loadingCategories()

  for (const value of categories) {
  input_category.innerHTML += `<option value="${value.code}">${value.name}</option>` 
  }

}

async function getCategoriesById(id){
  const response = await fetch(urlCategories).then(response=>response.json())
  let data = await response;
  data = data.filter(item=>item.categories == id)
  
  return data }


  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if(input_name.value === '' || input_amount.value === '' || input_unit.value === ''){
        return alert('Preencha Todos os Dados!')
    }

      const data = new FormData(form);
      try {
        const res = await fetch(
          url,
          {
            method: 'POST',
            body: data,
          },
          window.location.reload()
        )
      } catch (error) {
        console.log(error.message);
      }
    });


async function deleteProducts(code) {
    const urlDelete = `http://localhost/routers/products.php?code=${code}`
    await fetch(urlDelete, {
        method: 'DELETE'
    })  
    .then(response => response.json())
    .then(data => {console.log(data);});
    window.location.reload()
  }
        


selectCategories()
getAllProducts();
getCategoriesById();
loadingCategories();
    
//     const listProducts = []
//     const listCategories = []
//     const button = document.getElementById("btn")
//     const listFull = document.getElementById('lista')
//     const input_name = document.getElementById('product_name')
//     const input_amount = document.getElementById('product_amount')
//     const input_unit = document.getElementById('product_unit')
//     const input_category = document.getElementById('product_category')
    
//     select = document.querySelector("select");

//     

    

//     function loadingProducts(){
//         const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//         listProducts.push(...storedProducts);
//         showItens() 
        
//     }

//     function loadingCategories(){
//         const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
//         listCategories.push(...storedCategories);
//         showItens() 
//         return storedCategories
        
//     }


//     const categories = loadingCategories()
    
//     for (const value of categories) {
//     input_category.innerHTML += `<option value="${value.name}">${value.name}</option>` 
//     }
 

//     function deleteProduct(index){
//         listProducts.splice(index,1);
//         localStorage.setItem('products', JSON.stringify(listProducts));
//         showItens();
//     }

//     function addProduct() {
//         event.preventDefault()

        
//         if(input_name.value === '' || input_amount.value === '' || input_unit.value === ''){
//             return alert('Preencha Todos os Dados!')
//         }
       
    
//         let category = getCategorybyID(input_category.value)

//         listProducts.push({
//         code: numberCode(), 
//         name: Verify(input_name.value), 
//         amount: input_amount.value, 
//         unit : input_unit.value, 
//         category: category})
//         localStorage.setItem('products', JSON.stringify(listProducts));
//         showItens()
        
//         input_amount.value = ""
//         input_unit.value = ""
//         input_category.value = ""

//     }

// }

//     function getCategorybyID(id){
//         const getbyid= JSON.parse(localStorage.getItem ('categories')) || []
//         for ( let category of getbyid){
//             if (
//                 id == category.name
//             ){
//                 return category
//             }
//         }
        
//     }


//     button.addEventListener('click', addProduct)
//     loadingProducts();
//     loadingCategories();
