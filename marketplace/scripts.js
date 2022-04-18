/** **/
const MENSAJE_TIPO_ENTREGA_DOMICIO_RM = '<i class="fas fa-shipping-fast"></i> Envío en 3 o 4 días Región Metropolitana (+$3.500)';
const MENSAJE_TIPO_ENTREGA_DOMICIO_RM_SIN_PRECIO = '<i class="fas fa-shipping-fast"></i> Envío en 3 o 4 días Región Metropolitana';

const MENSAJE_DOMICILIO_REGION = 'Recíbelo en tu domicilio en 3 a 4 días a través de Starken 👈. El pedido lo <strong>pagas al recibirlo</strong> 👈';
const MENSAJE_SUCURSAL_REGION = 'Retira el producto en 3 a 4 días en la sucursal Starken que tu elijas. Escribe el nombre de la sucursal más abajo 🙏';
/** **/

/** Modal **/
function abrirModal(nombreModal) {
	console.log(nombreModal, 'abrir modal')
	document.getElementById(nombreModal).style.display = 'flex';
}

let mouseEnContenidoModal = false;
function clickModal(nombreModal) {
	if (mouseEnContenidoModal) return;
	
	cerrarModal(nombreModal);
}
function encimaContenidoModal() {	
	mouseEnContenidoModal = true;
}
function saleDelContenidoModal() {	
	mouseEnContenidoModal = false;
}
function cerrarModal(nombreModal) {
	document.getElementById(nombreModal).style.display = 'none';
}
document.getElementById("site-header-cart").addEventListener("mouseover", mouseOverCarroCabecera);
document.getElementById("site-header-cart").addEventListener("mouseout", mouseOutCarroCabecera);
/** Fin Modal **/

/** Buscador **/
document.getElementById('icono-buscador').addEventListener('click', function() {
	if (document.getElementById('fname').value == '') document.getElementById('fname').focus();
});

// si busco, entonces lo dejo en el scroll para ver los productos
function initScrollTopDespuesDeBuscar() {
	let pathname = window.location.pathname;
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	if (params["s-filter"] != null) {
		window.scrollTo( 0, 400 );
	}
}
setTimeout(function() {
	initScrollTopDespuesDeBuscar();
}, 10);

/** Fin Buscador **/

/** Carro en la cabecera **/
	
	// obtener el total que esta en la parte superior
	var subtotalglobal = 0;
	function initSubTotal() {
		var regex = /(\d+)/g;
		var div = document.querySelector(".woocommerce-Price-amount");
		subtotalglobal = parseInt(getNumbersInString(div.textContent));
	}
	
	// obtener el costo de entrega guardado en localstorage
	function getCostoEntrega() {
		var costo = 0;
		switch (localStorage.getItem("tipodeentrega_auras")) {
			case 'retiroenbodega': costo = 0;
			break;
			case 'enviodomiciliorm': costo = 3500;
			break;
			case 'envioregionporpagar': costo = 0;
			break;
		}
		return costo;
	}
	
	// obtener la suma del total + costo de entrega
	function getTotal() {
		var total;
		if (subtotalglobal == 0) {
			total = 0;
		} else {
			total = subtotalglobal + getCostoEntrega();
		}
		return total;
	}

	// cuando se pone el mouse encima del carro de la cabecera
	var mouseOverCarrito = false;
	function mouseOverCarroCabecera() {
		var x = document.getElementsByClassName("widget_shopping_cart");
		if (x[0] == undefined) return;
		x[0].style.left = '-288px';
		// cargar el menu actual en el "menu custom" por primera vez
		if (!mouseOverCarrito) { 
			mouseOverCarrito = true;
			// agregarOpcionesDeEntrega_CarritoMenu();
			refreshTotalDetalleCarrito();
		}
	}

	// mouse sale del carrito de la cabecera
	function mouseOutCarroCabecera() {
		var x = document.getElementsByClassName("widget_shopping_cart");
		if (x[0] == undefined) return;
		x[0].style.left = '10000px';
	}
	
	// DOM - refrezca el total en del detalle carrito de la cabecera
	function refreshTotalDetalleCarrito() {
		var padre = document.getElementsByClassName('woocommerce-mini-cart__total');
		if (padre[0] == undefined) return;
		var element = padre[0].getElementsByClassName('woocommerce-Price-amount');
		var total = getTotal();
		element[0].innerHTML = "<bdi>";
		element[0].innerHTML += 	"<span class='woocommerce-Price-currencySymbol'> $</span>"+numberFormat(total);
		element[0].innerHTML += "</bdi>";
	}
	
	// DOM - refrezcar el costo adicional en el carro del header
	function refreshCostoAdicionalCarroHeader() {
		var element = document.getElementsByClassName("widget_shopping_cart_content");
		if (element[0] == undefined) return;
		
		// si el carro est vacío retorna
		var empty = document.getElementsByClassName('woocommerce-mini-cart__empty-message');
		if (empty[0] != undefined) return;

		// agregar la fila de subtotal y cargo envio, solo una vez
		if (document.getElementById('fila-costos-carro-header') == undefined) {
			// fila subtotal
			let spanSubtotal = document.createElement("p");
			spanSubtotal.setAttribute("id", "fila-subtotal-header");
			element[0].prepend(spanSubtotal);
			let filaSubtotal = document.getElementById("fila-subtotal-header");
			filaSubtotal.innerHTML = 	'<span id="fila-subtotal-header-texto">Subtotal:</span>';
			filaSubtotal.innerHTML += 	'<span id="fila-subtotal-header-costo">$'+numberFormat(subtotalglobal)+'</span>';
			
			// fila costo adicional
			let span = document.createElement("p");
			span.setAttribute("id", "fila-costos-carro-header");
			element[0].prepend(span);
			let filaCostoEntrega = document.getElementById("fila-costos-carro-header");
			filaCostoEntrega.innerHTML = 	'<span id="mensaje-carro-header"></span>';
			filaCostoEntrega.innerHTML += 	'<span id="costo-entrega-header"></span>';
		}
		
		let mensajeCarroHeader = '';
		let costoRetiroCarroHeader = '';
		
		// dependiendo del tipo de entrega, setea los mensajes a mostrar en la fila
		switch (localStorage.getItem("tipodeentrega_auras")) {
			case 'retiroenbodega': mensajeCarroHeader = 'Retira gratis en Argomedo #320, Santiago - <span onclick="toggleOpcionesEntrega()" class="color-primario enlace">Cambiar</span>'; costoRetiroCarroHeader = "$0";
			break;
			case 'enviodomiciliorm': mensajeCarroHeader = 'Llega en 3 o 4 días, Región Metropolitana - <span onclick="toggleOpcionesEntrega()" class="color-primario enlace">Cambiar</span>'; costoRetiroCarroHeader = "$3.500";
			break;
			case 'envioregionporpagar': mensajeCarroHeader = 'Llega en 4 a 5 días por Starken a Regiones - <span onclick="toggleOpcionesEntrega()" class="color-primario enlace">Cambiar</span>'; costoRetiroCarroHeader = "$0";
			break;
			default: mensajeCarroHeader = '<span onclick="toggleOpcionesEntrega()" class="color-primario enlace">Elige el tipo de entrega o envío 🚚 </span>';
		}
		
		document.getElementById('mensaje-carro-header').innerHTML = mensajeCarroHeader;
		document.getElementById('costo-entrega-header').innerHTML = costoRetiroCarroHeader;
	}
	
	// dibuja las opciones y calcula el total nuevamente luego de editar el carro
	function luegoDeEditarElCarro() {
		setTimeout(function() {
			initSubTotal();
			refreshTotalDetalleCarrito();
			refreshCostoAdicionalCarroHeader();
		}, 2000);
	}

	// DOM cambia subtotal por total que sale en el header carro
	function cambiaSubtotalPorTotal() {
		// si el carro est vacío retorna
		var empty = document.getElementsByClassName('woocommerce-mini-cart__empty-message');
		if (empty[0] == undefined) return;
		
		if (document.querySelector('.woocommerce-mini-cart__total strong') != null)
		document.querySelector('.woocommerce-mini-cart__total strong').innerHTML = 'Total:';
	}

	// DOM agrega fila subtotal en el header carro
	function agregarFilaSubtotalCarroHeader() {
		document.querySelector('.woocommerce-mini-cart__total strong').innerHTML = 'Total:';
	}

	/** Llamadas **/
	initSubTotal();
	setTimeout(function() {
		refreshCostoAdicionalCarroHeader();
		cambiaSubtotalPorTotal();
	}, 500);
	
	// cuando se cambia el total del carro del header, osea se elimina un item por ej
	if (document.getElementsByClassName("woocommerce widget_shopping_cart")[0] != undefined) {
		document.getElementsByClassName("woocommerce widget_shopping_cart")[0].addEventListener("click", function() {
			luegoDeEditarElCarro();
		});
	}

	// carrito en el menu
	document.getElementById("site-header-cart").addEventListener("mouseover", mouseOverCarroCabecera);
	document.getElementById("site-header-cart").addEventListener("mouseout", mouseOutCarroCabecera);
