
let currentCards = Array.from(document.getElementsByClassName('gg-card'));
let currentRegions = [];
let selectedRegions = [];
let selectedRegionsList = [];
let filteredRegions = [];
let remainingCards = [];
let removedCards = [];



//for all of the cards in currentCards, if the card contains a location id
//takes the innerText of the location id
//if the innerText is not included in currentRegions, it is pushed to the array (prevents duplicates)

const updateCurrentRegions = function() {
  currentCards.forEach((card) => {
    if (card.querySelector("span[data-reactid$='0.1.2.0.1.2']")) {
      let regionName = card.querySelector("span[data-reactid$='0.1.2.0.1.2']").innerText;
      if (!currentRegions.includes(regionName)){
        currentRegions.push(regionName);
        console.log(regionName);
      }
    }
  });
};


//grabs the local storage of savedRegions, an array of arrays (storing ["location", boolean], boolean representing whether it is selected);
//if there are new regions, they will be added to the selectedRegions array(defaulting to ["location", false])
//local storage savedRegions is set to the newly updated selectedRegions
const getUpdateSave = function() {
  chrome.storage.local.get(
    'savedRegions', function(response) {
      if (response.savedRegions) {
        selectedRegions = response.savedRegions;
      }

      // placed all selectedRegions region only into a separate array
      selectedRegions.forEach((region) => {
        selectedRegionsList.push(region[0]);
      });

      // If any of the currentRegions are not included in the selectedRegions List
      // pushes unlisted region with default value
      currentRegions.forEach((region) => {
        if (!selectedRegionsList.includes(region)) {
          selectedRegions.push([region, false]);
        }
      });

      //sets savedRegions to the updated list of regions
      chrome.storage.local.set({
        savedRegions: selectedRegions
      }, function() {
        filterRegions(selectedRegions);
        updateFilter(selectedRegions);
        updateRemainingCards();
        applyCSS();
      });
    }
  );
};


//selects only cards with a region
const filterRegions = function() {
  let filterCards = [];
  selectedRegions.forEach((region) => {
    if (region[1]) {
      currentCards.forEach((card) => {
        if (card.querySelector("span[data-reactid$='0.1.2.0.1.2']") && (region === card.querySelector("span[data-reactid$='0.1.2.0.1.2']").innerText)) {
          filterCards.push(card);
        }
      });
    }
  });

  if (filterCards.length > 0) {
    console.log(filterCards);
  }
};


//updateFilter contains only the location strings of selected regions
const updateFilter = function(regions) {
  filteredRegions = [];
  regions.forEach((region) => {
    if (region[1]) {
      filteredRegions.push(region[0]);
    }
  });
};

const updateRemainingCards = function() {
  remainingCards = [];
  removedCards = [];
  let cssStr;
  currentCards.forEach((card) => {
    if (card.querySelector("span[data-reactid$='0.1.2.0.1.2']")) {
      if (filteredRegions.includes(card.querySelector("span[data-reactid$='0.1.2.0.1.2']").innerText)){
        cssStr = '[data-reactid="' + card.getAttribute('data-reactid') + '"]';
        remainingCards.push(cssStr);
      } else {
      cssStr = '[data-reactid="' + card.getAttribute('data-reactid') + '"]';
      removedCards.push(cssStr);
      }
    } else {
      cssStr = '[data-reactid="' + card.getAttribute('data-reactid') + '"]';
      removedCards.push(cssStr);
    }
  });
};

const applyCSS = function() {
  if (remainingCards.length > 0) {
    let cssRemaining = remainingCards.join(', ') +  " { display: block !important; }";
    let cssRemoved = removedCards.join(', ') + " { display: none !important; }";
    chrome.runtime.sendMessage({
      update: "update",
      cssRemoved: cssRemoved,
      cssRemaining: cssRemaining
    });
  } else {
    let cssRemaining = removedCards.join(', ') + " { display: block !important; }";
    let cssRemoved = "";
    chrome.runtime.sendMessage({
      update: "update",
      cssRemoved: cssRemoved,
      cssRemaining: cssRemaining
    });
  }


};

updateCurrentRegions();
getUpdateSave();

chrome.storage.onChanged.addListener(function(changes, namespace) {
  updateCurrentRegions();
  getUpdateSave();
});
