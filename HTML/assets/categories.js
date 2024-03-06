const url = 'http://localhost/routers/categories.php'
const listFull = document.getElementById('lista')
const form = document.getElementById('form');
const input_name = document.getElementById('category_name')
const input_tax = document.getElementById('category_tax')

form.addEventListener('submit', async event => {
    event.preventDefault();

    if(input_name.value === '' || input_tax.value === ''){
      return alert('Preencha Todos os Dados!')
  }

    const data = new FormData(form);
    try {
      const res = await fetch(url,
        {
          method: 'POST',
          body: data,
        },
        window.location.reload()
      );
    } catch (error) {
      console.log(error.message);
    }
  });

  async function deleteCategories(code) {
    const urlDelete = `http://localhost/routers/categories.php?code=${code}`
     await fetch(urlDelete, {
        method: 'DELETE'

    })  
    .then(response => response.json())
    .then(data => {console.log(data);});
    window.location.reload()
    }


async function getAllCategories(){
    const response = await fetch(url)
    const data = await response.json();
    listFull.innerHTML = "";
        
    data.forEach((categories, ) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <tr id="trItens">
        <td>${categories.code}</td>
        <td>${categories.name}</td>
        <td>${categories.tax}%</td>
        <td><button  class="buttonDelete" onclick="deleteCategories(${categories.code})">Delete</button></td>
        </tr>
        `;
        listFull.appendChild(tr);
        });
    }
     

    getAllCategories();





