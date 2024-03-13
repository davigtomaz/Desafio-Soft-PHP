const url = 'http://localhost/routers/products.php'
const urlOrders = "http://localhost/routers/orders.php"
const urlOrderItem = 'http://localhost/routers/order_item.php'
const listCarts = []
const listProducts = []
const listCategories = []
const listOrders = []
const button = document.getElementById("btn")
const listFull = document.getElementById('lista')
const input_name = document.getElementById('product_name')
const input_amountCart = document.getElementById('cart_amount')
const input_amountCartValue = document.getElementById('cart_amount').value
const input_tax = document.getElementById('cart_tax')
const input_price = document.getElementById('cart_price')
select = document.querySelector("select");
const getCart = () => JSON.parse(localStorage.getItem("carts")) || [];
const setCart = (carts) => localStorage.setItem("carts", JSON.stringify(carts));
const readCart = () => getCart();
const cart = readCart();

let totalPurchase = 0;
let totalTax = 0

    async function showItens(){
        newList = ''
        totalPurchase = 0
        totalTax = 0

        listCarts.forEach((x, index) => {
                newList +=  `<tr id="trItens">
                                <td>${x.name}</td>
                                <td>${x.unit}</td>
                                <td>${x.amount}</td>
                                <td>${x.total}</td>
                                <td><button  class="buttonDelete" onclick="deleteCarts(${index})">Delete</button></td>
                            </tr>`
        totalPurchase += parseFloat(x.total)
        totalTax += parseFloat(x.unit*x.amount*x.tax / 100)
        })   

        listFull.innerHTML = newList

        const totalFinish = document.getElementById('totalFinish')
        totalFinish.innerHTML = `<p>Tax: ${totalTax.toFixed(2)}</p> <p> Total: ${totalPurchase.toFixed(2)} </p>`
    }

    async function loadingProducts(){
        const storedProducts = await fetch(url)
        const data = await storedProducts.json()
        listProducts.push(...data);
        showItens()
        return data
        
    }

    async function loadingOrders(){
        const storedOrders = await fetch(urlOrders)
        const data = await storedOrders.json()
        listOrders.push(...data);
        return data
        
    }

    async function selectProducts(){
        const products =  await loadingProducts()
        for (const value of products) {
            input_name.innerHTML += `<option value="${value.code}">${value.name} Quantidade Disponível: ${value.amount}</option>` 
        }
        
    }

    async function getProductsById(id){
        const response = await fetch(url).then(response=>response.json())
        let data = await response;
        const res = data.filter(item=>item.code == parseInt(id) )
        return res
        
    }
    
    async function findBy(id){
        const response = await fetch(url).then(response=>response.json())
        let data = await response;
        const res = data.find((item) => item.code == parseInt(id))
        return res
        
    }

    async function addCart() {
        event.preventDefault()
        
        const selectedProduct = await findBy(input_name.value);
        const Verify = parseInt(selectedProduct.amount) >= parseInt(input_amountCart.value)
        const existingCartItem = listCarts.find(item => item.code_product === selectedProduct.code);

        if (existingCartItem) {
            console.log(existingCartItem)
            existingCartItem.amount = (parseInt(existingCartItem.amount) + parseInt( input_amountCart.value)).toString()
            existingCartItem.total = parseFloat(existingCartItem.unit * existingCartItem.amount + (existingCartItem.amount * existingCartItem.unit *( existingCartItem.tax / 100) ))
            const index = listCarts.forEach((item, index) => {
                if (item.code_product === existingCartItem.code_product) {
                    listCarts[index] = existingCartItem
                }

            })
            localStorage.setItem('carts', JSON.stringify(listCarts));
            showItens() 
        } else {

            if(input_amountCart.value === ''){
                return alert('Preencha Todos os Dados!')
            }
                
            if ( Verify ){
                listCarts.push({
                    code: numberCode(),
                    code_product: selectedProduct.code,
                    name: selectedProduct.name, 
                    amount: input_amountCart.value, 
                    unit : selectedProduct.price,
                    category : selectedProduct.name_cat,
                    tax : selectedProduct.tax_cat,
                    total: parseFloat(input_amountCart.value * selectedProduct.price + (input_amountCart.value * selectedProduct.price * (selectedProduct.tax_cat / 100)) )
                })
           
                localStorage.setItem('carts', JSON.stringify(listCarts));
                showItens()
                
                selectedProduct.name = "";
                selectedProduct.unit = "";
                
      
            }else {
                 alert('Quantidade Indisponível ')
           
        }
        
        
    }}

    function loadingCarts(){
        const storedCarts = JSON.parse(localStorage.getItem('carts')) || [];
        showItens() 
        return storedCarts
    }

    async function changeProduct(event){
        let value =  await getProductsById(event.target.value)

        input_tax.value = value[0].tax_cat
        input_price.value = value[0].price
    }

    function numberCode() {
        return  Math.random().toString(16).slice(2)
    }
    
    function transformFormData(obj) {
   
        const formData = new FormData();
    
        Object.entries(obj).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
        return formData;
    }

    const postOrder = async (itensOrder) => {
        try {
            const res = await fetch(urlOrders, {
                method: 'POST',
                body: itensOrder,
            })
        } catch (error) {
            console.log(error.message);
        };
    }

    const postOrderItem = async (itensOrderItens) => {
     
        try {
            const res = await fetch(urlOrderItem, {
                method: 'POST',
                body: itensOrderItens,
            })
        } catch (error) {
            console.log(error.message);
        };
    }

    const CartFinish = async () => {
        const productsCarts = await loadingCarts()
        const products =  await loadingProducts()
   
        for (let productCart of productsCarts){
            
            for (let product of products){
           
                if(product.code == productCart.code_product){
                    
                    if (parseInt(productCart.amount) > parseInt(product.amount)){
                        
                        alert('Quantidade insdisponível no estoque')
                        return false 
                    
                    }else{
                        const order = {
                            code : parseInt((Math.random() * 1000000).toFixed(0)),
                            total: totalPurchase.toFixed(2),
                            tax: totalTax.toFixed(2)
                        }
                        const itensOrder = transformFormData(order)
                        await postOrder(itensOrder);
                    
                        let newCart = getCart()
                        for (let item of newCart){
                            console.log(item)
                            let order_item = {
                                order_code: parseInt(order.code),
                                product_code: item.code_product,
                                amount: parseInt(item.amount),
                                price: item.unit,
                                tax: item.tax,
                            }
                            let itensOrderItens = transformFormData(order_item)
                            await postOrderItem(itensOrderItens);
                        }    
                        localStorage.removeItem('carts')
                        listCarts.length=0
                        showItens()
                        }
                }
            }
        }
    }
  

    function deleteCarts(index){
        listCarts.splice(index,1);
        localStorage.setItem('carts', JSON.stringify(listCarts));
        showItens();
    }

selectProducts()
loadingProducts()
loadingCarts();
button.addEventListener('click', addCart)
document.querySelector('.buttonFinish2').addEventListener('click', CartFinish);       
