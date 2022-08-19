<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * @param mixed $string
 * @param bool $force_lowercase
 * @param bool $anal
 * @return mixed
 */
function sanitize($string, $force_lowercase = true, $anal = false)
{
   $strip = array(
      "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "=", "+", "[", "{", "]",
      "}", "\\", "|", ";", ":", "\"", "'", "&#8216;", "&#8217;", "&#8220;", "&#8221;", "&#8211;", "&#8212;",
      "â€”", "â€“", ",", "<", ".", ">", "/", "?"
   );
   $clean = trim(str_replace($strip, "", strip_tags($string)));
   $clean = preg_replace('/\s+/', "-", $clean);
   $clean = ($anal) ? preg_replace("/[^a-zA-Z0-9]/", "", $clean) : $clean;
   if($force_lowercase == true){
      if (function_exists('mb_strtolower')) {
         $clean = mb_strtolower($clean, 'UTF-8');
      } else {
         $clean = strtolower($clean);
      }
   }
   return $clean;
}

/**
 * @param mixed $location
 * @param mixed $file
 * @param string $disk
 * @return string
 */
function uniqueFileName(string $location, string $file)
{
   try {
      $ext            = pathinfo($file);
      // Remove rubbish AND Chinise AND Japan characters
      $filename       = preg_replace("/(\p{Z}|\p{P}|\p{Han}|\p{Katakana}|\p{Hiragana})+/u", '', $ext['filename']);
      $file           = sanitize($filename)  . '.' . $ext['extension'];
      if (file_exists($location . $file)) {
         $imageToken     = substr(sha1(mt_rand()), 0, 5);
         return sanitize($filename) . '-' . $imageToken . '.' . $ext['extension'];
      } else {
         return sanitize($filename)  . '.' . $ext['extension'];
      }
   } catch (\Exception $e) {
      $message = [
         'Class: ' . __CLASS__,
         'Function: ' . __FUNCTION__,
         'Line: ' . __LINE__,
         'location: ' . $location,
         'file: ' . $file,
         'Error: ' . $e->getMessage()
      ];
      print_r($message);
   }
}
