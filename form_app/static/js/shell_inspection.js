

// function to display formdata stored as tableData in local storage
function populateOperationDisplay() {

    // Retrieve the local stored data
    const storedData = JSON.parse(localStorage.getItem('tableData'));
    if (storedData) {
        document.getElementById('operation').innerHTML = "Operation: " + storedData.operation;
        document.getElementById('operator').innerHTML = "Operator: " + storedData.operator;
        document.getElementById('product').innerHTML = "Product: " + storedData.product;
    }
}


// Now scanner data
// 1. do scanner get.request() to get scannerData=http://192.168.2.101:8899/api-hardnessReport/ScannerAnnotationSerilisersAPIView?added=False&verified=False&used_for_training=False&location=MC105
// 2. Post scannerData on our child api
// 3. Update scannerData to say we took the data-to prevent retaking the same data
// 4. Do child get request
// 5. Using the response from 4 display data on table(dataTable)
// 6. Do update child data. When the operator changes results or commnets --> save to databas
// 7. Now run get scanner data loop( every second). 



// get scanner default

//1. Fetch scanner data (using the ID) from the api server response
function getScannerData() {
    
    const productionData_ID = JSON.parse(localStorage.getItem('tableData')).id;
    axios.get('http://your_api_url')
        .then(apiResponse => {

            console.log("apiResponse.data: ", apiResponse.data);
            // 2. Post scannerData on our child api
            for (var i = 0; i < apiResponse.data.length; i++) {
                //Do something
                var shell_serial_no = apiResponse.data[i].shell_serial_no
                var scanner_id = apiResponse.data[i].id
                console.log(shell_serial_no, scanner_id);
                data = {
                            "shell_no": shell_serial_no,
                            "ProductionData": productionData_ID
                        }
                postChildAPIData(data, scanner_id)
            }


        })
        .catch(error => {
            console.error('Error fetching additional data:', error);
        });

}




// 2. Function to perform a POST request using Axios to our child
function postChildAPIData(data, scanner_id) {
    console.log("postChildAPIData: ", data, scanner_id);
    axios.post(api_end_point+'api/ShellInspectionCreate/', data) // Replace with your API endpoint
        .then(function(response) {
            // Handle success
            console.log('Data posted successfully:', response.data);
            InspectionDataDisplay([response.data])
            // 3. If succesfull, do hand shake:
            updateScannerData(scanner_id)

        })
        .catch(function(error) {
            // Handle error
            console.error('Error posting data:', error);
        });
}


// 3. Handshake - tell our scanner api that we got the data
function updateScannerData(id) {
    console.log("scanner data: ", id);
    Data = {
        'added': true
    }
    // coc api_endpoint
    axios.patch(`http://****/api-hardnessReport/ScannerDataSerilisersDetail/${id}/`, Data) 
        .then(function(response) {
            // Handle success
            console.log('Data updated successfully hand shake:', response.data);

        })
        .catch(function(error) {
            // Handle error
            console.error('Error updating data hand shake:', error);
        });
}

// 4. Get child/inspection data
//  Fetch additional data using the ID from the server response
function getInspectionData() {
    const productionData_ID = JSON.parse(localStorage.getItem('tableData')).id;
    axios.get(api_end_point+`api/ShellInspectionDetailList/?production_data_id=${productionData_ID}`)
        .then(apiResponse => {
            InspectionDataDisplay(apiResponse.data)

        })
        .catch(error => {
            console.error('Error fetching additional data:', error);
        });
}


