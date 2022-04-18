<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

?>
<header class="woocommerce-products-header">
	<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
		<h1 class="woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>
	<?php endif; ?>

	<?php
	/**
	 * Hook: woocommerce_archive_description.
	 *
	 * @hooked woocommerce_taxonomy_archive_description - 10
	 * @hooked woocommerce_product_archive_description - 10
	 */
	do_action( 'woocommerce_archive_description' );
	?>
	
	<!-- boton filtrar que aparece en vista mobile -->
	<button id="btn-abrir-filtro" class="button abrir-filtro btn-defecto">Filtrar</button>
	<div class="fondo-cerrar-filtro">
	  <span class="cerrar-filtro cerrar-modal"><i class="fas fa-times"></i></span>
	</div>
	<!-- fin boton filtrar que aparece en vista mobile -->
</header>


<!-- mensaje sin resultados -->
			<div id='sin-resultados' class="sin-resultados">
				<div class='mensaje'>
					No encontramos nada relacionado a lo que buscaste 😭 pero te podrían interesar estos: 🥺
				</div>
				<div>
					<ul class="products-sin-resultados columns-3">

<li class="product type-product post-1034 status-publish first instock product_cat-gorros has-post-thumbnail shipping-taxable purchasable product-type-simple">
	<a href="https://aurisima.cl/producto/miranda/" class="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img width="324" height="324" src="https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-324x324.webp" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="gorro clinico aurisima modelo miranda color amarilla tela poliester elasticada" loading="lazy" srcset="https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-324x324.webp 324w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-300x300.webp 300w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-1024x1024.webp 1024w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-150x150.webp 150w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-768x768.webp 768w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-1536x1536.webp 1536w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-416x416.webp 416w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1-100x100.webp 100w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-miranda-color-amarillo-tela-poliester-elasticada-1.webp 2000w" sizes="(max-width: 324px) 100vw, 324px"><h2 class="woocommerce-loop-product__title">Miranda</h2>
	<span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>5.000</bdi></span></span>
</a><a href="?add-to-cart=1034" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="1034" data-product_sku="miranda" aria-label="Añade “Miranda” a tu carrito" rel="nofollow">Añadir al carrito</a>
</li>
						
<li class="product type-product post-1013 status-publish instock product_cat-gorros has-post-thumbnail shipping-taxable purchasable product-type-simple">
	<a href="https://aurisima.cl/producto/sandra/" class="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img width="324" height="324" src="https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-324x324.png" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset="https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-324x324.png 324w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-300x300.png 300w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-1024x1024.png 1024w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-150x150.png 150w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-768x768.png 768w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-1536x1536.png 1536w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-416x416.png 416w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1-100x100.png 100w, https://aurisima.cl/wp-content/uploads/2022/01/PhotoRoom-20210927_180709_1.png 2000w" sizes="(max-width: 324px) 100vw, 324px"><h2 class="woocommerce-loop-product__title">Sandra</h2>
	<span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>5.000</bdi></span></span>
</a><a href="?add-to-cart=1013" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="1013" data-product_sku="sandra" aria-label="Añade “Sandra” a tu carrito" rel="nofollow">Añadir al carrito</a></li>

<li class="product type-product post-1024 status-publish last instock product_cat-gorros has-post-thumbnail shipping-taxable purchasable product-type-simple">
	<a href="https://aurisima.cl/producto/ana/" class="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img width="324" height="324" src="https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-324x324.webp" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="o clinico aurisima modelo ana color menta tela poliester elasticada" loading="lazy" srcset="https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-324x324.webp 324w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-300x300.webp 300w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-1024x1024.webp 1024w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-150x150.webp 150w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-768x768.webp 768w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-1536x1536.webp 1536w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-416x416.webp 416w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1-100x100.webp 100w, https://aurisima.cl/wp-content/uploads/2022/01/gorro-clinico-aurisima-modelo-ana-color-verde-tela-poliester-elasticada-1.webp 2000w" sizes="(max-width: 324px) 100vw, 324px"><h2 class="woocommerce-loop-product__title">Ana</h2>
	<span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>5.000</bdi></span></span>
</a><a href="?add-to-cart=1024" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="1024" data-product_sku="ana" aria-label="Añade “Ana” a tu carrito" rel="nofollow">Añadir al carrito</a>
</li>
</ul>
</div>
				<?php // echo do_shortcode('[products ids="1024, 1025, 1013"]'); ?>
			</div>
<!-- fin mensaje sin resultados -->
<?php
if ( woocommerce_product_loop() ) {

	/**
	 * Hook: woocommerce_before_shop_loop.
	 *
	 * @hooked woocommerce_output_all_notices - 10
	 * @hooked woocommerce_result_count - 20
	 * @hooked woocommerce_catalog_ordering - 30
	 */
	do_action( 'woocommerce_before_shop_loop' );

	woocommerce_product_loop_start();

	if ( wc_get_loop_prop( 'total' ) ) {
		while ( have_posts() ) {
			the_post();

			/**
			 * Hook: woocommerce_shop_loop.
			 */
			do_action( 'woocommerce_shop_loop' );

			wc_get_template_part( 'content', 'product' );
		}
	}

	woocommerce_product_loop_end();

	/**
	 * Hook: woocommerce_after_shop_loop.
	 *
	 * @hooked woocommerce_pagination - 10
	 */
	do_action( 'woocommerce_after_shop_loop' );
} else {
	/**
	 * Hook: woocommerce_no_products_found.
	 *
	 * @hooked wc_no_products_found - 10
	 */

	do_action( 'woocommerce_no_products_found' );
}

/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'woocommerce_after_main_content' );

/**
 * Hook: woocommerce_sidebar.
 *
 * @hooked woocommerce_get_sidebar - 10
 */
do_action( 'woocommerce_sidebar' );

get_footer( 'shop' );
