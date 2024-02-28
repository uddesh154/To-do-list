const list = [];

window.onload = function() {
    const addtolistEl = document.getElementById('addtolist');
    const addButtonEl = document.getElementById('addButton'); 
    const listsEl = document.getElementById('lists');   
    const countEl = document.getElementById('count');
    let checkedindex;
    let checkedvalue;

    createList(list);
    countEl.innerHTML = list.length;

    addtolistEl.addEventListener('click',() => {
        addButtonEl.style = 'opacity: 1';
    });

    addButtonEl.addEventListener('click',() => {
        list.push(addtolistEl.value);
        addButtonEl.style = 'opacity: 0';
        addtolistEl.value = '';
        createList(list)
    });

    function createList(list) {  
        let listChild = listsEl.lastChild;
        while(listChild) {
            listsEl.removeChild(listChild);
            listChild = listsEl.lastChild;
        } 
        countEl.innerHTML = list.length;       
        list.forEach((element,index) => {
            const divEl = document.createElement('div');
            const labelEl = document.createElement('label');
            const inputEl = document.createElement('input');
            inputEl.type = 'checkbox';
            inputEl.id = index;
            inputEl.value = element;
            if(element == checkedvalue) {
                inputEl.checked = true;
                labelEl.innerHTML = `${element}`;
            }else {
                labelEl.innerHTML = `${element}<button class="delete">X</button>`;
            }       
            divEl.appendChild(inputEl);
            divEl.appendChild(labelEl);
            listsEl.appendChild(divEl);
        });
        checkboxListener();
        btnListener();
    }

    function checkboxListener() {
        const checkboxs = document.querySelectorAll('input[type = checkbox]');
        const removeButtonEl = document.querySelectorAll('.delete');
        checkboxs.forEach((checkbox) => {
            checkbox.addEventListener('change',(event)=> {
                if(checkbox.checked) {
                    checkedvalue = checkbox.value;
                    removeButtonEl[checkbox.id].classList.remove('delete');
                    removeButtonEl[checkbox.id].classList.add('deleteChecked');
                }else {
                    removeButtonEl[checkbox.id].classList.add('delete');
                    removeButtonEl[checkbox.id].classList.remove('deleteChecked');
                }
            })
        })
    }

    function btnListener() {
        const removeButtonEl = document.querySelectorAll('.delete');
            removeButtonEl.forEach((btn,index) => {
                btn.addEventListener('click',() => {
                    list.splice(index,1);
                    createList(list);
                });
            });
    }
}