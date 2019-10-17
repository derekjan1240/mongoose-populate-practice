window.onload = async function(){
    // Add btn event
    document.getElementById('buttonSubmit').addEventListener('click', submitForm);
}

function submitForm(e){
    e.preventDefault();

    // Vendor Info
    const vendorName = document.getElementById('inputVendorName').value;
    const vendorCountry = document.getElementById('inputVendorCountry').value;
    const vendorEmployees = document.getElementById('inputVendorEmployees').value;
    
    if(vendorName && vendorCountry && vendorEmployees){
        let data ={
            vendorName: vendorName,
            vendorCountry: vendorCountry,
            vendorEmployees: vendorEmployees
        };
        console.log('newVendorData:', data); 
        postMachine(data);
    }
}

function postMachine(data){   
    fetch("/vendor", {
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
        window.location.href = "/page/vendor";
    }).catch((err)=>{
        console.log('err:', err);
    });
}