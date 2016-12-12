
// Job Role section of the form.
function checkValue(val) {
	var element = document.getElementById('otherTitle');
	if(val === "other")
		element.style.display="block";
	else
		element.style.display="none";
}

// T-Shirt Info section of the form.
document.getElementById("design").addEventListener("change", function(){
	var shirtDesign = document.getElementById('design');
	var shirtSelection = shirtDesign.value;
	var shirtColor = document.getElementById('color');

	if(shirtSelection){
		shirtColor.innerHTML = ""; //clears the list of colors
	}

	if(shirtSelection === "js puns"){
		shirtColor.innerHTML = '<label for="color">Color:</label><select id="color"><option value="cornflowerblue">Cornflower Blue</option><option value="darkslategrey">Dark Slate Grey</option><option value="gold">Gold</option></select>';
	}

	if(shirtSelection === "heart js"){
		shirtColor.innerHTML = '<label for="color">Color:</label><select id="color"><option value="tomato">Tomato</option><option value="steelblue">Steel Blue</option><option value="dimgrey">Dim Grey</option></select>';
	}
});

// Register for Activities section of the form.
document.querySelector(".activities").addEventListener("change", function(){
	var main = document.getElementById("all");
	var frameworks = document.getElementById("frameworks");
	var libs = document.getElementById("libs");
	var express = document.getElementById("express");
	var node = document.getElementById("node");
	var build = document.getElementById("build");
	var npm = document.getElementById("npm");

	var frameworkLbl = document.getElementById("frameworkLabel");
	var libsLbl = document.getElementById("libsLabel");
	var expressLbl = document.getElementById("expressLabel");
	var nodeLbl = document.getElementById("nodeLabel");
	
	
	// If the user selects a workshop, disable the checkbox for conflicting workshops.
	if(frameworks.checked == true) {
		express.disabled = true;
		expressLbl.style.color = "grey";
	}
	if(express.checked == true) {
		frameworks.disabled=  true;
		frameworkLbl.style.color = "grey";
	} 
	if(libs.checked == true) {
		node.disabled = true;
		nodeLbl.style.color = "grey";
	}
	if(node.checked == true) {
		libs.disabled = true;
		libsLbl.style.color = "grey";
	} 

	// If a user unchecks an activity, enable the checkbox for conflicting workshops (if there are any).
	if(frameworks.checked == false) {
		express.disabled = false;
		expressLbl.style.color = "black";
	}
	if(express.checked == false) {
		frameworks.disabled = false;
		frameworkLbl.style.color = "black";
	}
	if(libs.checked == false) {
		node.disabled = false;
		nodeLbl.style.color = "black";
	}
	if(node.checked == false) {
		libs.disabled = false;
		libsLbl.style.color = "black";
	} 

	// Calculate running total of price of events selected.
	var mainPrice = 200; //Main Conference
	var otherPrice = 100; //Everything else
	var totalPrice = 0;

	if(main.checked == true){
		totalPrice += mainPrice;
	}
	if(frameworks.checked == true || express.checked == true) {
		totalPrice += otherPrice;
	} 
	if(libs.checked == true || node.checked == true) {
		totalPrice += otherPrice;
	} 
	if(build.checked == true) {
		totalPrice += otherPrice;
	} 
	if(npm.checked == true) {
		totalPrice += otherPrice;
	}

	var totalText = "Total: $" + totalPrice.toString();
	document.getElementById('total').innerHTML = totalText;

	if(totalPrice == 0){
		document.getElementById('total').innerHTML = "";
	}
	
});

// Payment info section of the form.

document.getElementById('payment').selected = true;
$('#payment')

  // Credit Card option is selected by default and other payment options are hidden.
  var credit_card_option = $('#credit-card');
  var paypal_option = $('#paypal').hide();
  var bitcoin_option = $('#bitcoin').hide();

  $('#payment').on('change', function() {
        if ($(this).val() === 'credit card') {
            credit_card_option.show();
            paypal_option.hide();
            bitcoin_option.hide();
        } else if ($(this).val() === 'paypal') {
            credit_card_option.hide();
            paypal_option.show();
            bitcoin_option.hide();
        } else if ($(this).val() === 'bitcoin') {
            credit_card_option.hide();
            paypal_option.hide();
            bitcoin_option.show();
        }
    });


