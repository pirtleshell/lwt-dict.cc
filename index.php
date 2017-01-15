<?php

$url = 'http://syn.dict.cc/?' . $_SERVER['QUERY_STRING'];
$html = file_get_contents($url);
$js = "<script type='text/javascript' src='/lwt/js/jquery.js'></script>";
$js .= "<script defer type='text/javascript' src='script.js'></script>";
echo substr_replace($html, $js, 117, 0);

?>
