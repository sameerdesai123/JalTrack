document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
      document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
  });


  // Our code below

  var UIController = function() {
    var UIComponents = {
        vol_display : document.getElementById("d01"),
        bill_display : document.getElementById("d02"),
        header : document.querySelector('.nav-bar'),
        exit_flag : document.getElementById("exit-btn")
    }
    function display(total, bill) {
        UIComponents.vol_display.innerHTML= total + "l/s";
        UIComponents.bill_display.innerHTML= "Rs." + bill;
    }
    return {
        UiCom : UIComponents,
        Ui_display : display
    }
  }();

  var FlowController = function(UI, DB) {
    var flag = false;
    function init() {
        // Clear UI
        UI.UiCom.vol_display.innerHTML="0.00" + "l/s";
        UI.UiCom.bill_display.innerHTML="Rs. " + "0.00";
        start()      
    }
    UI.UiCom.exit_flag.addEventListener('click', function() {
        flag = true;
    })
    function start() {
        while(flag === false) {
            // Retriving data from DB
            var total = DB.total;
            var bill = DB.payment;
            // Update to UI
            UI.Ui_display(total, bill);
        }
        UI.UiCom.header.innerHTML= "Ending retrival";
        UI.UiCom.vol_display.innerHTML = "0.00" + "l/s";
        UI.UiCom.bill_display.innerHTML = "Rs." + "0.00";
        // redirect to completion page
    }

    return {
        Initialize : init,
    }
  }(UIController, DBConnection);


  var DBConnection = function() {
    // Create Firebase instance
    var credentials = {
        secret =  "Enter value of project secret",
        dbLink = "Enter value of realtime db link"
    }
    // use the above credentials to establish db connectivity
    var fireDb = firebase.database.ref(); // Checck if correct

    // Retrive and store data in local variables
    var data = function() {
        if( fireDb.get(lock) === false)
        {
            setTimeout(function(loader) {
             loader.innerHTML = "Loading...";
             loader.innerHTML = "./\-....";
             loader.innerHTML = "Loading...";
            }, 3000);
         loader.innerHTML = "JalTrack";
        }
        // Change code below 
        var speed = fireDb.get(ls);
        var sum = fireDb.get(total);

        return {
            ls : speed,
            total : sum
        }
    }
    // calculate billing

    const bill_const = 2.0;

    var bill = function() {
        var b;
        b = (data.total)*bill_const;
        return b;
    }

    return {
        payment : bill,
        total : data.total
    }
  }();
