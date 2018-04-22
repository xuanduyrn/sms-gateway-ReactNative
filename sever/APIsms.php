<?php
if(isset($_GET['send_notification'])){
   send_notification ();
}



function send_notification()
{
define( 'API_ACCESS_KEY', 'AAAADPryDEU:APA91bF515dfu3T79Mc1t8ApoPd_MJTkiyrMuSooA5KCB2Di_cC77kqJZxEyfChSAJkZmJ0oO8AStn0NFgSbuW_RYZHK1H3tKvaqhjF1ScDisSN20NourGHu_XJb5gYqWrN0ygPaK_hV');
     $msg = array
          (
		'body' 	=> $_REQUEST['body'],
		'title'	=> $_REQUEST['title'],
    'tag' => $_REQUEST['tag']
          );
	$fields = array
			(
				'to'		=> $_REQUEST['token'],
				'notification'	=> $msg
			);


	$headers = array
			(
				'Authorization: key=' . API_ACCESS_KEY,
				'Content-Type: application/json'
			);
#Send Reponse To FireBase Server
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
		$result = curl_exec($ch );
    var_dump($result);
		echo $result;

		curl_close( $ch );

}
?>
