
<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
  if(trim($request->data->image) === '' )
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  
  $image = mysqli_real_escape_string($con, trim($request->data->image));


  // Store.
  $sql = "INSERT INTO `bijouxes`(`image`) VALUES ('{$image}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $car = [
     
        'image' => $image
    ];
    echo json_encode(['data'=>$car]);
  }
  else
  {
    http_response_code(422);
  }
}
