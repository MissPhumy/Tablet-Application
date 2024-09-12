import axios from 'axios';
// Accesing application running on server on a network computer

api_end_point = "*******"

// Running app locally on my machine
// api_end_point = "*******"

//Uning outside device to access server
// api_end_point = ******""


// take data from form - send/post to api endpoint - save response in localstorage - display response on next form


//  Submitting and posting server data response on browser



function submitForm() {
    const form = document.getElementById('formData'); 
    
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = {
            operator: document.getElementById('operator').value,
            product: document.getElementById('product').value,
            operation: document.getElementById('operation').value,
            supervisor: document.getElementById('supervisor').value,
        };
        
        try {
            const response = await axios.post(api_end_point + 'api/ProductionDataCreate/', formData);
            console.log('Data sent successfully:', response.data);
            const serverOutput = response.data;

            localStorage.setItem('tableData', JSON.stringify(serverOutput));
            window.location.href = api_end_point + 'home/shell_inspection';
        } catch (error) {
            console.error('Error sending data:', error);
        }
    });
}

// Make sure to call the function to attach the event listener
submitForm();
























// function submitForm() {
//     const formData = {
//         operator: document.getElementById('operator').value,
//         product: document.getElementById('product').value,
//         operation: document.getElementById('operation').value,
//         supervisor: document.getElementById('supervisor').value,
        
//     };

//     form.addEventListener('submit', async event => {
//         event.preventDefault();

//     axios.post(api_end_point+'api/ProductionDataCreate/', formData)
//         .then(response => {
//             console.log('Data sent successfully:', response.data);
//             const serverOutput = response.data;
//             // if response.status==201 and localStorage is not full
//             localStorage.setItem('tableData', JSON.stringify(serverOutput));
//             window.location.href = api_end_point+'home/shell_inspection';
//         })
//         .catch(error => {
//             console.error('Error sending data:', error);
//         });
// }
