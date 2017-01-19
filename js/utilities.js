(function (window){

	var utilities = {};

	utilities.isArray = Array.isArray || function(arr) {

	 return Object.prototype.toString.call(arr) === '[object Array]';

	};

	/*
	*
	* Function iterates over the list by the specified interval (n) and performs the
	* callback function on each item.
	*
	*/

	utilities.by = function(list, n, callback){

		for(var i = 0; i < list.length;i+=n){
			callback(list[i]);
		}
	};

	/*
	*
	* Function will create and return an array of all keys from a provided object.
	*
	*/

	utilities.keys = function(object){

		var keysArr = [];

		for(var keys in object){
			keysArr.push(keys);
		}

		return keysArr;
	};

	/*
	*
	* Function will create and return an array of all values from a provided object.
	*
	*/

	utilities.values = function(object){

		var valuesArr = [],
				keys = Object.keys(object),
				keysLength = keys.length,
				i;

		for(i = 0; i < keysLength; i++){
			valuesArr.push(object[keys[i]]);
		}

		return valuesArr;
	};

	/*
	*
	* Function will create an array and return all pairs of keys and values from
	* an object.
	*
	*/

	utilities.pairs = function(object){

		var pairsArr = [],
				keys = Object.keys(object),
				keysLength = keys.length,
				i;

		for(i = 0; i < keysLength; i++){
			pairsArr.push(keys[i]);
			pairsArr.push(object[keys[i]]);
		}

		return pairsArr;


	};

	/*
	*
	* Function will return a a randomly re-arranged copy of the elements in its parameter array.
	*
	*/

	utilities.shuffle = function(array){
		
		var shuffledArr = [],
				min = 0,
				arrLength = arr.length - 1;

		for(var i = 0; i <= arrLength; i++){
			 var r = Math.round(Math.random() * ((array.length - 1)-min) + min);
			 shuffledArr.push(array[r]);
			 array.splice(r,1);
		}

		return shuffledArr;
	};

	/*
	*
	* Returns the plural of a word depending on the value of the n parameter. If n 
	* is 1, return the non-plural word (parameter word); otherwise, add an “s” to 
	* the plural word. If the pluralWord parameter is provided, instead of adding 
	* an “s,” return the pluralWord.
	*
	*/

	utilities.pluralize = function(n, word, pluralWord){

		var plural = pluralWord || word + "s";

		if(n === 1){
			return word;
		} else {
			return plural;
		}
	};

	/*
	*
	* Function for converting a camelCase string to a dashed string.
	*
	*/

	utilities.toDash = function(str){
		
		var newStr = "";
	
    for(var i = 0; i < str.length; i++){
		
			if(str[i] === str[i].toUpperCase()){
				newStr += "-" + str[i].toLowerCase();
	    } else {
	    	newStr += str[i];
	    }
		}
  
    return newStr;
	};

	/*
	*
	* Function converts a dash string into a camel case string.
	*
	*/

	utilities.toCamel = function(str){

		var arr = str.toLowerCase().split("-"),
				camelString = arr[0].toLowerCase();
	
		for (var i = 1; i < arr.length; i++){
			camelString += arr[i].charAt(0).toUpperCase()+arr[i].substr(1).toLowerCase();
		}
  
    return camelString;
	};

	/*
	*
	* Function that searches all values of the parameter obj and returns “true” if 
	* any are equal to the search parameter. Otherwise has should return “false.”
	*
	*/

	utilities.has = function(object, search){

		var keys = Object.keys(object),
				keysLength = keys.length,
				i,
				found = false;

		for(i = 0; i < keysLength; i++){
			if(object[keys[i]] === search){
				found = true;
			}
		}

		return found;

	};

	/*
	*
	* Function that returns a new object by picking all key/value pairs from the 
	* parameter obj. The keys that are picked will be determined by the array parameter keys.
	*
	*/

	utilities.pick = function(object, keys){

		var result = {};
    
    for(var p in obj){
     
      if (keys.indexOf(p) !== -1){
        result[p] = obj[p];
      }
    }
    
    return result;

	};

	utilities.find = function(object, search){

		var keys = Object.keys(object),
				keysLength = keys.length,
				found = false,
				i;

		for(i = 0; i < keysLength; i++){
			
			if(object[keys[i]] === search){
				console.log(object[keys[i]] === search)
				found = true;
			}
		}

		return found;

	};

	window.utilities = utilities;

})(window);