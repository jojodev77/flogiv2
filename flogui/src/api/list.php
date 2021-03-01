<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$cars = [];
$sql = "SELECT  id, type,  forme, couleur, couleurdeux, couleurtrois, materiaux, materiauxdeux, materiauxtrois, prix, image, information, stock  FROM bijouxes";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $cars[$cr]['id'] = $row['id'];
    $cars[$cr]['type'] = $row['type'];
    $cars[$cr]['forme'] = $row['forme'];
    $cars[$cr]['couleur'] = $row['couleur'];
    $cars[$cr]['couleurdeux'] = $row['couleurdeux'];
    $cars[$cr]['couleurtrois'] = $row['couleurtrois'];
    $cars[$cr]['materiaux'] = $row['materiaux'];
    $cars[$cr]['materiauxdeux'] = $row['materiauxdeux'];
    $cars[$cr]['materiauxtrois'] = $row['materiauxtrois'];
    $cars[$cr]['prix'] = $row['prix'];
    $cars[$cr]['image'] = $row['image'];
    $cars[$cr]['information'] = $row['information'];
    $cars[$cr]['stock'] = $row['stock'];
    $cr++;
  }
    
  echo json_encode(['data'=>$cars]);
}
else
{
  http_response_code(404);
}