// Form Validation 

    // DOM elements of error messages to be displayed.
    var $nameError = $("<span class='invalid name-error' style='color:#ff0000'> (please provide your name)</span>");
    var $emailError = $("<span class='invalid email-error' style='color:#ff0000'> (please provide a valid email address)</span>");
    var $tshirtError = $("<span class='invalid tshirt-error' style='color:#ff0000'> (Don't forget to pick a T-shirt)</span>");
    var $activitiesError = $("<span class='invalid activities-error' style='color:#ff0000'> (please choose at least one activity)</span>");
    var $creditNumError = $("<span class='invalid ccNum-error' style='color:#ff0000'> (enter a number)</span>");
    var $creditZipError = $("<span class='invalid ccZip-error' style='color:#ff0000'> (enter a zip code)</span>");
    var $creditCvvError = $("<span class='invalid ccCvv-error' style='color:#ff0000'> (enter a CVV number)</span>");


    // Clears all error messages.
    var clearAllErrors = function() {
        $("input").prev().removeClass("invalid");
        $(".name-error, .email-error, .tshirt-error, .activities-error, .ccNum-error,.ccZip-error,.ccCvv-error").remove();
    };

    // Email validation.
    var validateEmail = function() {

        // Get text from the email input.
        var enteredEmail = $("#mail").val();

        // Store the email validation RegEx in variable.
        var validEmailRegEx = (/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

        // Returns true if enteredEmail matches email validation RegEx.
        return validEmailRegEx.test(enteredEmail);
    };

    // Credit card validation using the Luhn formula.
    var validateCC = function(cardNumber) {

        // Create an array with each digit of number.
        var cardNumberArray = (cardNumber).toString(10).split("").map(Number);

        // Drop the last digit and store in lastDigit.
        var lastDigit = cardNumberArray.pop();

        // Reverse the numbers.
        cardNumberArray = cardNumberArray.reverse();

        // If number is in an odd position, multiply by 2.
        for (var i = 0; i < cardNumberArray.length; i++) {
            if ((i % 2) === 0) {
                cardNumberArray[i] = cardNumberArray[i] * 2;
            }
        }

        // Subtract 9 from numbers larger than 9.
        for (i = 0; i < cardNumberArray.length; i++) {
            if (cardNumberArray[i] > 9) {
                cardNumberArray[i] = cardNumberArray[i] - 9;
            }
        }

        // Add all numbers.
        var added = 0;
        for (i = 0; i < cardNumberArray.length; i++) {
            added += cardNumberArray[i];
        }

        // Add total to lastDigit. Mod 10 should return 0. Returns true or false.
        return ((added + lastDigit) % 10 === 0);
    };

    // Validate all fields and display error messages for incomplete sections.
    var validate = function() {
        clearAllErrors(); // Clear all errors before each check.
        var valid = true; // Make false if any validation fails.

        // Credit Card Number.
        if (!validateCC(parseInt($("#cc-num").val()))) {
            $("#cc-num").prev().addClass("invalid");
 			$("#cc-num").prev().append($creditNumError);
 			// $('.numError').css('color','red');
            valid = false;
        }

        // Credit Card Zip.
        if (($("#zip").val().length !== 5) && isNaN(parseInt($("#zip").val()))) {
            $("#zip").prev().addClass("invalid");
			$("#zip").prev().append($creditZipError);
			// $('.zipError').css('color','red');
			valid = false;
        }

        // Credit Card CVV.
        if (($("#cvv").val().length !== 3) && isNaN(parseInt($("#cvv").val()))) {
            $("#cvv").prev().addClass("invalid");
			$("#cvv").prev().append($creditCvvError);
			// $('.cvvError').css('color','red');
            valid = false;
        }

        // Marks credit card info as valid if paypal or bitcoin are selected as payment option.
        if ($("option[value='paypal']").is(':selected') || $("option[value='bitcoin']").is(':selected')) {

            // This line has to happen before the rest of the checks below or it creates a bug.
            valid = true;
            clearAllErrors();
        }

        // Name. Check to see that a name is entered
        if ($("#name").val().length === 0) {
            $("#name").prev().addClass("invalid");
            $("#name").prev().append($nameError);
            valid = false;
        }

        // Email. Run validateEmail function to determine true or false.
        if (!validateEmail()) {
            $("#mail").prev().addClass("invalid");
            $("#mail").prev().append($emailError);
            valid = false;
        }

        // T-shirt. Check if either T-shirt option is not selected.
        if (!($('#design option[value="js puns"]').is(':selected') ||
                $('#design option[value="heart js"]').is(':selected'))) {

            $(".shirt legend").append($tshirtError);
            valid = false;
        }

        // Activities. Check to see if at least one input is checked. If not, display error.
        if (!($(".activities input").is(':checked'))) {
            $(".activities legend").append($activitiesError);
            valid = false;
        }
    };


// Event handler for the submit button. Call validate() and prevent form submission.
    $("button[type='submit']").click(function(e) {
        validate();
        e.preventDefault(); //prevent default form submission
    });
