<?php
if (isset($_POST)) {
    $to = "tvoymundshtuk@yandex.by, tsg@tmedia.fm";
    $subject = 'NEW_ORDER';
    $data = json_decode(file_get_contents('php://input'), true);
    $message = 'Name: '.$data['name'].' Phone: '.$data['phone'].' Instagram: '.$data['instagram'].' selectedProduct: '.$data['selectedProduct'] ;
    $success = mail($to, $subject, $message);
    if ($success) {
        echo json_encode(array('success' => true));
    }
    else {
        echo json_encode(array('success' => false));
    }
}
?>