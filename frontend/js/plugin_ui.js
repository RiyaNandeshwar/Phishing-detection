// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 	var tab = tabs[0];
// 	var url = tab.url;
// 	// alert(url);

// 	const el = document.getElementById("site_score");
// const el2 = document.getElementById("site_msg");
// // responseText.innerText="Results will appear here"
// fetch('http://localhost:5000/post', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   body: `URL=${url}`
// })
// .then(response => response.text())
// .then(data => {
// 	// alert(url)
// 	// alert(data)
//   console.log('Server response:', data);
//   if (parseInt(data) == 1 ) {
// 	alert('Suspicious');
// 	console.log('1');
// 	$("#res-circle").css("background", "#a64812");
// 	  el.textContent = 'Suspicious';
// 	  el2.textContent = 'This website may not be safe >_<';
// 	  el.style.background = "linear-gradient(45deg, #a64812, #e1e354);";
// 	  el.style.transform = "translateZ(25px)";
	
//   } else if (parseInt(data) == 0 ) {
// 	// alert('Safe');
// 	console.log('0');
// 	$("#res-circle").css("background", "#00db2f");
// 	el.textContent = 'Safe';
// 	el2.textContent = 'This website is safe to use UwU';
// 	// el.style.background = "linear-gradient(45deg, #00db2f, #06678b)";
// 	el.style.transform = "translateZ(25px)";
	
//   } else if (parseInt(data) == -1 ) {
// 	// alert('Phising');
// 	console.log('-1');
// 	$("#res-circle").css("background", " #f9103b");
// 	el.textContent = 'Phishing'
// 	el2.textContent = 'This website is not safe to use T_T';
// 	el.style.background = "linear-gradient(45deg, #900000, #6d6f08);";
// 	el.style.transform = "translateZ(25px)";
//   }
// })
// .catch(error => {
//   console.error('Fetch error:', error);
// });

//     });







var colors = {
    "-1":"#58bc8a",
    "0":"#ffeb3c",
    "1":"#ff8b66"
};
var featureList = document.getElementById("features");

chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){
    chrome.storage.local.get(['results','legitimatePercents',  'isPhish'], function(items) {
        var result = items.results[tabs[0].id];
        var isPhish = items.isPhish[tabs[0].id];
        var legitimatePercent = items.legitimatePercents[tabs[0].id];
    
        for(var key in result){
            var newFeature = document.createElement("li");
            //console.log(key);
            newFeature.textContent = key;
            //newFeature.className = "rounded";
            newFeature.style.backgroundColor=colors[result[key]];
            featureList.appendChild(newFeature);
        }
        
        $("#site_score").text(parseInt(legitimatePercent)+"%");
        if(isPhish) {
            $("#res-circle").css("background", "#f9103b");
            $("#site_msg").text("Warning!! You're being phished.");
            $("#site_score").text(parseInt(legitimatePercent)-20+"%");
        }
    });
    
});

	