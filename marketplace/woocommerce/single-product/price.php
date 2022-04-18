<?php
/**
 * Single Product Price
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/price.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product;
// solo si es uniforme...
if (str_contains($product->slug, 'top-')) {
?>
	<!-- ver talla -->
	<span 
		id='ver-tabla-de-tallas'
		onClick='abrirModal("modal-tabla-de-tallas")'
		class='enlace color-primario'
	   >
		<i class="fas fa-ruler color-primario"></i> Ver tabla de tallas 
	</span>
	<div id='modal-tabla-de-tallas' class='modal' onClick='clickModal("modal-tabla-de-tallas")'>
		<div class='contenido-modal'
			 onmouseover='encimaContenidoModal()'
			 onmouseleave='saleDelContenidoModal()'
			 >
			<span class="cerrar-modal" onclick="cerrarModal('modal-tabla-de-tallas')"><i class="fas fa-times"></i></span>
			<img src="http://aurisima.cl/wp-content/uploads/2022/02/aurisima-tabla-de-tallas-uniformes-clinicos-para-mujer.webp" />
		</div>
	</div>
	<!-- fin ver talla -->
<?php } ?>

<p class="<?php echo esc_attr( apply_filters( 'woocommerce_product_price_class', 'price' ) ); ?>"><?php echo $product->get_price_html(); ?></p>

<!-- medios de pago -->
<span 
    id='ver-medios-de-pago'
    onClick='abrirModal("modal-medios-de-pago")'
	class='enlace color-primario'
   >
	Ver los medios de pago
</span>
<div id='modal-medios-de-pago' class='modal' onClick='clickModal("modal-medios-de-pago")'>
	<div class='contenido-modal'
		 onmouseover='encimaContenidoModal()'
		 onmouseleave='saleDelContenidoModal()'
		 >
		<span class="cerrar-modal" onclick="cerrarModal('modal-medios-de-pago')"><i class="fas fa-times"></i></span>
		<h3 class="titulo-3">
			Medios de pago
		</h3>
		<p>
			Puedes pagar con tu <strong>Tarjeta de Crédito</strong> en cuotas o con tu <strong>Tarjeta de débito</strong> a través de <strong>Webpay Plus - Transbank</strong> <i class="far fa-credit-card"></i>
		</p>
		<img src="http://aurisima.cl/wp-content/uploads/2022/02/aurisima-medios-de-pago.webp" />
	</div>
</div>
<!-- fin medios de pago -->

<!-- tipo de entrega -->
<div id='content-tipo-de-entrega'>
	<span id='mensaje-tipo-de-entrega'></span>
	<span
		  id='link-cambiar-tipo-entrega'
		  onclick='toggleOpcionesEntrega()'
		  class='enlace color-primario'>
		<i class="fas fa-truck color-primario"></i> Elige el tipo de entrega o envío
	</span>
</div>
<!-- fin tipo de entrega -->

<!-- cambios -->
<span 
    id='ver-info-devoluciones'
    onClick='abrirModal("modal-info-devoluciones")'
	class='enlace color-primario'
   >
	<i class="fas fa-undo color-primario"></i> ¿Cómo funcionan los cambios?
</span>
<div id='modal-info-devoluciones' class='modal' onClick='clickModal("modal-info-devoluciones")'>
	<div class='contenido-modal'
		 onmouseover='encimaContenidoModal()'
		 onmouseleave='saleDelContenidoModal()'
		 >
		<h3 class="titulo-3">
			Cambios
		</h3>
		<p>
			Podrás cambiar el producto dentro de los primeros 10 días de recibida tu compra. Para esto escríbenos al Whatsapp <a href="https://wa.me/56981372476" target="_blank" rel="noopener">+569 8137 2476</a>, indícanos el número de pedido y el producto por el que lo deseas cambiar. 😄
			<a href="https://aurisima.cl/como-funcionamos/#cambios" target="_blank">Más detalles acá</a>
		</p>
		<span class="cerrar-modal" onclick="cerrarModal('modal-info-devoluciones')"><i class="fas fa-times"></i></span>
	</div>
</div>
<!-- fin cambios -->

<!-- stock disponible -->
<div id="mensaje-stock-disponible"><i class="fas fa-check-square color-verde"></i> ¡Stock disponible!</div>
<!-- fin stock disponible -->

<!-- titulo descripcion -->
<h3 id="titulo-descripcion">Descripción</h3>
<!-- fin titulo descripcion -->