/** Fin Carro en la cabecera **/


/** Página Carro **/

	// refrezca el total en del detalle carrito de la pagina de carro
	function refreshTotalDetallePaginaCarro() {
		var padre = document.getElementsByClassName('order-total');
		if (padre[0] == undefined) return;
		var element = padre[0].getElementsByClassName('woocommerce-Price-amount');
		var total = getTotal();
		element[0].innerHTML = "<bdi>";
		element[0].innerHTML += 	"<span class='woocommerce-Price-currencySymbol'> $</span>"+numberFormat(total);
		element[0].innerHTML += "</bdi>";
	}
	
	// carga inicial de la pagina de carro
	var filaCreadaPaginaCarro = false;
	function crearFilaCargoEntregaPaginaCarro() {
		// entra cuando: no existe la fila creada y además tiene seleccionada una opcion de "tipoentrega"
		if (!filaCreadaPaginaCarro && localStorage.getItem("tipodeentrega_auras") != undefined) {
			filaCreadaPaginaCarro = true;
			var padre = document.getElementsByClassName('cart_totals');
			if (padre[0] == undefined) return;
			var table = padre[0].getElementsByClassName('shop_table');
			var row = table[0].insertRow(1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<div id="labelopcionentrega">Cargando...</div>';
			cell2.innerHTML = '<div id="costoopcionentrega">Cargando...</div>';
		}
	}
	
	// cambia el texto y el costo de entrega en el detalle de la pagina de carro
	function refreshTotalEntregaPaginaCarro() {
		if (document.getElementById('labelopcionentrega') == undefined) return;
			
		var texto = '';
		var costo = 0;
		var opcionSeleccionada = localStorage.getItem("tipodeentrega_auras");
		switch (opcionSeleccionada) {
			case 'retiroenbodega':
				texto = '<i class="fas fa-store"></i> Retira gratis en Argomedo #320, Santiago - <span onclick="toggleOpcionesEntrega()" class="color-primario enlace">Cambiar</span>';
				costo = "$0";
			break;
			case 'enviodomiciliorm':
				texto = '<i class="fas fa-shipping-fast"></i> Llega en 3 o 4 días, Región Metropolitana - <span onclick="toggleOpcionesEntrega()" class="color-primario enlace">Cambiar</span>';
				costo = '$3.500';
			break;
			case 'envioregionporpagar': 
				texto = '<i class="fas fa-shipping-fast"></i> Llega en 4 a 5 días a Regiones a través de Starken - <span onclick="toggleOpcionesEntrega()" class="color-primario enlace">Cambiar</span>';
				costo = "$0 (por pagar)";
			break;
		}
		document.getElementById('labelopcionentrega').innerHTML = '<div id="labelopcionentrega">'+texto+'</div>';
		document.getElementById('costoopcionentrega').innerHTML = '<div id="costoopcionentrega">'+costo+'</div>';
	}

	// cambia el total que sale en el carrito y guarda las opciones
	function cambiarTipoEntregaCarro() {
		var opcionSeleccionada = document.querySelector('input[name="tipodeentrega-popup"]:checked').value;
		switch (opcionSeleccionada) {
			case 'retiroenbodega': localStorage.setItem("tipodeentrega_auras", 'retiroenbodega');
			break;
			case 'enviodomiciliorm': localStorage.setItem("tipodeentrega_auras", 'enviodomiciliorm');
			break;
			case 'envioregionporpagar': localStorage.setItem("tipodeentrega_auras", 'envioregionporpagar');
			break;
		}

		// Editar el total de la pagina de carro
		refreshTotalDetallePaginaCarro(); 
		// Agregar/editar el total de entrega del detalle de la pagina de carro
		refreshTotalEntregaPaginaCarro();
	}

	// dibuja las opciones y calcula el total nuevamente luego de editar el carro
	function luegoDeEditarElCarroPaginaCarro() {
		
		setTimeout(function() {
			initSubTotal();

			// crear la fila vacia del costo de entrega
			filaCreadaPaginaCarro = false;
			crearFilaCargoEntregaPaginaCarro();
			
			// sumar el costo de entrega
			// mostrar label y costo en el detalle
			refreshTotalEntregaPaginaCarro();
			// actualiza el total
			refreshTotalDetallePaginaCarro();
			
			// por que cuando edito dos veces no funciona? por que tengo que delegarlo para que exista luego de su creaciòn en el DOM
			if (document.getElementsByName("update_cart")[0] != undefined)
			document.getElementsByName("update_cart")[0].addEventListener("click", luegoDeEditarElCarroPaginaCarro);
			
			// agregar listener de clicks nuevamente a los botones de eliminar
			agregarListenerClases("remove", "click", luegoDeEditarElCarroPaginaCarro);
		}, 3000);
	}
	
	// sumar y restar productos del carrito
	function restarCantidadPorID(myObject){
		let cantidad = myObject.parentElement.getElementsByClassName('input-text')[0].value;
		if (cantidad == 1) return;
		
		myObject.parentElement.getElementsByClassName('input-text')[0].value--;
		habilitarBotonActualizarCarro();
	}
	
	function sumarCantidadPorID(myObject){
		myObject.parentElement.getElementsByClassName('input-text')[0].value++;
		habilitarBotonActualizarCarro();
	}

	function habilitarBotonActualizarCarro() {
		if (document.getElementsByName("update_cart")[0] != undefined) {
			document.getElementsByName("update_cart")[0].removeAttribute("aria-disabled");
			document.getElementsByName("update_cart")[0].removeAttribute("disabled");
		}
	}

	// crear una fila para el costo de entrega en el detalle de la pagina de carro
	crearFilaCargoEntregaPaginaCarro();
	// mostrar el costo adicional de entrega en la tabla del total
	refreshTotalEntregaPaginaCarro();
	// actualizar el total de la pagina de carro
	refreshTotalDetallePaginaCarro();

	// se llama a "luegoDeEditarElCarroPaginaCarro" luego de actualizar el carro desde la pagina de carro
	if (document.getElementsByName("update_cart")[0] != undefined)
	document.getElementsByName("update_cart")[0].addEventListener("click", luegoDeEditarElCarroPaginaCarro);
	
	// se llama a "luegoDeEditarElCarroPaginaCarro" luego de eliminar un elemento el carro desde la pagina de carro
	// espero 3 segundos para que los productos estén cargados en el DOM
	setTimeout(function() {
		agregarListenerClases("remove","click", luegoDeEditarElCarroPaginaCarro);
	}, 3000);

/** Fin Página Carro **/


/** Menu **/
    
	/** Funciones **/
	function quitarFondoMenu() {
		var fondo = document.getElementById('fondo-menu');
		fondo.style.opacity = "0";
		fondo.style.right = "-3000px";
	}

	function quitarMenu() {
		var element = document.getElementById('menu-custom');
		element.classList.add("menu-closed");
		element.classList.remove("menu-opened");
	}

	function mostrarFondoMenu() {
		var fondo = document.getElementById('fondo-menu');
		fondo.style.opacity = "1";
		fondo.style.right = "0px";
	}

	function mostrarMenu() {
		var element = document.getElementById('menu-custom');
		element.classList.add("menu-opened"); 
		element.classList.remove("menu-closed");
	}

	function toggleMenu() {
		var element = document.getElementById('menu-custom');
		var hasClase = element.classList.contains( 'menu-opened' );
		// si esta cerrado el menu entra
		if (!hasClase) {
			mostrarMenu();
			mostrarFondoMenu();
		} else {
			quitarMenu();
			quitarFondoMenu();
		}
	}

	function toggleFondo() {
		var element = document.getElementById('menu-custom');
		var hasClase = element.classList.contains( 'menu-opened' );
		var siteNavigation = document.getElementById('site-navigation');

		// si esta cerrado el menu entra
		if (!hasClase) {
			mostrarFondoMenu();
			siteNavigation.classList.add('toggled');
		} else {
			quitarMenu();
			quitarFondoMenu();
			siteNavigation.classList.remove('toggled');
		}
	}

	function setCurrentMenuCustom() {
		var pathname = window.location.pathname;
		switch (pathname) {
			case '/':
				var menuinicio = document.getElementById('menuinicio');
				menuinicio.classList.add('current-menu-item');
			break;
			case '/categorias/gorros/' || '/categorias/gorros':
				document.getElementById('menugorros').classList.add('current-menu-item');
			break;
			case '/categorias/uniformes/' || '/categorias/uniformes':
				document.getElementById('menuuniformes').classList.add('current-menu-item');
			break;
			case '/categorias/mascarillas/' || '/categorias/mascarillas':
				document.getElementById('menumascarillas').classList.add('current-menu-item');
			break;
			case '/categorias/lanyard/' || '/categorias/lanyard':
				document.getElementById('menulanyards').classList.add('current-menu-item');
			break;
			case '/info/' || '/info':
				document.getElementById('menuinfo').classList.add('current-menu-item');
			break;
		}
	}

	// click en el fondo gris del menu hamburguesa
	document.getElementById("fondo-menu").addEventListener("click", toggleFondo);

	// click en el menu hamburguesa
	var menuToggle = document.getElementsByClassName("menu-toggle");
	menuToggle[0].addEventListener("click", toggleMenu);

	// inicializar el menu custom
	setCurrentMenuCustom();

/** Fin Menu **/

/** Tipo de entrega en el header **/

	function toggleFondoOpcionesEntrega() {
		var element = document.getElementById('tipo-entrega-popup');
		var hasClase = element.classList.contains( 'tipo-entrega-popup-opened' );
		// si esta cerrado el menu entra
		if (!hasClase) {
			mostrarOpcionesEntrega();
		} else {
			quitarOpcionesEntrega();
			quitarFondoOpcionesEntrega();
		}
	}
	
	function mostrarOpcionesEntrega() {
		var element = document.getElementById('tipo-entrega-popup');
		element.classList.add("tipo-entrega-popup-opened"); 
		element.classList.remove("tipo-entrega-popup-closed");
		var popup = document.getElementById('feature-tipo-entrega');
		popup.classList.add('feature-tipo-entrega-opened');
	}
	function quitarOpcionesEntrega() {
		var element = document.getElementById('tipo-entrega-popup');
		element.classList.add("tipo-entrega-popup-closed");
		element.classList.remove("tipo-entrega-popup-opened");
		var popup = document.getElementById('feature-tipo-entrega');
		popup.classList.remove('feature-tipo-entrega-opened');
	}

	function mostrarFondoOpcionesEntrega() {
		var fondo = document.getElementById('fondo-tipo-entrega-popup');
		fondo.style.opacity = "1";
		fondo.style.right = "0px";
	}
	function quitarFondoOpcionesEntrega() {
		var fondo = document.getElementById('fondo-tipo-entrega-popup');
		fondo.style.opacity = "0";
		fondo.style.right = "-3000px";
	}
	
	var encimaPopupOpcionesEntrega = false;
	function toggleOpcionesEntrega() {
		var element = document.getElementById('tipo-entrega-popup');
		var hasClase = element.classList.contains( 'tipo-entrega-popup-opened' );
		// abrir popup
		if (!hasClase) {
			initTipoEntregaPopup();
			mostrarOpcionesEntrega();
			mostrarFondoOpcionesEntrega();
			activarFuncionalidadClickFondo();
		} else {
			quitarOpcionesEntrega();
			quitarFondoOpcionesEntrega();
		}
	}
	
	function activarFuncionalidadClickFondo() {
		document.getElementById('costos-tipodeentrega-popup').addEventListener("mouseover", function() {
			encimaPopupOpcionesEntrega = true;
		});
		document.getElementById('costos-tipodeentrega-popup').addEventListener("mouseout", function() {
			encimaPopupOpcionesEntrega = false;
		});
		document.getElementsByClassName('tipo-entrega-popup-opened')[0].addEventListener("click", function() {
			if (!encimaPopupOpcionesEntrega) {
				quitarOpcionesEntrega();
				quitarFondoOpcionesEntrega();
			}
		});
	}

	// cambia el total que sale en el carrito y guarda las opciones
	function cambiarTipoEntregaPopup() {
		var opcionSeleccionada = document.querySelector('input[name="tipodeentrega-popup"]:checked');
		if (opcionSeleccionada == undefined) return;

		switch (opcionSeleccionada.value) {
			case 'retiroenbodega': 
				localStorage.setItem("tipodeentrega_auras", 'retiroenbodega');
			break;
			case 'enviodomiciliorm':
				localStorage.setItem("tipodeentrega_auras", 'enviodomiciliorm');
			break;
			case 'envioregionporpagar':
				localStorage.setItem("tipodeentrega_auras", 'envioregionporpagar');
			break;
		}
		
		// pagina de carro
		cambiarTipoEntregaCarro();
		
		// cerrar el popop
		quitarOpcionesEntrega();
		quitarFondoOpcionesEntrega();
		
		// refresh mensaje de la pagina de producto
		refreshMensajePaginaProducto();
		
		// refresh mensaje header carrito
		refreshTotalDetalleCarrito();
		refreshCostoAdicionalCarroHeader();
		
		// refresh mensaje barra fija con mensaje
		refreshMensajeBarraFija();
	}
	
	refreshMensajeBarraFija();
	function refreshMensajeBarraFija() {
		// dependiendo del tipo de entrega, setea los mensajes a mostrar en la fila
		switch (localStorage.getItem("tipodeentrega_auras")) {
			case 'retiroenbodega': mensajeCarroHeader = 'Retira <strong>gratis</strong> en Argomedo #320, Santiago - <span class="color-primario enlace">Cambiar <i class="fas fa-pen"></i></span>'; 
			break;
			case 'enviodomiciliorm': mensajeCarroHeader = 'Envío en 3 o 4 días, Región Metropolitana por <strong>$3.500</strong> - <span class="color-primario enlace">Cambiar <i class="fas fa-pen"></i></span>';
			break;
			case 'envioregionporpagar': mensajeCarroHeader = 'Envío en 4 a 5 días a Regiones a través de Starken <strong>por pagar</strong> - <span class="color-primario enlace">Cambiar <i class="fas fa-pen"></i></span>';
			break;
			default: mensajeCarroHeader = '<span class="color-primario enlace">Elige el tipo de entrega o envío 🚚 </span>';
		}
		
		document.querySelector('#cambiar-tipo-entrega-header span').innerHTML = mensajeCarroHeader
	}
		

	// inicializa la opciones del popup de opciones de entrega
	function initTipoEntregaPopup() {

		switch (localStorage.getItem('tipodeentrega_auras')) {
			case 'retiroenbodega': 
				document.getElementById('retiroenbodega-popup').click();
			break;
			case 'enviodomiciliorm':
				document.getElementById('enviodomiciliorm-popup').click();
			break;
			case 'envioregionporpagar':
				document.getElementById('envioregionporpagar-popup').click();
			break;
		}
	}

	function activarBotonPopUpEntrega() {
		// activar botón
		document.getElementsByClassName('btn-guardar-opcion-retiro')[0].classList.remove("btn-defecto");
		document.getElementsByClassName('btn-guardar-opcion-retiro')[0].classList.add("btn-principal");
	}

	document.getElementById("fondo-tipo-entrega-popup").addEventListener("click", toggleFondoOpcionesEntrega);
	document.getElementById('cambiar-tipo-entrega-header').addEventListener("click", toggleOpcionesEntrega);
	
	// logica para dejar borders sobre la opcion seleccionada en el popup de opciones de entrega
	/* document.getElementById('retiroenbodega-popup').addEventListener("click", function() {
		document.getElementById('item-tipodeentrega-rm').classList.remove("current-tipo-entrega");
		document.getElementById('item-tipodeentrega-region').classList.remove("current-tipo-entrega");
		document.getElementById('item-tipodeentrega-retiro').classList.add("current-tipo-entrega");
		activarBotonPopUpEntrega();
	}); */
	document.getElementById('enviodomiciliorm-popup').addEventListener("click", function() {
		// document.getElementById('item-tipodeentrega-retiro').classList.remove("current-tipo-entrega");
		document.getElementById('item-tipodeentrega-region').classList.remove("current-tipo-entrega");
		document.getElementById('item-tipodeentrega-rm').classList.add("current-tipo-entrega");
		activarBotonPopUpEntrega();
	});
	document.getElementById('envioregionporpagar-popup').addEventListener("click", function() {
		// document.getElementById('item-tipodeentrega-retiro').classList.remove("current-tipo-entrega");
		document.getElementById('item-tipodeentrega-rm').classList.remove("current-tipo-entrega");
		document.getElementById('item-tipodeentrega-region').classList.add("current-tipo-entrega");
		activarBotonPopUpEntrega();
	});
	if (localStorage.getItem('tipodeentrega_auras') != null) {
		activarBotonPopUpEntrega();
	}
/** Fin Tipo de entrega en el header **/


/** Filtro **/
document.getElementById('secondary').addEventListener("click", abrirFiltroMobile);

if (document.getElementsByClassName('abrir-filtro')[0] != undefined) {
	document.getElementsByClassName('abrir-filtro')[0].addEventListener("click", mostrarFiltroMobile);
}
if (document.getElementsByClassName('fondo-cerrar-filtro')[0] != undefined) {
	document.getElementsByClassName('fondo-cerrar-filtro')[0].addEventListener("click", sacarFiltroMobile);
}
if (document.getElementsByClassName('cerrar-filtro')[0] != undefined) {
	document.getElementsByClassName('cerrar-filtro')[0].addEventListener("click", sacarFiltroMobile);
}

// observador de cuando cambian los productos de la lista
const observer = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(added_node) {
			validarMensajeSinResultados();
		});
		mutation.removedNodes.forEach(function(added_node) {
			validarMensajeSinResultados();
		});
	});
});

