
function palindrome(str) {
  
  var x = /[^A-Za-z0-9]/g;
  
  str = str.toLowerCase().replace(x,'');

  for (var i = 0; i < (str.length/2); i++){
    if (str[i] !== str[(str.length) - 1 - i]){
      return false;
    }
  }
  return true;

} 
  


palindrome("eye");
