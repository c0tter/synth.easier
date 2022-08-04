const options = {method: 'GET', headers: {Accept: 'application/json', Authorization: 'YOUR-SYNTHESIA-API-KEY-HERE'}}; // Enter your Synthesia API Key

fetch('https://api.synthesia.io/v2/videos', options)
  .then(response => response.json())
  .then(response =>
    {
      console.log(response)
      var table = document.getElementsByClassName('table-bordered')[0];
      var tableBody = table.getElementsByTagName('tbody')[0];
      
      const test1 = ('s')
      response.videos.forEach(function(rowData) {
        var row = document.createElement('tr');
          var cell7 = document.createElement('td');
          cell7.appendChild(document.createTextNode(rowData['title']));
          row.appendChild(cell7); 
          var cell4 = document.createElement('td');
          cell4.appendChild(document.createTextNode( 'https://image.synthesia.io/' + rowData['id'] + '/thumbnail.jpg' ));
          row.appendChild(cell4);   
          var cell4 = document.createElement('td');
          cell4.appendChild(document.createTextNode( 'https://share.synthesia.io/' + rowData['id'] + ''));
          row.appendChild(cell4);   
        tableBody.appendChild(row);
      });

    }
    
    
    )
  .catch(err => console.error(err));

  



  