var productsElement = document.getElementsByClassName('products');
if (productsElement[0] != undefined) observer.observe(document.querySelector(".products"), { subtree: false, childList: true });

// observador se llama cuando cambia la URL cambia
let lastUrl = location.href; 
new MutationObserver(() => {
  	const url = location.href;
  	if (url !== lastUrl) {
    	lastUrl = url;
    	onUrlChange();
		scrollToTop();
  	}
}).observe(document, {subtree: true, childList: true});
 
 // sube el scroll justo al comienzo de los productos
function scrollToTop() {
	// esta en el inicio
	let element = document.getElementsByClassName('lista-categorias')[0];
	// scroll to element
	if (element != undefined) {
		element.scrollIntoView();
	} else {
		// esta en una pagina de categoria
		document.getElementsByClassName('woocommerce-products-header')[0].scrollIntoView();;
	}
}

 // luego de filtrar (medio segundo) se sacará el filtro
function onUrlChange() {
	// luego de medio segundo
	setTimeout(function() {
		// saca el filtro mobile luego de clickear alguna opcion
		sacarFiltroMobile();
	}, 500);
}

// si no hay resultados muestra mensaje "sin resultados" custom y muestra/oculta ciertos componentes
function validarMensajeSinResultados() {
	if (document.getElementsByClassName('woocommerce-shop')[0] == undefined  && document.getElementsByClassName('tax-product_cat')[0] == undefined) return;
	
	let element = document.getElementsByClassName('products')[0];
	let cantidadResultados = 0;
	if (element != undefined) cantidadResultados = element.children.length;
	// sin resultados
	if (cantidadResultados == 0) {
		// agregar nueva clase al contenedor de la pagina
		document.getElementsByClassName('woocommerce-page')[0].classList.add('page-sin-resultados');
		// muestra el mensaje "sin resultados"
		document.getElementById('sin-resultados').style.display = 'block';
		// oculta el ordenar
		document.getElementsByClassName('storefront-sorting')[0].style.display = 'none';
	} else {
		// remover nueva clase al contenedor de la pagina
		document.getElementsByClassName('woocommerce-page')[0].classList.remove('page-sin-resultados');
		// oculta el mensaje "sin resultados"
		document.getElementById('sin-resultados').style.display = 'none';
		// muestra el ordenar
		document.getElementsByClassName('storefront-sorting')[0].style.display = 'block';
	}
}

