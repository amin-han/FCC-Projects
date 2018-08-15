
function convertToRoman(num) {
  var romanNum = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  var deciNum = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  
  var conversion = '';
  
  for (var i = 0; i < deciNum.length; i++){
    while (deciNum[i] <= num){
      conversion += romanNum[i];
      num -= deciNum[i];
    }
  }
  
  
 return conversion;
}

convertToRoman(36);
