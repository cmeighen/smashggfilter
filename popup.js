let regionsArray = [];
let regionForm = "";

const getRegions = function() {
  chrome.storage.local.get(
    'savedRegions', function(response) {
      if (response.savedRegions) {
        regionsArray = response.savedRegions;
        regionsArray.sort();
        console.log(regionsArray);
      }

      regionForm += '<div class="region-list-header">Regions List</div>';
      regionForm += '<form id="region-list">';

      for (let i = 0; i < regionsArray.length; i++) {
        regionForm+= `<label><input type="checkbox" name=${regionsArray[i][0]} key=${i} />${regionsArray[i][0]}</label>`;
      }

      regionForm += '</form>';
      regionForm += '<br />';

      document.getElementById('root').innerHTML = regionForm;

      function checkFlipSave(idx) {
        if (regionsArray[idx][1] === false){
          regionsArray[idx][1] = true;
        } else {
          regionsArray[idx][1] = false;
        }
        chrome.storage.local.set({
          savedRegions: regionsArray
        });
      }

      let regionsArrayContainer = document.getElementById('region-list');
      let regionCheckboxes = regionsArrayContainer.getElementsByTagName('input');
      for (let i = 0; i < regionsArray.length; i++) {
        if ( regionCheckboxes[i].type === 'checkbox' ) {
          if (regionsArray[i][1]){
            regionCheckboxes[i].checked = true;
          }
          regionCheckboxes[i].onclick = function() {checkFlipSave(i);};
        }
      }
    }
  );
};

document.addEventListener("DOMContentLoaded", () => {
   getRegions();
});