function mostrarFiltroMobile() {
	document.getElementById('secondary').classList.add('mostrar-menu-mobile');
	document.getElementById('secondary').classList.remove('sacar-menu-mobile');
	document.getElementsByClassName('fondo-cerrar-filtro')[0].style.right = "0px";
	document.getElementsByClassName('fondo-cerrar-filtro')[0].style.opacity = "1";
}
function sacarFiltroMobile() {
	document.getElementById('secondary').classList.remove('mostrar-menu-mobile');
	document.getElementById('secondary').classList.add('sacar-menu-mobile');
	document.getElementsByClassName('fondo-cerrar-filtro')[0].style.opacity = "0";
	document.getElementsByClassName('fondo-cerrar-filtro')[0].style.right = "-1000px";
}
function abrirFiltroMobile() {
	document.getElementById('secondary').style.opacity = "1";
	document.getElementById('secondary').classList.add('mostrar-menu-mobile'); // = "0px";
}

// logica para dejar fijo el ordenar por y botón filtrar
var orderElement = document.getElementsByClassName('storefront-sorting')[0];

// lógica de scroll para mantener el filtro de busqueda
var el = document.getElementById('secondary');

// posición del eje Y del elemento "el". Gracias a eso sabemos cuando capturar el scroll para detener el scroll
var elTop = el.offsetTop;

