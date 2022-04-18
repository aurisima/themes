<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package storefront
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
	<!-- Hotjar Tracking Code for https://aurisima.cl -->
	<script>
		(function(h,o,t,j,a,r){
			h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
			h._hjSettings={hjid:2840868,hjsv:6};
			a=o.getElementsByTagName('head')[0];
			r=o.createElement('script');r.async=1;
			r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
			a.appendChild(r);
		})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
	</script>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>

<?php do_action( 'storefront_before_site' ); ?>

<div id="page" class="hfeed site">
	<?php do_action( 'storefront_before_header' ); ?>

	<header id="masthead" class="site-header" role="banner" style="<?php storefront_header_styles(); ?>">
		<div id="content-menu">
			<div id="fondo-tipo-entrega-popup"></div>
			
			<!-- buscador -->
			<div
				 id="icono-buscador"
				 onClick='abrirModal("modal-buscador")'
				 class="icono-buscador-mobile"
				>
				<i class="fas fa-search"></i>
			</div>
			<div
				 id="icono-buscador"
				 class="icono-buscador-desktop"
				>
				<form action="/" method="get">
					<input type="text" id="input-buscador-header" placeholder='Busca por ej. "Azul", "Enfermeras"' name="s-filter" class="input-1" value="">
					<button id="boton-buscar" class="btn-principal" type="submit"><i class="fas fa-search"></i></button>
				</form>
			</div>
			
			<div id='modal-buscador' class='modal' onClick='clickModal("modal-buscador")'>
				<div class='contenido-modal'
					 onmouseover='encimaContenidoModal()'
					 onmouseleave='saleDelContenidoModal()'
					 >
					<form action="/" method="get">
					  	<label for="fname">Buscar productos:</label>
						<?php 
							$texto = $_GET['s-filter'];
				
						?>
					  	<input 
							type="text" 
							id="fname" 
							placeholder="Ej. Modelo paola, unifomes azules, etc." 
							name="s-filter" 
							class="input-1"
							value="<?php echo $texto; ?>"
						>
						<div id="busquedas-populares">
							<span>Búsquedas populares:</span>
							<a href="https://aurisima.cl/?s-filter=uniforme" class='enlace color-primario'>Uniformes</a>
							<a href="https://aurisima.cl/?s-filter=jacinta" class='enlace color-primario'>Gorro Jacinta</a>
							<a href="https://aurisima.cl/?s-filter=paola" class='enlace color-primario'>Gorro Paola</a>
						</div>
						<button id="boton-buscar" class="btn-principal" type="submit"><i class="fas fa-search"></i></button>
					</form>
					<span class='cerrar-modal' onClick='cerrarModal("modal-buscador")'><i class="fas fa-times"></i></span>
				</div>
			</div>
			<!-- fin buscador -->
			
			
			<div id="content-logo">
				<a 
				   href="/"
				   title="Aurísima - uniformes clínicos, gorros, cofias, mascarillas, porta credenciales y más!"
				   hreflang="es"
				   lang="es"
				   rel="author"
				   target="_self">
					<img
						 src="http://aurisima.cl/wp-content/uploads/2022/02/logo-letras-aurisima-uniformes-gorros-portacredenciales-mascarillas-09.png"
						 longdesc="https://aurisima.cl"
						 alt="Aurísima - uniformes clínicos, gorros, cofias, mascarillas, porta credenciales y más!"
					/>
				</a>
			</div>
			<div id="options-menu">
				<?php
				/**
				 * Functions hooked into storefront_header action
				 *
				 * @hooked storefront_header_container                 - 0
				 * @hooked storefront_skip_links                       - 5
				 * @hooked storefront_social_icons                     - 10
				 * @hooked storefront_site_branding                    - 20
				 * @hooked storefront_secondary_navigation             - 30
				 * @hooked storefront_product_search                   - 40
				 * @hooked storefront_header_container_close           - 41
				 * @hooked storefront_primary_navigation_wrapper       - 42
				 * @hooked storefront_primary_navigation               - 50
				 * @hooked storefront_header_cart                      - 60
				 * @hooked storefront_primary_navigation_wrapper_close - 68
				 */
				do_action( 'storefront_header' );
				?>
			</div>
		</div>
	</header><!-- #masthead -->
	
	<?php
	/**
	 * Functions hooked in to storefront_before_content
	 *
	 * @hooked storefront_header_widget_region - 10
	 * @hooked woocommerce_breadcrumb - 10
	 */
	do_action( 'storefront_before_content' );
	?>
	
	<div id="content" class="site-content" tabindex="-1">
		<?php
		// OJO: si esta en el inicio, muestra el slider
		/* if (is_front_page() or is_home()) echo do_shortcode('[smartslider3 slider="2"]'); */
		?>
		<!-- cambiar tipo de entrega -->
		<div class="col-full">
			<div id="feature-tipo-entrega">
				<div id="cambiar-tipo-entrega-header"><span>Elige el tipo de entrega o envío 🚚</span></div>
				
				<div id="tipo-entrega-popup">
					<div id='costos-tipodeentrega-popup'>
						<span id="cerrar-popup-entrega" onclick='toggleOpcionesEntrega()'><i class="fas fa-times"></i></span>
						<h3 class="titulo-3">
							Elije un tipo de entrega:
						</h3>
						<!--
						<div id="item-tipodeentrega-retiro" class="item-tipodeentrega">
							<label for="retiroenbodega-popup">
								<i class="fas fa-store"></i>
								<span class="mensaje-tipoentrega"><strong>Retira gratis</strong> en Argomedo #320, Santiago</span>
								<span class="precio-tipoentrega">Gratis</span>
							</label>
							<input
								   type="radio"
								   value="retiroenbodega"
								   id="retiroenbodega-popup"
								   data-price="0"
								   name="tipodeentrega-popup"
							/>
						</div>
						-->
						<div id="item-tipodeentrega-rm" class="item-tipodeentrega">
							<label for="enviodomiciliorm-popup">
								<i class="fas fa-shipping-fast"></i>
								<span class="mensaje-tipoentrega"><strong>Envío en 3 o 4 días</strong> Región Metropolitana</span>
								<span class="precio-tipoentrega">$3.500</span>
							</label>
							<input 
								   type="radio" 
								   value="enviodomiciliorm"
								   id="enviodomiciliorm-popup"
								   data-price="3500"
								   name="tipodeentrega-popup"
								   
							/>
						</div>
						<div id="item-tipodeentrega-region" class="item-tipodeentrega">
							<label for="envioregionporpagar-popup">
								<i class="fas fa-shipping-fast"></i>
								<span class="mensaje-tipoentrega"><strong>Envío por Starken en 4 a 5 días</strong> a Regiones</span>
								<span class="precio-tipoentrega">Por pagar</span>
							</label>
							<input
								   type="radio"
								   value="envioregionporpagar"
								   id="envioregionporpagar-popup"
								   data-price="0"
								   name="tipodeentrega-popup"
							/>
						</div>
						<button onclick="cambiarTipoEntregaPopup();" class="btn-defecto btn-guardar-opcion-retiro button">
							Seleccionar
						</button>
					</div>
				</div>
			</div>
			<!-- fin cambiar tipo de entrega -->
			
			<?php
			// muestra las categorias de productos
			if (is_front_page() or is_home()) { ?>
			<?php // OJO: sacar el margin-top cuando se muestre el slider ?>
			<h3 id="titulo-categorias" style="margin-top: 170px;">
				Nuestras categorías:
			</h3>
			<ul class="lista-categorias">
				<li>
					<a href="https://aurisima.cl/categorias/uniformes-clinicos-top-estampados/">
						<img
							 width="60"
							 height="60"
							 src="http://aurisima.cl/wp-content/uploads/2022/02/uniforme-clinico-aurisima-modelo-javierita-color-rosa-flores.webp"
							 alt="Top Estampados Uniformes Clínicos Aurísima"
							 title="Top Estampados Uniformes Clínicos Aurísima"
						/>
						<strong><span class="enlace color-primario">Top Estampados</span></strong>
					</a>
				</li>
				<li>
					<a href="https://aurisima.cl/categorias/uniformes-clinicos-top-lisos/">
						<img
							 width="60"
							 height="60"
							 src="http://aurisima.cl/wp-content/uploads/2022/02/uniforme-clinico-aurisima-modelo-damarys-color-lila-liso.webp"
							 alt="Top Lisos Uniformes Clínicos Aurísima"
							 title="Top Lisos Uniformes Clínicos Aurísima"
						/>
						<strong><span class="enlace color-primario">Top Lisos</span></strong>
					</a>
				</li>
				<li>
					<a href="https://aurisima.cl/categorias/gorros">
						<img
							 width="60"
							 height="60"
							 src="http://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-javierita-color-blanco-tela-poliester-elasticada-1.webp"
							 alt="Gorros clínicos Aurísima"
							 title="Gorros clínicos Aurísima"
						/>
						<strong><span class="enlace color-primario">Gorros</span></strong>
					</a>
				</li>
				<li>
					<a href="https://aurisima.cl/categorias/lanyards">
						<img
							 width="60"
							 height="60"
							 src="http://aurisima.cl/wp-content/uploads/2022/02/lanyard-porta-credencial-aurisima-modelo-javierita-color-rosado-cinta-poliester-1.webp"
							 alt="Lanyards Aurísima"
							 title="Lanyards Aurísima"
						/>
						<strong><span class="enlace color-primario">Lanyards</span></strong>
					</a>
				</li>
				<li>
					<a href="https://aurisima.cl/categorias/pantalones/">
						<img
							 id="imagenes-pantalones-categoria"
							 width="60"
							 height="60"
							 src="http://aurisima.cl/wp-content/uploads/2022/03/pantalones-clinicos-mujer-lisos-aurisima.webp"
							 alt="Pantalones Clínicos Mujer - Aurísima"
							 title="Pantalones Clínicos Mujer - Aurísima"
						/>
						<strong><span class="enlace color-primario">Pantalones</span></strong>
					</a>
				</li>
			</ul>
			
			<?php
			} // fin de categorias de productos
			?>
			<a id="consultas-whatsapp" class='whatsapp' target='_blank' href="https://wa.me/56988135861"><i class="fab fa-whatsapp"></i><span>Consultas aquí</span></a>

		<?php
		do_action( 'storefront_content_top' );
