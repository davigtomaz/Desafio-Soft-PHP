const url = 'http://localhost/routers/orders.php'
const listFull = document.getElementById('lista')
const urlOrderItem = 'http://localhost/routers/order_item.php'


async function getAllProducts(){
    const response = await fetch(url)
    const data = await response.json();

    
    listFull.innerHTML = "";
        
    data.forEach((orders, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <tr id="trItens">
        <td>${orders.code}</td>
        <td>${orders.tax}</td>
        <td>${orders.total}</td>
        <td ><button class="buttonView" onclick="openModal('${orders.code}')" >View</button></td>
        </tr>
        `;
        listFull.appendChild(tr);
    });
}


 async function getOrder_ItemById(id){
    const response = await fetch(urlOrderItem).then(response=>response.json())
    let data = await response;
    console.log(data)
    const res = data.filter(item=>item.order_code == parseInt(id) )
    return res } 


async function openModal(code){
    const data = await getOrder_ItemById(code);
  
        newList = ''
        const modal = document.getElementById('modal')
        const table = document.getElementById('tableHistory')
        modal.classList.remove('hidden')

        data.forEach(item => {
            console.log(item)
            newList += `
                    <tr id="trItens">
                        <td>${item.product_name}</td>
                        <td>${item.category_name}</td>
                        <td>${item.amount}</td>
                        <td>${item.price}</td>
                    </tr>
            </table>
        
            `
        }
        
        )
        table.innerHTML = newList
        
    }

function closeModal(){
   const modal = document.getElementById('modal')
    modal.classList.add('hidden')
}

getAllProducts();


const button = document.querySelector('button')

