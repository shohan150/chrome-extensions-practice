const siteData = document.getElementById("site-data");
const dynamicData = document.getElementById("dynamic-data");
const hidee = document.getElementById("hidee");

//send message when the collect data butto has been clicked
document.getElementById('dataCollector').addEventListener('click', function () {
   const message = {
      name: 'send data of already set path',
   };
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, message);
   });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   if (message.name == 'send website data to popup') {
      var dataDivs = document.createElement('div');
      dataDivs.classList.add('dataDiv');
      var showData = `<h2>${message.title}: </h2>
   <p>${message.data}</p>`;
      dataDivs.innerHTML = showData;
      siteData.appendChild(dataDivs);
   }
});


document.getElementById('pathCollector').addEventListener('click', function () {
   hidee.style.display = "none";
   const message = {
      name: 'take element path',
   };
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, message, function (response) {
         updatePopup(response);
         hidee.style.display = "block";
      });
   });
});

function updatePopup(data) {
   dynamicData.innerHTML = `<h3>${data.id} and ${data.className}</h3>`;
}