// posición del eje Y del elemento "topFooter". Gracias a eso sabemos cuando ocultar el ordenar cuando llega al final
let topFooter = document.getElementById('colophon').offsetTop;

const footer = document.querySelector('.site-footer');
let altoPagina = (document.height !== undefined) ? document.height : document.body.offsetHeight;
let altoFooter = document.getElementsByClassName('site-footer')[0].offsetHeight;;
window.addEventListener('scroll', function(){
	// saber si aparecio en pantalla el footer
	let footerEnPantalla = isInViewport(footer);
	// si llegamos al footer, dejamos el filtro y ordenar fijo para que no solape con el footer
	if (footerEnPantalla) {
		el.classList.remove('secondary-fixed');
		let altoFiltro = document.getElementById('secondary').offsetHeight;
		// este es el numero de la coordinada "y" en donde tiene que quedarse pegado
		let nuevoTopFiltros = (document.height !== undefined) ? document.height : document.body.offsetHeight - altoFooter - altoFiltro;
		el.style.position = 'absolute';
		el.style.top = nuevoTopFiltros+'px';
		// desaparece el ordenar
		if (document.getElementsByClassName('storefront-sorting')[0] != undefined)
			document.getElementsByClassName('storefront-sorting')[0].style.diplay = 'none';
		return;
	} else {
		// si el elemento está a punto de ocultarse lo deja pegado
		if (document.documentElement.scrollTop > (elTop - 150)){
			el.classList.add('secondary-fixed');
		} else {
			el.style = '';
			el.classList.remove('secondary-fixed');
		}
		// mostrar el ordenar
		if (document.getElementsByClassName('storefront-sorting')[0] != undefined)
			document.getElementsByClassName('storefront-sorting')[0].style.diplay = 'block';
	}
	
	if (document.getElementsByClassName('storefront-sorting')[0] != undefined) {
		// si llega abajo hasta el footer, oculta el ordenar para que no se vean los botones sobre el footer (caso borde)
		if (document.documentElement.scrollTop > (topFooter - 900)){
			document.getElementsByClassName('orderby')[0].style.display = 'none';
			document.getElementsByClassName('woocommerce-result-count')[0].style.display = 'none';
		}  else {
			document.getElementsByClassName('orderby')[0].style.display = 'block';
			document.getElementsByClassName('woocommerce-result-count')[0].style.display = 'block';
		}
	}
});

// validar si un elemento esta en patalla (parcial o completamente)
function isInViewport(element) {
    let position = element.getBoundingClientRect();
    // checking for partial visibility
	return (position.top < window.innerHeight && position.bottom >= 0);
	// checking whether fully visible
	//
	/*
	if(position.top >= 0 && position.bottom <= window.innerHeight) {
		console.log('Element is fully visible in screen');
	}*/
}