// 5. Using the response from 4 display data on table(dataTable)
function InspectionDataDisplay(data) {
    

    console.log("datatable: ", data);
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    // Clear the table before inserting new data
    tableBody.innerHTML = '';

    // const seenSerialNos = new Set(); // Set to keep track of seen serial numbers
    // console.log('newset:', seenSerialNos); // Debugging line
    // alert(data.length)

    data.forEach(data => {
        const shell_serial_no = data.shell_no;
        console.log("skkdjdosfjeojfaofjsepofjdfkjj");

        // // Check for duplicates
        // if (seenSerialNos.has(shell_serial_no)) {
        //     console.log('Duplicate found:', shell_serial_no); // Debugging line
        //     alert('Duplicate found: ', shell_serial_no);
        //     return; // Stop further processing if duplicate is found
        // }
        // // seenSerialNos.add(shell_serial_no);

        const newRow = tableBody.insertRow();

        const shellCell = newRow.insertCell(0);
        shellCell.textContent = data.shell_no;

        // Result
        const resultCell = newRow.insertCell(1);
        const resultSelect = document.createElement('select');
        
        ['Select', 'Pass', 'Rework', 'Scrap'].forEach(result => {
            const option = document.createElement('option');
            option.value = result;
            option.textContent = result;
            resultSelect.appendChild(option);
        });
        resultSelect.id=`${data.id}_select`;
        resultCell.appendChild(resultSelect);
        if (data.result) {
            resultSelect.value = data.result;
        } else {
            resultSelect.value = "Select";
        }
        

        // Comment
        const commentCell = newRow.insertCell(2);
        const commentInput = document.createElement('input');
        commentInput.id=`${data.id}_comment`;
        commentInput.type = 'text';
        commentInput.value = data.comments;
        commentInput.classList.add('col-sm-4'); 
        commentCell.appendChild(commentInput);
        commentInput.addEventListener('focus', function () {
            const modal = new bootstrap.Modal(document.getElementById('commentModal'));
            const modalCommentInput = document.getElementById('modalCommentInput');
            modalCommentInput.value = commentInput.value;
            modal.show();

            document.getElementById('saveCommentBtn').addEventListener('click', function () {
                commentInput.value = modalCommentInput.value;
                modal.hide();
            }, { once: true });

        });
        


        // add button
        const UpdateCell = newRow.insertCell(3);

        // Create the button
        const button = document.createElement('button');
        button.id=`${data.id}`;
        button.textContent = 'Update';
        button.type="submit";
        button.className = 'btn btn-primary btn-sm'; // Optional: add a class for styling
        // Optional: Add an event listener to the button
        button.addEventListener('click', function() {
            updateShellInspectionData(data.id)
        });

        const deleteCell = newRow.insertCell(4);



        // // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.id = `${data.id}_delete`;
        deleteButton.textContent = 'Delete';
        deleteButton.type = "button";
        deleteButton.className = 'btn btn-danger btn-sm'; // Optional: add a class for styling
        deleteButton.addEventListener('click', function() {
            deleteShellInspectionData(data.id);
        });

        // Append the buttons to the Update cell
        UpdateCell.appendChild(button);

        // Append the buttons to the Update cell
        deleteCell.appendChild(deleteButton);

    });


    
}


// 6. Do update child data. When the operator changes results or commnets --> save to database
function updateShellInspectionData(inspectiondata_id) {
    
    var commnent = document.getElementById(`${inspectiondata_id}_comment`).value
    var select = document.getElementById(`${inspectiondata_id}_select`).value


    updatedData = {
                    "result": select,
                    "comments": commnent,
                }

    console.log("running update shell inspection data with button: ", inspectiondata_id, commnent, select, updatedData);
    axios.patch(api_end_point+`api/ShellInspectionDetailView/${inspectiondata_id}/`, updatedData) 
        .then(function(response) {
            // Handle success
            console.log('Data updated successfully:', response.data);
            alert("data updated successfully")
        })
        .catch(function(error) {
            // Handle error
            console.error('Error updating data:', error);
        });
}


// Function to delete shell inspection data
function deleteShellInspectionData(inspectiondata2_id) {
    console.log("running delete shell inspection data with button: ", inspectiondata2_id);

    updatedData = {
        "deleted": true,
    }
    axios.patch(api_end_point + `api/ShellInspectionDetailView/${inspectiondata2_id}/`, updatedData)
        .then(function(response) {
            console.log('Data deleted successfully:', response.data);
            alert("Data deleted successfully");
            document.getElementById(`inspection_row_${inspectiondata2_id}`).remove();
        })
        .catch(function(error) {
            console.error('Error deleting data:', error);
        });
}



// 6. Start fetching scanner data every second
const interval = setInterval(function () {
    getScannerData();
}, 1000);


// Exit button
document.getElementById('loadHistoryButton').addEventListener('click', function() {
  
    window.location.href = api_end_point +'home/' + new Date().getTime();

});

document.getElementById('loadHistoryButton').addEventListener('click', function() {
    const baseUrl = api_end_point +'home/';
    
    // Attempt to navigate to the new URL
    try {
        window.location.href = baseUrl + '?' + new Date().getTime();
    } catch (error) {
        console.error('Failed to navigate to the URL:', error);
        alert('Failed to load the page. Please try again later.');
    }
});


// Fetch data when the window loads
window.onload = function() {
    getScannerData();
    populateOperationDisplay();
    getInspectionData();
};


