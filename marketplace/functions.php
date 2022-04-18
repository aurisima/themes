<?php /*

  This file is part of a child theme called marketplace.
  Functions in this file will be loaded before the parent theme's functions.
  For more information, please read
  https://developer.wordpress.org/themes/advanced-topics/child-themes/

*/

// this code loads the parent's stylesheet (leave it in place unless you know what you're doing)

function your_theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, 
      get_template_directory_uri() . '/style.css'); 

    wp_enqueue_style( 'child-style', 
      get_stylesheet_directory_uri() . '/style.css', 
      array($parent_style), 
      wp_get_theme()->get('Version') 
    );
}

add_action('wp_enqueue_scripts', 'your_theme_enqueue_styles');

/*  Add your own functions below this line.
    ======================================== */ 

// añadir el archivo js personalizado
add_action('wp_enqueue_scripts', 'wpdocs_theme_name_scripts');
function wpdocs_theme_name_scripts(){
        wp_register_script('miscript', get_stylesheet_directory_uri().'/scripts.js', array('jquery'), wp_get_theme()->get('Version'), true );
        wp_enqueue_script('miscript');
}

// añadir google fonts
add_action("wp_enqueue_scripts", "dcms_insertar_google_fonts");
function dcms_insertar_google_fonts(){
    $url = "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap";
    wp_enqueue_style('google_fonts', $url);
 }

// quitar el buscador
/*
function storefront_product_search(){
   // return false;
}
*/

function storefront_credit() {
    ?>
    <div class="site-info">
        © Aurísima 2022 <br/> Hecho en Chile con amor ❤️
    </div><!-- .site-info -->
    <?php
}

/*
add_action( 'woocommerce_before_main_content', 'sumar_nombre');
function sumar_nombre() {
	echo 'Nombre del producto';
}*/

/** menu custom que se ve en mobile **/
function storefront_header_container() { ?>
<div>
	<div id="fondo-menu"></div>
	<div id="menu-custom" class="menu-closed">
		<!-- opciones de menu acá -->
		<ul>
					<li>
						<a
						   href="/"
						   title="Tienda Uniformes Aura"
						   hreflang="es"
						   lang="es"
						   rel="author"
						   target="_self"
						   id="menuinicio">
							<i class="fas fa-home"></i> Inicio
						</a>
					</li>
					<li>
						<a
						   href="/categorias/gorros"
						   title="Gorros Clínicos"
						   hreflang="es"
						   lang="es"
						   rel="author"
						   target="_self"
						   id="menugorros">
							<i class="fas fa-user-nurse"></i> Gorros
						</a>
					</li>
					<li>
						<a
						   href="https://aurisima.cl/categorias/uniformes-clinicos-estampados/"
						   title="Top Uniformes Clínicos"
						   hreflang="es"
						   lang="es"
						   rel="author"
						   target="_self"
						   id="menuuniformes">
							<i class="fas fa-tshirt"></i> Top Estampados
						</a>
					</li>
					<li>
						<a
						   href="https://aurisima.cl/categorias/uniformes-clinicos-top-lisos/"
						   title="Top Uniformes Clínicos"
						   hreflang="es"
						   lang="es"
						   rel="author"
						   target="_self"
						   id="menuuniformes">
							<i class="fas fa-tshirt"></i> Top Lisos
						</a>
					</li>
					<li>
						<a
						   href="https://aurisima.cl/categorias/pantalones/"
						   title="Pantalones Clínicos Mujer"
						   hreflang="es"
						   lang="es"
						   rel="author"
						   target="_self"
						   id="menuuniformes">
							<i class="fas fa-tshirt"></i> Pantalones
						</a>
					</li>
					<li>
						<a
						   href="/categorias/lanyards"
						   title="Lanyards Clínicos"
						   hreflang="es"
						   lang="es"
						   rel="author"
						   target="_self"
						   id="menulanyards">
							<i class="fas fa-address-card"></i> Lanyards
						</a>
					</li>
					<li>
						<a
						   href="/como-funcionamos"
						   title="¿Cómo funcionamos?"
						   hreflang="es"
						   lang="es"
						   rel="author"
						   target="_self"
						   id="menuinfo"
						   class="menuinfo">
							<i class="fas fa-headset"></i> ¿Cómo funcionamos?
						</a>
						<ul id='info-opciones'>
							<!--<li>
								<a
								   href="/info#quienes-somos"
								   title="¿Quiénes somos?"
								   hreflang="es"
								   lang="es"
								   rel="author"
								   target="_self">
									¿Quiénes somos?
								</a>
							</li>-->
							<li>
								<a
								   href="https://aurisima.cl/como-funcionamos#como-comprar"
								   title="¿Quiénes somos?"
								   hreflang="es"
								   lang="es"
								   rel="author"
								   target="_self">
									¿Cómo comprar?
								</a>
							</li>
							<li>
								<a
								   href="https://aurisima.cl/como-funcionamos#cambios"
								   title="Cambios"
								   hreflang="es"
								   lang="es"
								   rel="author"
								   target="_self">
									Cambios
								</a>
							</li>
							<li>
								<a
								   href="https://aurisima.cl/como-funcionamos#opciones-envio"
								   title="Opciones de envío"
								   hreflang="es"
								   lang="es"
								   rel="author"
								   target="_self">
									Opciones de envío
								</a>
							</li>
							<li>
								<a
								   href="https://aurisima.cl/como-funcionamos#tiempos-envio"
								   title="Tiempos de envíos"
								   hreflang="es"
								   lang="es"
								   rel="author"
								   target="_self">
									Tiempos de envíos
								</a>
							</li>
							<li>
								<a
								   href="https://aurisima.cl/como-funcionamos#contacto"
								   title="Contacto"
								   hreflang="es"
								   lang="es"
								   rel="author"
								   target="_self">
									Contacto
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
</div>
<?php }

