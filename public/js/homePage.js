window.onload = function(){
    const searchButton = document.getElementById('searchButton');
    const machineButton = document.getElementById('machineButton');
    const componentButton = document.getElementById('componentButton');
    const vendorButton = document.getElementById('vendorButton');
    const searchHint = document.getElementById('searchHint');
    const searchInput = document.getElementById('searchInput');
    const displayData = document.getElementById('displayData');
    
    searchButton.addEventListener('click', searchData);
    machineButton.addEventListener('click', machineSearchMode);
    componentButton.addEventListener('click', componentSearchMode);
    vendorButton.addEventListener('click', vendorSearchMode);
    searchInput.addEventListener('keypress',(event) =>{
        if(event.keyCode === 13) {
            event.preventDefault();
            searchButton.click();
        }
    });

    // Defult
    searchButton.searchUrl = '/list/machine'
}

function machineSearchMode(){
    setSearchMode('Machine');
}

function componentSearchMode(){
    setSearchMode('Component');
}

function vendorSearchMode(){
    setSearchMode('Vendor');
}

function setSearchMode(mode){
    resetButtonActive();
    setSearchHint(mode);

    switch (mode) {
        case 'Machine':
            machineButton.classList.add("active");
            searchButton.searchUrl = '/list/machine'; 
            break;
        case 'Component':
            componentButton.classList.add("active");
            searchButton.searchUrl = '/list/component';
            break;
        case 'Vendor':
            vendorButton.classList.add("active");
            searchButton.searchUrl = '/list/vendor';
            break;
        default:
            console.log(`Out of ${mode} mode !`);
    }
}

function resetButtonActive(){
    machineButton.classList.remove("active");
    componentButton.classList.remove("active");
    vendorButton.classList.remove("active");
}

function setSearchHint(hint){
    searchHint.innerHTML= hint;
    searchInput.placeholder=`Input ${hint} Name`;
}

function searchData(e){
    let data = searchInput.value;
    displayDataSet('<h2 class="p-5">Searching ...</h2>');
    fetch(`${e.target.searchUrl}/${data}/components`)
    .then((res)=>{
        return res.json()
    }).then((myJson)=>{
        displayDataSet('<h2>Response Data</h2><br>' + JSON.stringify(myJson, null, 2));
        searchInput.value="";
    })
    .catch((err)=>{
        console.log(err);
        displayDataSet(`<h2 class="p-5">Can not find "${searchInput.value}"</h2>`);
    });    
}

function displayDataSet(data){
    displayData.style.display = "block";
    displayData.innerHTML = data;
}