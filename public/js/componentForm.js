// Vendor cache for select option
let componentVendorCache = {};

window.onload = async function(){
    // Create component list
    const selectElement = document.getElementById('vendorList');
    let vendorList = await getVendorList();
    // Create vendor list option
    createOption(selectElement, vendorList);

    // Add btn event
    document.getElementById('buttonAdd').addEventListener('click', addVendor);
    document.getElementById('buttonSubmit').addEventListener('click', submitForm);
}

async function getVendorList(componentSelected){
    let vendorList =[];
    await fetch(`/vendors`)
    .then((res)=>{
        return res.json()
    }).then((myJson)=>{
        // Array of vendors
        myJson.forEach((vendor) => {
            vendorList.push(vendor.name);
        });
    });
    return vendorList.sort();
}

function createOption(selectElement, optionValue){
    for(let j=0; j<optionValue.length ;j++){
        let newOption = document.createElement("option");
        let newContent = document.createTextNode(optionValue[j]); 
        newOption.appendChild(newContent);
        newOption.value= optionValue[j];
        selectElement.appendChild(newOption);
    }    
}

function submitForm(e){
    e.preventDefault();

    // Component Info
    const componentName = document.getElementById('inputComponentName').value;
    const componentSize = document.getElementById('inputComponentSize').value;
    
    // Vendor Info
    let vendorList = getvendorListUI();

    // Check Component Data
    if(vendorList.length<=0){
        console.log('Vendor List Empty!');
    }else if(componentSize<=0){
        console.log('Component Size Wrong!');
    }else{
        let data ={
            componentName: componentName,
            componentSize: componentSize,
            componentVendors: vendorList,
        };
        postComponebt(data);
    }
}

function postComponebt(data){   
    fetch("/component", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((res)=>{
        return res.json()
    }).then((myJson)=>{
        console.log('Response:', myJson);
        window.location.href = "/page/component";
    }).catch((err)=>{
        console.log('err:', err);
    });
}

// Vendor List UI
function addVendor(){
    
    const vendorList = document.getElementById("vendorList");
    const vendor = vendorList.options[vendorList.selectedIndex].value;
    const duplicateVendorCheck = getvendorListUI().indexOf(vendor);

    if(vendor!='Loading vendors...' && duplicateVendorCheck==-1){
        const list = document.getElementById('list');
        const li = document.createElement("li");
        const span = document.createElement("span");
        const i = document.createElement("i");

        span.classList.add('p-2');
        span.classList.add('mr-1');
        span.addEventListener("click", delVendorSpan);
        i.classList.add('fa');
        i.classList.add('fa-trash');
        i.addEventListener("click", delVendorIcon);

        span.appendChild(i);
        li.appendChild(span);
        li.appendChild(document.createTextNode(`${vendor}`));

        list.appendChild(li);
    }else{
        console.log('add Vendor error!')
    }
}

function delVendorSpan(e){
    console.log('Del Component! ',e.target.parentNode);
    e.target.parentNode.remove();
    
}

function delVendorIcon(e){
    console.log('Del Component! ',e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.remove();
    e.stopPropagation();
}

function getvendorListUI(){
    const li = document.getElementsByTagName("LI");
    let vendorList = []; 
    for (let item of li) {
        vendorList.push(item.textContent);
    }
    return vendorListUI;
}