if (orderElement != undefined) {
	var orderElementTop = orderElement.offsetTop
	let leftOrder = document.getElementsByClassName('storefront-sorting')[0].offsetLeft;
	window.addEventListener('scroll', function(){
		// si el elemento está a punto de ocultarse lo deja pegado
		if (document.documentElement.scrollTop > (orderElementTop - 155)){
			orderElement.classList.add('order-fixed');
			orderElement.style.left = leftOrder+'px';
			document.getElementsByClassName('abrir-filtro')[0].classList.add('button-filter-fixed');
			// sacar barra de opciones de entrega
			document.getElementById('cambiar-tipo-entrega-header').classList.add('sacar-cambiar-tipo-entrega-header');
		} else {
			// dejar fija la barra de opciones de entrega
			document.getElementById('cambiar-tipo-entrega-header').classList.remove('sacar-cambiar-tipo-entrega-header');
			orderElement.classList.remove('order-fixed');
			document.getElementsByClassName('abrir-filtro')[0].classList.remove('button-filter-fixed');
		}
	});
}


// cada vez que entra a la página, valida si hay que mostrar el mensaje sin resultados
validarMensajeSinResultados();
/** Fin Filtro **/

/** Shop **/
var ordenElement = document.getElementsByClassName('storefront-sorting');
if (ordenElement[0] != undefined) document.getElementsByClassName('storefront-sorting')[1].setAttribute('id', 'segundo-bloque-order');

/** Fin Shop **/

/** Producto **/
refreshMensajePaginaProducto();
function refreshMensajePaginaProducto() {
	if (document.getElementById('mensaje-tipo-de-entrega') == undefined) return;
	
	let mensaje = '';
	switch (localStorage.getItem("tipodeentrega_auras")) {
		case 'retiroenbodega': mensaje = "Retíralo gratis en <a href='https://goo.gl/maps/43bkqfXe5iDx2rMg9' target='_blank'> Argomedo #320, Santiago</a>";
		break;
		case 'enviodomiciliorm': mensaje = "Envío de 3 a 4 días por $3.500";
		break;
		case 'envioregionporpagar': mensaje = "Envío de 3 a 4 días por Starken y lo pagas al retirar";
		break;
	}
	document.getElementById('mensaje-tipo-de-entrega').innerHTML = mensaje;
}

function restarCantidad() {
	let input = document.getElementsByName('quantity')[0];
	let cantidadActual = input.value;
	console.log(cantidadActual);
	if (cantidadActual == 1) return;
	
	input.value = cantidadActual-1;
}

function sumarCantidad() {
	let input = document.getElementsByName('quantity')[0];
	let cantidadActual = parseInt(input.value);
	console.log(cantidadActual);	
	input.value = cantidadActual+1;
}

if (document.getElementById('seguir-comprando') != undefined) document.getElementById('seguir-comprando').addEventListener("click", atras);
function atras() {
	history.go(-2);
	return false;
}
/** Fin Producto **/


/** Checkout **/

// cada vez que selecciona un tipo de entrega, se actualizara el local storage y mensaje de tiempo de entrega
/*if ( document.querySelector( '#billing_tipo_entrega_retiroenbodega') != undefined)
document.querySelector( '#billing_tipo_entrega_retiroenbodega').addEventListener("click", function() {
	document.getElementById('billing_mensaje_tiempo_entrega_field').innerHTML = '<div class="lds-dual-ring"></div>';
	setTimeout(function() {
		actualizarMensajesTipoEntrega();
	}, 400);
	removerClaseOpcionSeleccionada();
	document.querySelectorAll('#billing_tipo_entrega_field .radio')[0].classList.add('current-tipo-entrega');
});
*/
if ( document.querySelector( '#billing_tipo_entrega_enviodomiciliorm') != undefined)
document.querySelector( '#billing_tipo_entrega_enviodomiciliorm').addEventListener("click", function() {
	document.getElementById('billing_mensaje_tiempo_entrega_field').innerHTML = '<div class="lds-dual-ring"></div>';
	setTimeout(function() {
		actualizarMensajesTipoEntrega();
	}, 400);
	removerClaseOpcionSeleccionada();
	document.querySelectorAll('#billing_tipo_entrega_field .radio')[0].classList.add('current-tipo-entrega');
	setTimeout(function() {
		// actualizar titulo de la tabla de subtotal
		document.querySelector('.woocommerce-checkout-review-order-table .fee th').innerHTML = MENSAJE_TIPO_ENTREGA_DOMICIO_RM_SIN_PRECIO;
	}, 3000);
});

if ( document.querySelector( '#billing_tipo_entrega_envioregionporpagar') != undefined)
document.querySelector('#billing_tipo_entrega_envioregionporpagar').addEventListener("click", function() {
	setTimeout(function() {
		actualizarMensajesTipoEntrega();
	}, 400);
	removerClaseOpcionSeleccionada();
	document.querySelectorAll('#billing_tipo_entrega_field .radio')[1].classList.add('current-tipo-entrega');
});

function removerClaseOpcionSeleccionadaRegiones() {
	document.querySelectorAll('#billing_opciones_region_field .radio')[0].classList.remove('current-tipo-entrega');
	document.querySelectorAll('#billing_opciones_region_field .radio')[1].classList.remove('current-tipo-entrega');
}
function removerClaseOpcionSeleccionada() {
	document.querySelectorAll('#billing_tipo_entrega_field .radio')[0].classList.remove('current-tipo-entrega');
	document.querySelectorAll('#billing_tipo_entrega_field .radio')[1].classList.remove('current-tipo-entrega');
	// document.querySelectorAll('#billing_tipo_entrega_field .radio')[2].classList.remove('current-tipo-entrega');
}
function actualizarMensajesTipoEntrega() {
	if (document.querySelector('input[name="billing_tipo_entrega"]:checked') == undefined) {
		document.querySelector('#billing_mensaje_tiempo_entrega_field').style.display = 'none';
		return;
	} else {
		document.querySelector('#billing_mensaje_tiempo_entrega_field').style.display = 'block';
	}
	
	let getSelectedValue = document.querySelector( 'input[name="billing_tipo_entrega"]:checked').value;
	localStorage.setItem("tipodeentrega_auras", getSelectedValue);
	let mensaje = '';
	switch (getSelectedValue) {
		case 'retiroenbodega':
			// quizá falta explicitar el horario... probar
			mensaje = 'Retira <strong>gratis</strong> en <a href="https://goo.gl/maps/43bkqfXe5iDx2rMg9" target="_blank">Argomedo #320, Santiago (ver en mapa <i class="fas fa-map-marked-alt color-primario"></i>)</a>. <br/><strong><i class="fas fa-exclamation-triangle color-naranjo"></i> IMPORTANTE: Debes coordinar tu retiro</strong> al siguiente número <a href="https://wa.me/56982896371">+569 8289 6371</a> 👈';
		break;
		case 'enviodomiciliorm':
			mensaje = 'Recíbelo en tu domicilio en 3 a 4 días a través de VS Express, el costo adicional será sólo de $3.500 👈';
		break;
		case 'envioregionporpagar':
			if (document.querySelector('input[name="billing_opciones_region"]:checked') == undefined) {
				document.querySelector('#billing_mensaje_tiempo_entrega_field').style.display = 'none';
				return;
			} else {
				document.querySelector('#billing_mensaje_tiempo_entrega_field').style.display = 'block';
			}
			
			let tipoEntregaRegion = document.querySelector('input[name="billing_opciones_region"]:checked').value;
			switch (tipoEntregaRegion) {
				case 'domicilio':
					mensaje = MENSAJE_DOMICILIO_REGION;
				break;
				case 'enviosucursal':
					mensaje = MENSAJE_SUCURSAL_REGION;
				break;
			}
		break;
	}
	document.getElementById('billing_mensaje_tiempo_entrega_field').innerHTML = mensaje;
}

