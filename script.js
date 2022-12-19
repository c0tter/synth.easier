// Check if API key is stored in local storage
if (!localStorage.getItem('apiKey')) {
  // Ask user for API key
  let apiKey = prompt('Please enter your API key:');

  // Store API key in local storage
  localStorage.setItem('apiKey', apiKey);
}

// Retrieve API key from local storage
const apiKey = localStorage.getItem('apiKey');

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: apiKey
  }
};

fetch('https://api.synthesia.io/v2/videos', options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    const table = document.getElementsByClassName('table-bordered')[0];
    const tableBody = table.getElementsByTagName('tbody')[0];

    response.videos.forEach(function(rowData) {
      const row = document.createElement('tr');

      const cell7 = document.createElement('td');
      cell7.appendChild(document.createTextNode(rowData['title']));
      row.appendChild(cell7);

      // Create img element and set its src attribute to thumbnail URL
      const thumbnailImg = document.createElement('img');
      thumbnailImg.src = `https://image.synthesia.io/${rowData['id']}/thumbnail.jpg`;

      // Set width and height of img element
      thumbnailImg.width = 192;
      thumbnailImg.height = 108;

      // Add draggable attribute to the img element
      thumbnailImg.draggable = true;

      // Handle dragstart event
      thumbnailImg.addEventListener('dragstart', function(event) {
        // Set the data that will be transferred when the element is dragged
        event.dataTransfer.setData('text/plain', this.src);
      });

      // Create anchor element and set its href attribute to share link URL
      const thumbnailLink = document.createElement('a');
      thumbnailLink.href = `https://share.synthesia.io/${rowData['id']}`;

      // Set target attribute to open link in new tab
      thumbnailLink.target = '_blank';

      thumbnailLink.appendChild(thumbnailImg);

      // Add anchor element to the thumbnail column
      const cell4 = document.createElement('td');
      cell4.appendChild(thumbnailLink);
      row.appendChild(cell4);

      tableBody.appendChild(row);
    });
  })
  .catch(err => console.error(err));
