// Vendor cache for select option
let componentVendorCache = {};

window.onload = async function(){
    // Create component list
    const selectElement = document.getElementById('componentList');
    let componentList = await getComponentList();
    createOption(selectElement, componentList);

    // Add btn event
    document.getElementById('buttonAdd').addEventListener('click', addComponent);
    document.getElementById('buttonSubmit').addEventListener('click', submitForm);
}

async function getComponentList(){
    let componentList =[];
    await fetch('/components')
    .then((res)=>{
        return res.json()
    }).then((myJson)=>{
        myJson.forEach((component) => {
            componentList.push(component.name);
        });
    });     
    return componentList.sort();
}

// Change componnet slecte   
async function vendorchoicechange(){
    const componentElement = document.getElementsByName('componentList');
    const componentSelected = componentElement[0].value;
    const selectElement = document.getElementById('vendorList');
    selectElement.innerHTML='<option selected>Loading vendors...</option>';
    
    if(componentSelected!='Choose component...'){
        if(!componentVendorCache[componentSelected]){
            let vendorList = await getVendorList(componentSelected);
            // save to cache
            componentVendorCache[componentSelected] = vendorList;
            // console.log(componentVendorCache);
        }
        selectElement.innerHTML='';
        createOption(selectElement, componentVendorCache[componentSelected]);
    }
}

async function getVendorList(componentSelected){
    let vendorList =[];
    await fetch(`/component/${componentSelected}/vendors`)
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

    // Machine Info
    const machineName = document.getElementById('inputMachineName').value;
    const machineDescription = document.getElementById('inputMachineDescription').value;
    const machineCountry = document.getElementById('inputMachineCountry').value;
    
    // Component Info
    const li = document.getElementsByTagName("LI");

    let components = []; 
    let componentVendor = []; 
    let componentCount = []; 

    for (let item of li) {
        let temp = item.textContent.split('/');
        components.push(temp[0]);
        componentVendor.push(temp[1]);
        componentCount.push(Number(temp[2]));
    }
    
    if(machineName && machineDescription && machineCountry){
        let data ={
            machineName: machineName,
            machineDescription: machineDescription,
            machineCountry: machineCountry,
            vendorsQuery: componentVendor,
            componentsQuery: components,
            componentCount: componentCount
        };
        console.log('newMachineData:', data); 
        postMachine(data);
    }
}

function postMachine(data){   
    fetch("/machine", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((res)=>{
        return res.json()
    }).then((myJson)=>{
        console.log(myJson);
        window.location.href = "/page/machine";
    }).catch((err)=>{
        console.log('err:', err);
    });
}

function isListDuplicate(){
    
    const component = componentList.options[componentList.selectedIndex].value;
    const vendor = vendorList.options[vendorList.selectedIndex].value;

    // Handle duplicate data
    const li = document.getElementsByTagName("LI");
    let listComponents = []; 
    let listComponentVendor = []; 

    for (let item of li) {
        let temp = item.textContent.split('/');
        listComponents.push(temp[0]);
        listComponentVendor.push(temp[1]);
    }
    
    // Check Duplicate ===> Bug
    let result = false;
    listComponents.forEach((listcomponent, index)=>{
        if(listcomponent == component){
            // same component check vendor
            if(listComponentVendor[index] == vendor){
                console.log('Duplicate !');
                result = true;
            }            
        }
    })
    return result;
}


// Componet List UI
function addComponent(){
    
    const componentList = document.getElementById("componentList");
    const vendorList = document.getElementById("vendorList");
    const compontentNumberElement = document.getElementById('compontentNumber');
    
    const component = componentList.options[componentList.selectedIndex].value;
    const vendor = vendorList.options[vendorList.selectedIndex].value;
    const compontentNumber = compontentNumberElement.value;

    if((component != "Choose component...") && (vendor!='Loading vendors...') && (!isListDuplicate()) && compontentNumber>0 && compontentNumber<=1000){
        const list = document.getElementById('list');
        const li = document.createElement("li");
        const span = document.createElement("span");
        const i = document.createElement("i");

        span.classList.add('p-2');
        span.classList.add('mr-1');
        span.addEventListener("click", delComponentSpan);
        i.classList.add('fa');
        i.classList.add('fa-trash');
        i.addEventListener("click", delComponentIcon);

        span.appendChild(i);
        li.appendChild(span);
        li.appendChild(document.createTextNode(`${component}/${vendor}/${compontentNumber}`));

        list.appendChild(li);
    }else{
        console.log('error')
    }
    
}

function delComponentSpan(e){
    console.log('Del Component! ',e.target.parentNode);
    e.target.parentNode.remove();
    
}

function delComponentIcon(e){
    console.log('Del Component! ',e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.remove();
    e.stopPropagation();
}