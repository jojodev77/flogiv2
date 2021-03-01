
<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
  if(trim($request->data->type) === '' || (int)$request->data->prix < 1)
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  $type = mysqli_real_escape_string($con, trim($request->data->type));
  $forme = mysqli_real_escape_string($con, trim($request->data->forme));
  $couleur = mysqli_real_escape_string($con, trim($request->data->couleur));
  $couleurdeux = mysqli_real_escape_string($con, trim($request->data->couleurdeux));
  $couleurtrois = mysqli_real_escape_string($con, trim($request->data->couleurtrois));
  $materiaux = mysqli_real_escape_string($con, trim($request->data->materiaux));
  $materiauxdeux = mysqli_real_escape_string($con, trim($request->data->materiauxdeux));
  $materiauxtrois = mysqli_real_escape_string($con, trim($request->data->materiauxtrois));
  $prix = mysqli_real_escape_string($con, (float)$request->data->prix);
  $image = mysqli_real_escape_string($con, trim($request->data->image));
  $information = mysqli_real_escape_string($con, trim($request->data->information));
  $stock = mysqli_real_escape_string($con, (int)$request->data->stock);
    

  // Store.
  $sql = "INSERT INTO `bijouxes`(`id`,`type`,`forme`,`couleur`,`couleurdeux`,`couleurtrois`,`materiaux`,`materiauxdeux`,`materiauxtrois`,`prix`,`image`,`information`,`stock`) VALUES (null,'{$type}','{$forme}','{$couleur}','{$couleurdeux}','{$couleurtrois}','{$materiaux}','{$materiauxdeux}','{$materiauxtrois}','{$prix}','{$image}','{$information}','{$stock}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $car = [
        'type' => $type,
        'forme' => $forme,
        'couleur' => $couleur,
        'couleurdeux' => $couleurdeux,
        'couleurtrois' => $couleurtrois,
        'materiaux' => $materiaux,
        'materiauxdeux' => $materiauxdeux,
        'materiauxtrois' => $materiauxtrois,
        'prix' => $prix,
        'image' => $image,
        'information' => $information,
        'stock' => $stock,
        'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$car]);
  }
  else
  {
    http_response_code(422);
  }
}