// agregar mensajes al mensaje de producto agregado
add_filter('wc_add_to_cart_message', 'handler_function_name', 10, 2);
function handler_function_name($message, $product_id) { 
	return '
		<div>
			<span>¡Producto agregado!</span> 
			<span id="seguir-comprando" class="enlace enlace-blanco">Seguir comprando</span> 
			<a id="ir-al-carro" href="https://aurisima.cl/cart" class="enlace enlace-blanco"><i class="fas fa-shopping-cart"></i> Ir al carro</a>
		</div>';
}

// remover la palabra "billing" de los mensajes de error del checkout
add_filter( 'woocommerce_add_error', 'customize_wc_errors' );
function customize_wc_errors( $error ) {
	if ( strpos( $error, 'Billing ' ) !== false ) {
		$error = str_replace("Billing ", "", $error);
	}
	return $error;
}

// agregar mensaje email por el tipo de envío que seleccionó
add_action( 'woocommerce_email_order_details', 'tipo_de_envio_email', 10, 3 );
function tipo_de_envio_email($order_obj, $sent_to_admin, $plain_text) {
	// https://rudrastyh.com/woocommerce/order-meta-in-emails.html
	$tipoEntrega = get_post_meta( $order_obj->get_order_number(), 'billing_tipo_entrega', true );
	?>
		<div id="mensaje-retiro" style="color: #000; font-family: montserrat;">
			<?php if($tipoEntrega == "retiroenbodega") : ?>
				<strong>¡Importante!</strong> Coordina tu retiro escribiéndole al número <a href="https://wa.me/56982896371">+56 9 8289 6371</a> 👈. Retira <strong>gratis</strong> en <a href="https://goo.gl/maps/43bkqfXe5iDx2rMg9" target="_blank">Argomedo #320, Santiago (ver en mapa <i class="fas fa-map-marked-alt color-primario"></i>)</a>.
				<?php endif; ?>
				<?php if($tipoEntrega == "enviodomiciliorm") : ?>
					<strong>¡Importante!</strong> El envío se realizará al domilicio que ingresaste dentro de 3 a 4 días a través de VS Express 👈
				<?php endif; ?>
				<?php if($tipoEntrega == "envioregionporpagar") : ?>
					<strong>¡Importante!</strong>
					<?php if ($tipoEntregaRegion == "domicilio") : ?>
						El envío se realizará al domilicio que ingresaste dentro de 3 a 4 días a través de Starken 👈.
						Recuerda, el valor del envío <strong>lo pagas al recibir</strong> 👈
					<?php endif; ?>
					<?php if ($tipoEntregaRegion != "domicilio") : ?>
						Starken te enviara un correo electrónico para que realices el seguimiento.
						Recuerda que el envío <strong>debe ser pagado</strong> una vez que lo retires en la sucursal que nos indicaste.👈
					<?php endif; ?>
				<?php endif; ?>
		</div>
	<?php
}

// remover metadata que viene por defecto en el email
add_action( 'woocommerce_email_order_meta', 'remover_medatada_pordefecto', 9 );
function remover_medatada_pordefecto() {
    remove_action('woocommerce_email_order_meta', 'woocommerce_email_order_meta', 10, 2);
}

// luego de eliminar el metadata por defecto, agregar la metadata necesaria al email
add_action( 'woocommerce_email_customer_details', 'meta_email_action', 10, 3 );
function meta_email_action($order_obj, $sent_to_admin, $plain_text) {
	// https://rudrastyh.com/woocommerce/order-meta-in-emails.html
	?>
	<h3>Información personal:</h3>
	<div style="padding: 0px 10px; margin: 0px 0px -9px 6px;">
		rut: <strong><?php echo get_post_meta( $order_obj->get_order_number(), 'billing_rut', true ); ?></strong>
	</div>
	<?php
}