inicializarCheckout();
// seleccionar automáticamente el tipo de entrega que tiene el usuario
function inicializarCheckout() {
	if (document.getElementsByClassName('woocommerce-checkout')[0] == undefined) return;
	
	let tipoEntrega = localStorage.getItem("tipodeentrega_auras");
	console.log(tipoEntrega, 'tipo entrega');
	switch (tipoEntrega) {
		/* case 'retiroenbodega':
			document.getElementsByName('billing_tipo_entrega')[0].click();
			document.querySelectorAll('#billing_tipo_entrega_field .radio')[0].classList.add('current-tipo-entrega');
		break; */
		case 'enviodomiciliorm':
			document.getElementsByName('billing_tipo_entrega')[0].click();
			// document.querySelectorAll('#billing_tipo_entrega_field .radio')[0].classList.add('current-tipo-entrega');
		break;
		case 'envioregionporpagar':
			document.getElementsByName('billing_tipo_entrega')[1].click();
			// document.querySelectorAll('#billing_tipo_entrega_field .radio')[1].classList.add('current-tipo-entrega');
		break;
	}
	
	if (sessionStorage.getItem('billing_first_name') != undefined) {
		document.getElementById('billing_first_name').value = sessionStorage.getItem('billing_first_name');
	} else {
		if (localStorage.getItem('billing_first_name') != undefined) {
			document.getElementById('billing_first_name').value = localStorage.getItem('billing_first_name');
		}
	}

	if (sessionStorage.getItem('billing_last_name') != undefined) {
		document.getElementById('billing_last_name').value = sessionStorage.getItem('billing_last_name');
	} else {
		if (localStorage.getItem('billing_last_name') != undefined) {
			document.getElementById('billing_last_name').value = localStorage.getItem('billing_last_name');
		}
	}
	
	if (sessionStorage.getItem('billing_rut') != undefined) {
		document.getElementById('billing_rut').value = sessionStorage.getItem('billing_rut');
	} else {
		if (localStorage.getItem('billing_rut') != undefined) {
			document.getElementById('billing_rut').value = localStorage.getItem('billing_rut');
		}
	}
	
	if (sessionStorage.getItem('billing_phone') != undefined) {
		document.getElementById('billing_phone').value = sessionStorage.getItem('billing_phone');
	} else {
		if (localStorage.getItem('billing_phone') != undefined) {
			document.getElementById('billing_phone').value = localStorage.getItem('billing_phone');
		}
	}
	
	if (sessionStorage.getItem('billing_email') != undefined) {
		document.getElementById('billing_email').value = sessionStorage.getItem('billing_email');
	} else {
		if (localStorage.getItem('billing_email') != undefined) {
			document.getElementById('billing_email').value = localStorage.getItem('billing_email');
		}
	}
	
	if (sessionStorage.getItem('billing_comuna') != undefined) {
		document.getElementById('billing_comuna').value = sessionStorage.getItem('billing_comuna');
	} else {
		if (localStorage.getItem('billing_comuna') != undefined) {
			document.getElementById('billing_comuna').value = localStorage.getItem('billing_comuna');
		}
	}
	
	if (sessionStorage.getItem('billing_address_1') != undefined) {
		document.getElementById('billing_address_1').value = sessionStorage.getItem('billing_address_1');
	} else {
		if (localStorage.getItem('billing_address_1') != undefined) {
			document.getElementById('billing_address_1').value = localStorage.getItem('billing_address_1');
		}
	}
	
	if (sessionStorage.getItem('billing_address_2') != undefined) {
		document.getElementById('billing_address_2').value = sessionStorage.getItem('billing_address_2');
	} else {
		if (localStorage.getItem('billing_address_2') != undefined) {
			document.getElementById('billing_address_2').value = localStorage.getItem('billing_address_2');
		}
	}
	
	if (sessionStorage.getItem('billing_region') != undefined) {
		document.getElementById('billing_region').value = sessionStorage.getItem('billing_region');
	} else {
		if (localStorage.getItem('billing_region') != undefined) {
			document.getElementById('billing_region').value = localStorage.getItem('billing_region');
		}
	}
	
	if (sessionStorage.getItem('billing_city') != undefined) {
		document.getElementById('billing_city').value = sessionStorage.getItem('billing_city');
	} else {
		if (localStorage.getItem('billing_city') != undefined) {
			document.getElementById('billing_city').value = localStorage.getItem('billing_city');
		}
	}

	let billing_opciones_region;
	if (sessionStorage.getItem('billing_opciones_region') != undefined) {
		billing_opciones_region = sessionStorage.getItem('billing_opciones_region');
	} else {
		if (localStorage.getItem('billing_opciones_region') != undefined) {
			billing_opciones_region = localStorage.getItem('billing_opciones_region');
		}
	}
	switch (billing_opciones_region) {
		case 'domicilio': 
			document.getElementById('billing_opciones_region_domicilio').click();
			removerClaseOpcionSeleccionadaRegiones();
			document.querySelectorAll('#billing_opciones_region_field .radio')[0].classList.add('current-tipo-entrega');
		break;
		case 'enviosucursal':
			document.getElementById('billing_opciones_region_enviosucursal').click();
			removerClaseOpcionSeleccionadaRegiones();
			document.querySelectorAll('#billing_opciones_region_field .radio')[1].classList.add('current-tipo-entrega');
		break;
	}

	if (sessionStorage.getItem('order_comments') != undefined) {
		document.getElementById('order_comments').value = sessionStorage.getItem('order_comments');
	} else {
		if (localStorage.getItem('order_comments') != undefined) {
			document.getElementById('order_comments').value = localStorage.getItem('order_comments');
		}
	}
	
	if (sessionStorage.getItem('billing_nombre_sucursal') != undefined) {
		document.getElementById('billing_nombre_sucursal').value = sessionStorage.getItem('billing_nombre_sucursal');
	} else {
		if (localStorage.getItem('billing_nombre_sucursal') != undefined) {
			document.getElementById('billing_nombre_sucursal').value = localStorage.getItem('billing_nombre_sucursal');
		}
	}
	
	// ordenar nombre comunas
	sortSelect(document.getElementById('billing_comuna'));
	
	// actualizar mensajes de tipo de entrega
	actualizarMensajesTipoEntrega();
}

