(function(window){

	var cart = {
		items: [],
		quantity: 0,
		subtotal: 0.00,
		shippingRate: 0.02,
		shippingTotal: 0.00,
		total: 0.00,
		discountTotal: 0.00,

		getItems: function() {
			return this.items;
		},

		getSubtotal: function() {
			
			this.subtotal = 0.00;

			for(var i = 0; i < this.items.length; i++){

				this.subtotal += this.items[i].product_total;
				console.log(this.subtotal);
			}

			return this.subtotal;

		},

		getTotal: function() {
			
			this.total = this.subtotal + this.shippingTotal;
			return this.total;

		},

		getDiscount: function() {

			 return this.discountTotal;

		},

		getShipping: function() {

			var tmp = 0.00;

			this.shippingTotal = 0.00;

			for(var i = 0; i < this.items.length; i++) {
				tmp = this.items[i].product_total * this.shippingRate;
				this.shippingTotal += tmp;
			}
		
			return this.shippingTotal; 

		}

	},

	products = document.querySelectorAll('.product'),
	addButtons = document. querySelectorAll('.add-to-cart'),
	discountButton = document.querySelector('.add-discount'),
	shoppingCart = document.getElementById('shopping-cart'),
	quantity = document.querySelector('.quantity'),
	cartSubtotalPrice = document.getElementById('subtotal-price'),
	cartShippingPrice = document.getElementById('shipping-price'),
	cartTotalPrice = document.getElementById('total-price'),
	removeButtons,
	updateButtons;

	function cartInit() {
		
		var quantity = document.querySelector('.quantity');

		quantity.innerHTML = cart.quantity;
		shoppingCart.innerHTML =  '<p>You have no items in your cart.</p>';
		
		for(var i = 0; i < products.length;i++){
			products[i].setAttribute('data-product-id', i);
		}

		for(var i = 0; i < addButtons.length; i++){
			addButtons[i].addEventListener('click', addtoCart);
		}

		discountButton.addEventListener('click', applyDiscount);

	}

	function addtoCart(e) {
		e.preventDefault();

		var product = e.target.parentNode,
				productName = product.querySelector('.product-title h3'),
				productImgSrc = product.querySelector('.product-image img').src,
				productDescription = product.querySelector('.product-description p'),
				productPrice = parseFloat(product.querySelector('.price').innerHTML),
				isInCart = false,
				foundId = 0;

		for(var i = 0; i < cart.items.length; i++){
			if( utilities.find(cart.items[i], product.dataset.productId)){
				isInCart = true;
				foundId = i;
			}
		}
		
		if(isInCart){

			cart.items[foundId].quantity += 1;

		} else {
			
			cart.items.push({
				id: product.dataset.productId,
				category: product.dataset.category,
				product_name: productName.innerHTML,
				product_image: productImgSrc,
				product_description: productDescription.innerHTML,
				product_price: productPrice,
				quantity: 1,
				product_total: productPrice
			});
			
		}


		updateCart();
		updateDOM();

	}

	

	function removeFromCart(e) {

		var product = e.target.parentNode.parentNode,
				shop;

		e.preventDefault();

		product.setAttribute('class', 'disapear');

		for(var i = 0; i < cart.items.length; i++){
			if( utilities.find(cart.items[i], product.dataset.productId)){
				cart.items.splice(i, 1);
			}
		}
		
		if(product.parentNode){
			product.parentNode.removeChild(product);
		}

		updateCart();


	}

	function updateCart() {

		var newQuantity = 0;

		quantity.innerHTML = '';
		cartSubtotalPrice.innerHTML = '';
		cartShippingPrice.innerHTML = '';
		cartTotalPrice.innerHTML = '';

		for(var i = 0; i < cart.items.length; i++){
			newQuantity += cart.items[i].quantity;
			cart.items[i].product_total = cart.items[i].quantity * cart.items[i].product_price;
		}

		cart.quantity = newQuantity;
		quantity.innerHTML = cart.quantity;


		if(cart.quantity === 0 ){
			shoppingCart.innerHTML =  '<p>You have no items in your cart.</p>';
			document.querySelector('.modal').removeAttribute('id');
		} else {
			document.querySelector('.modal').setAttribute('id', 'modal1');
		}

		cartSubtotalPrice.innerHTML = (cart.getSubtotal() - cart.getDiscount()).toFixed(2);
		cartShippingPrice.innerHTML = cart.getShipping().toFixed(2);
		cartTotalPrice.innerHTML = (cart.getTotal() - cart.getDiscount()).toFixed(2);
		

	}

	function updateQuantity(e) {

		e.preventDefault();

		var product = e.target.parentNode.parentNode,
				quantity = parseInt(product.querySelector('.cart-quantity input').value),
				itemTotalPrice = product.querySelector('.item-total-price');
			
		for(var i = 0; i < cart.items.length; i++){

			if( utilities.find(cart.items[i], product.dataset.productId)){
				
				cart.items[i].quantity = quantity;
				
				if( cart.items[i].quantity === 0){
					removeFromCart(e);
				} else {
					updateCart();
					itemTotalPrice.innerHTML = cart.items[i].product_total.toFixed(2);
				}

				
				
			}
		}

		


	}

	function updateDOM() {
		var html = '',
				cartItemDiv,
				productImgDiv,
				image,
				productDetailsDiv,
				productTitleTag,
				prodDescription,
				cartQuantityDiv,
				cartQuantityHeadingTag,
				quantityNumInput,
				cartPriceDiv,
				cartPriceHeadingTag,
				cartPriceSpan,
				updateButton,
				removeButton;
		
		quantity.innerHTML = cart.quantity;

		if (cart.items.length <= 0){

			shoppingCart.innerHTML =  '<p>You have no items in your cart.</p>';

		} else {
			
			shoppingCart.innerHTML =  '';
			
			for(var i = 0; i < cart.items.length; i++){
				
				// Create cart item wrapper element
				cartItemDiv = document.createElement('div');
				cartItemDiv.setAttribute('class',"item clearfix");
				cartItemDiv.setAttribute('data-product-id', cart.items[i].id);

				// Create product image wrapper element
				productImgDiv = document.createElement('div');
				productImgDiv.setAttribute("class","product-img");

				// Create product image element
				image = document.createElement('img');
				image.setAttribute("src",cart.items[i].product_image); 

				// Append Image to div element
				productImgDiv.appendChild(image);

				// Create product details wrapper element 
				productDetailsDiv = document.createElement('div');
				productDetailsDiv.setAttribute("class","product-details");

				// Create product Title element
				productTitleTag = document.createElement('h3');
				productTitleTag. appendChild(document.createTextNode(cart.items[i].product_name));
				
				// Append title tag to details div
				productDetailsDiv.appendChild(productTitleTag);
				
				// Create product description 
				prodDescription = document.createElement('p');
				prodDescription.appendChild(document.createTextNode(cart.items[i].product_description));
	
				// Append description to product details div
				productDetailsDiv.appendChild(prodDescription);

				// Create cart quantity div
				cartQuantityDiv = document.createElement('div');
				cartQuantityDiv.setAttribute('class', 'cart-quantity');

				//Create cart quantity heading tag
				cartQuantityHeadingTag = document.createElement('h3');
				cartQuantityHeadingTag.appendChild(document.createTextNode('Quantity'));

				// Create Quantity Input Field
				quantityNumInput = document.createElement('input');
				quantityNumInput.setAttribute('type', 'number');
				quantityNumInput.setAttribute('class', 'form-control');
				quantityNumInput.setAttribute('min', '0');
				quantityNumInput.value = cart.items[i].quantity;

				// Append Quantitiy Heading and 
				cartQuantityDiv.appendChild(cartQuantityHeadingTag);
				cartQuantityDiv.appendChild(quantityNumInput);

				// Create update button
				updateButton =  document.createElement('a');
				updateButton.setAttribute('class', 'button button-sm update-cart');
				updateButton.appendChild(document.createTextNode('Update'));

				// Create remove button
				removeButton = document.createElement('a');
				removeButton.setAttribute('class', 'button button-sm remove-from-cart');

				// Append buttons to cart quantity div
				cartQuantityDiv.appendChild(updateButton);
				cartQuantityDiv.appendChild(removeButton);

				// Create Price div
				cartPriceDiv = document.createElement('div');
				cartPriceDiv.setAttribute('class', 'cart-price');

				// Create Price Heading Tag
				cartPriceHeadingTag = document.createElement('h3');
				cartPriceHeadingTag.appendChild(document.createTextNode('Price'));
				cartPriceSpan = document.createElement('span');
				cartPriceSpan.setAttribute('class', 'item-total-price');
				cartPriceSpan.appendChild(document.createTextNode(cart.items[i].product_total));

				// Append price heading to price div
				cartPriceDiv.appendChild(cartPriceHeadingTag);
				cartPriceDiv.appendChild(cartPriceSpan);
							
				// Append child divs to the main cart div			
				cartItemDiv.appendChild(productImgDiv);
				cartItemDiv.appendChild(productDetailsDiv);
				cartItemDiv.appendChild(cartQuantityDiv);
				cartItemDiv.appendChild(cartPriceDiv);
				
				// Append Item to Shopping Cart
				shoppingCart.appendChild(cartItemDiv);

			}

		}

		//shoppingCart.innerHTML = html;
		updateButtons = document.querySelectorAll('.update-cart');
		removeButtons = document.querySelectorAll('.remove-from-cart');

		for(var j = 0; j < removeButtons.length; j++){
			removeButtons[j].addEventListener('click', removeFromCart);
		}

		for(var k = 0; k < updateButtons.length; k++){
			updateButtons[k].addEventListener('click', updateQuantity);
		}



	}

	function applyDiscount(e) {

		e.preventDefault();

		var discountCode = e.target.parentNode.querySelector('.discount-field').value.toUpperCase(),
				discountMessage = e.target.parentNode.querySelector('#discount-message'),
				currentDiscount = cart.getDiscount(),
				tmpDiscount = 0.00;

		discountMessage.innerHTML = '';

		if( discountCode == 'SAVE5' ){
			
			tmpDiscount = cart.getSubtotal() * 0.05;
			
		} else if( discountCode == 'SAVE10' ){
			
			var mostExpensive = 0.00;
			
			for(var i = 0; i < cart.items.length; i++){
				if( cart.items[i].product_price > mostExpensive){
					mostExpensive = cart.items[i].product_price;
				}
			}

			tmpDiscount = mostExpensive * 0.10;
			
		} else if ( discountCode == 'SAVE15' ) {
			 
			 var tmpArr = [],
			 		 discountItemPrice;

			 for(var i = 0; i < cart.items.length; i++){
			 		if (cart.items[i].category == "phone"){
			 			tmpArr.push( cart.items[i].product_total );
			 		}
			 }


			 if(tmpArr.length > 0){

			 	for(var j = 0; j < tmpArr.length; j++){
			 		
			 		discountItemPrice = tmpArr[j] * 0.15;
			 		tmpDiscount += discountItemPrice;
			 	}
			 	
			 } else {
			 	discountMessage.innerHTML = '<p>The discount code you entered only applies to phones.</p>';
			 }

		} else {
			tmpDiscount = 0.00;
			currentDiscount = tmpDiscount;
		}
		
		
		cart.discountTotal = currentDiscount > tmpDiscount ? (
			
			discountMessage.innerHTML = '<p>Your previous discount code gave you a larger discount. The new code will not be applied.</p>',
			currentDiscount

			) : (

			cart.discountTotal = tmpDiscount

			);
		
		updateCart();
		
	}

	cartInit();

	window.cart = cart;

})(window);