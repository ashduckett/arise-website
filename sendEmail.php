<?php
    header('Access-Control-Allow-Origin: *');
    $name = $_POST['name'];
    $email = $_POST['email'];
    $enquiry = $_POST['enquiry'];
    
    $nameValid = isset($name) && gettype($name) == "string" && !empty(trim($name));
        
    $emailValid = isset($email) && gettype($email) == "string" && !empty(trim($email));
        
    $enquiryValid = isset($enquiry) && gettype($enquiry) == "string" && !empty(trim($enquiry));
        
    

    if ($nameValid && $emailValid && $enquiryValid) {
        $message = "Hi Ash, \n";
        $message .= "You have received an enquiry from your portfolio website from " . $name . "\n";
        $message .= "Here is their message: \n";
        $message .= $enquiry;
        $message .= "\n\n";
        $message .= "You can get back to them on " . $email;
        $message .= "\n\n";
        $message .= "Thank you";

        $message = wordwrap($message, 70);

        $message = stripslashes(mb_convert_encoding( $message, "HTML-ENTITIES", "UTF-8" ));

        mail("ash.duckett@outlook.com", "Arise Software Website", $message);
        
        echo 'Success';
    } else {
        echo 'Failed to send email. Invalid input';
    }