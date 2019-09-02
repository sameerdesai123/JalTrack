    var total, payment, b = 0.00;
    var database = firebase.database();

if (window.location.href == "Your deployed app address") 
{
    var UIController = function() {
        var UIComponents = {
        exit_flag : document.getElementById("exit-btn"),
        Bill : document.querySelector('.bill')
    }
    return {
        UiCom : UIComponents,
        Ui_display : function(b) {
            $('.bill').text(b);
        }   
    }
    }();
    
    var FlowController = function(UI) {
    var bill;
    function start() {
        $('.ls').text('0.00');
        $('.total').text('0.00');
        $('.bill').text('0.00');
        // redirect to completion page
    }
    
    return {
        Initialize : function() {
            start();
        },
        runControl : function() {
            bill = startBilling();
            UI.Ui_display(bill);
        }
    }
    }(UIController);
    
    var bill_const = 2.0;
    
            //var f = false;
    database.ref('ls').on('value', function (snapshot) {
     // This snapshot returns the value of total litres/seconds automatically
    $('.ls').text(snapshot.val());
    });
    database.ref('total').on('value', function (snapshot) {
    // This snapshot returns the value of total litres automatically
    $('.total').text(snapshot.val());
    total = parseFloat(document.getElementById('01').innerHTML);
    console.log(total);
    FlowController.runControl();
 //   printCharts(2);
    
    });
    
    function startBilling() {
        console.log("Entering startBilling()");
            b = total*bill_const;
            console.log(b);
            return b;
    }
    
    FlowController.Initialize();
}


// Js for signin page
/**
    
else if( window.location.href == "") {
    document.getElementById('submit').addEventListener('click', function() {
        var user = document.getElementById('inputEmail').innerHTML;
        var pass = document.getElementById('inputPassword').innerHTML;
        var head = document.getElementById('head');
        if ( database.ref(user) && database.ref(user).child(password) == pass) {
            database = null;
            database =firebase.database().ref(user); 
            window.location="https://jaltrack.firebaseapp.com/";
        }
        else{
            head.innerHTML = "WRONG CREDENTIALS TRY AGAIN!!";
        }
    });
}


*/