if (document.getElementById('billing_first_name') != undefined) {
	// cada vez que sale del campo nombre guardar en sesion storage
	document.getElementById('billing_first_name').addEventListener("focusout", function() {
		sessionStorage.setItem("billing_first_name", document.querySelector( '#billing_first_name').value)
	});
	document.getElementById('billing_last_name').addEventListener("focusout", function() {
		sessionStorage.setItem("billing_last_name", document.querySelector( '#billing_last_name').value)
	});
	document.getElementById('billing_rut').addEventListener("focusout", function() {
		sessionStorage.setItem("billing_rut", document.querySelector( '#billing_rut').value)
	});
	document.getElementById('billing_phone').addEventListener("focusout", function() {
		sessionStorage.setItem("billing_phone", document.querySelector( '#billing_phone').value)
	});
	document.getElementById('billing_email').addEventListener("focusout", function() {
		sessionStorage.setItem("billing_email", document.querySelector( '#billing_email').value)
	});
	document.getElementById('billing_comuna').addEventListener("change", function() {
		sessionStorage.setItem("billing_comuna", document.querySelector( '#billing_comuna').value)
	});
	document.getElementById('billing_address_1').addEventListener("change", function() {
		sessionStorage.setItem("billing_address_1", document.querySelector( '#billing_address_1').value)
	});
	document.getElementById('billing_address_2').addEventListener("change", function() {
		sessionStorage.setItem("billing_address_2", document.querySelector( '#billing_address_2').value)
	});
	document.getElementById('billing_region').addEventListener("change", function() {
		sessionStorage.setItem("billing_region", document.querySelector( '#billing_region').value)
	});
	document.getElementById('billing_city').addEventListener("change", function() {
		sessionStorage.setItem("billing_city", document.querySelector( '#billing_city').value)
	});
	document.querySelector( '#billing_opciones_region_domicilio').addEventListener("click", function() {
		let getSelectedValue = document.querySelector( 'input[name="billing_opciones_region"]:checked').value;
		sessionStorage.setItem("billing_opciones_region", getSelectedValue);
		document.getElementById('billing_mensaje_tiempo_entrega_field').innerHTML = MENSAJE_DOMICILIO_REGION;
		removerClaseOpcionSeleccionadaRegiones();
		document.querySelectorAll('#billing_opciones_region_field .radio')[0].classList.add('current-tipo-entrega');
	});
	document.querySelector( '#billing_opciones_region_enviosucursal').addEventListener("click", function() {
		let getSelectedValue = document.querySelector( 'input[name="billing_opciones_region"]:checked').value;
		sessionStorage.setItem("billing_opciones_region", getSelectedValue)
		document.getElementById('billing_mensaje_tiempo_entrega_field').innerHTML = MENSAJE_SUCURSAL_REGION;
		removerClaseOpcionSeleccionadaRegiones();
		document.querySelectorAll('#billing_opciones_region_field .radio')[1].classList.add('current-tipo-entrega');
	});
	document.getElementById('order_comments').addEventListener("change", function() {
		sessionStorage.setItem("order_comments", document.querySelector( '#order_comments').value)
	});
	document.getElementById('billing_nombre_sucursal').addEventListener("change", function() {
		sessionStorage.setItem("billing_nombre_sucursal", document.querySelector( '#billing_nombre_sucursal').value)
	});
}
// cuando envia el formulario, se guarda en local storage si corresponde
function antesDeEnviarAlPago(){
	if (document.getElementById('billing_recordar').checked == false) return;
	setTimeout(function(){
		localStorage.setItem("billing_first_name", document.querySelector( '#billing_first_name').value)
		localStorage.setItem("billing_last_name", document.querySelector( '#billing_last_name').value)
		localStorage.setItem("billing_rut", document.querySelector( '#billing_rut').value)
		localStorage.setItem("billing_phone", document.querySelector( '#billing_phone').value)
		localStorage.setItem("billing_email", document.querySelector( '#billing_email').value)
		localStorage.setItem("billing_comuna", document.querySelector( '#billing_comuna').value)
		localStorage.setItem("billing_address_1", document.querySelector( '#billing_address_1').value)
		localStorage.setItem("billing_address_2", document.querySelector( '#billing_address_2').value)
		localStorage.setItem("billing_region", document.querySelector( '#billing_region').value)
		localStorage.setItem("billing_city", document.querySelector( '#billing_city').value)
		
		if (document.querySelector('input[name="billing_opciones_region"]:checked') != null) {
			let billingOpcionesRegion = document.querySelector( 'input[name="billing_opciones_region"]:checked').value;
			localStorage.setItem("billing_opciones_region", billingOpcionesRegion)
		}
			
		localStorage.setItem("order_comments", document.querySelector( '#order_comments').value)
		localStorage.setItem("billing_nombre_sucursal", document.querySelector( '#billing_nombre_sucursal').value)
	}, 500);
}

/** Fin Checkout **/

/** Utils **/
function getNumbersInString(string) {
  var tmp = string.split("");
  var map = tmp.map(function(current) {
    if (!isNaN(parseInt(current))) {
      return current;
    }
  });

  var numbers = map.filter(function(value) {
    return value != undefined;
  });

  return numbers.join("");
}

function numberFormat(numeroSinFormato){
	var num = numeroSinFormato;
	if(!isNaN(num)){
		num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
		num = num.split('').reverse().join('').replace(/^[\.]/,'');
	}
	return num;
}

// ordena elementos
function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}

// agrega listener a todos los elementos de una clase
// nombre de la clase, evento que se quiere escuchar y función a llamar
function agregarListenerClases(nombreClase, evento, callback) {
	let arrayBotonEliminar = document.getElementsByClassName(nombreClase);
	for (let i=0; i<arrayBotonEliminar.length; i++) {
		document.getElementsByClassName(nombreClase)[i].addEventListener(evento, callback);
	}
}	