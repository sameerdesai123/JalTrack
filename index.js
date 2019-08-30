  var UIController = function() {
        var UIComponents = {
        exit_flag : document.getElementById("exit-btn"),
        Bill : document.querySelector('.bill')
    }
    return {
        UiCom : UIComponents,
        Ui_display : function(b) {
            console.log("Entering Ui_display()");
            $('.bill').text(b);
        }   
    }
  }();

  var FlowController = function(UI) {
    var flag = false, bill;
    UI.UiCom.exit_flag.addEventListener('click', function() {
        flag = true;
    })
    function start() {
        $('.ls').text('0.00');
        $('.total').text('0.00');
        $('.bill').text('0.00');
        // redirect to completion page
    }

    return {
        Initialize : function() {
            // Clear UI
            start();
        },
        runControl : function() {
            console.log("Entering runControl()");
            bill = startBilling();
            console.log("Calling Ui_display()");
            UI.Ui_display(bill);
        }
    }
  }(UIController);


  
    
  var total, payment, b = 0.00;
  var database = firebase.database();
  var lsRef = firebase.database().ref('ls');
  var totalRef = firebase.database().ref('total');
  var bill_const = 2.0;

            //var f = false;
lsRef.on('value', function (snapshot) {
     // This snapshot returns the value of total litres/seconds automatically
    $('.ls').text(snapshot.val());
});
totalRef.on('value', function (snapshot) {
    // This snapshot returns the value of total litres automatically
    $('.total').text(snapshot.val());
    total = parseFloat(document.getElementById('01').innerHTML);
    console.log(total);
    FlowController.runControl();

});

    function startBilling() {
        console.log("Entering startBilling()");
            b = total*bill_const;
            console.log(b);
            return b;
    }

  FlowController.Initialize();