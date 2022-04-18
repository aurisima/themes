<?php
/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="woocommerce-order">
	
	<?php
	$tipoEntrega = null;
	$tipoEntregaRegion = null;
	$order_data = $order->get_data(); // The Order data
	// echo '<pre>' , var_dump($order_data['meta_data']) , '</pre>'; exit;
	foreach ($order_data['meta_data'] as $orderItem) {
		if ($orderItem->key == '_billing_tipo_entrega') $tipoEntrega = $orderItem->value;
	}
	
	if ($tipoEntrega == "envioregionporpagar") {
		foreach ($order_data['meta_data'] as $orderItem) {
			if ($orderItem->key == '_billing_opciones_region') $tipoEntregaRegion = $orderItem->value;
		}
	}

	if ( $order ) :

		do_action( 'woocommerce_before_thankyou', $order->get_id() );
		?>

		<?php if ( $order->has_status( 'failed' ) ) : ?>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed"><?php esc_html_e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce' ); ?></p>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">
				<a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="button pay"><?php esc_html_e( 'Pay', 'woocommerce' ); ?></a>
				<?php if ( is_user_logged_in() ) : ?>
					<a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" class="button pay"><?php esc_html_e( 'My account', 'woocommerce' ); ?></a>
				<?php endif; ?>
			</p>

		<?php else : ?>
			<div id="mensaje-agradecimiento">
				<h1 class="titulo-pago-final">
				¡Gracias por comprar en <strong>Aurísima</strong>! 😃 ✅ <?php // echo $order->_billing_tipo_entrega; ?>
				</h1>
				<p>
					"El producto que tendrás en tus manos, está hecho para ti. Fue elaborado a mano y con mucho <strong>cariño</strong>, con el <strong>propósito</strong> de <strong>cuidarte</strong> y brindarte <strong>comodidad</strong>, <strong>estilo</strong> y los <strong>colores</strong> que tus turnos merecen <i class="fas fa-heart"></i>"
				</p>
				<p>
					🙏 "¡Por favor no olvides compartir una foto en tus redes sociales y etiquetarnos! Sigue nuestro <a href="https://www.instagram.com/uniformesclinicos.aurisima/" target="_blank">Instagram</a> para que no te pierdas lo que se viene!"
				</p>
				<p id="firma">
					"Me despido muy agradecida. Fernanda."
				</p>
			</div>
			<div id="mensaje-tipo-entrega-pagina-exito">
				<?php if($tipoEntrega == "retiroenbodega") : ?>
					<strong>¡Importante!</strong> Coordina tu retiro escribiéndole al número <a href="https://wa.me/56982896371">+56 9 8289 6371</a> 👈. Retira <strong>gratis</strong> desde mañana en <a href="https://goo.gl/maps/43bkqfXe5iDx2rMg9" target="_blank">Argomedo #320, Santiago (ver en mapa <i class="fas fa-map-marked-alt color-primario"></i>)</a>.
				<?php endif; ?>
				<?php if($tipoEntrega == "enviodomiciliorm") : ?>
					<strong>¡Importante!</strong> El pedido te llegará al domilicio que ingresaste dentro de 3 a 4 días a través de VS Express  👈
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
			<a href="/" class="seguir-comprando-pago-final">
			 Seguir comprando
			</a>
			
			
			<!-- <div class="woocommerce-message" role="alert">Transacción aprobada</div> -->
			<?php do_action( 'woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id() ); ?>
			<?php do_action( 'woocommerce_thankyou', $order->get_id() ); ?>
			
			<!--<a href="/" class="titulo-ticket">Guardar esta página</a>-->
			<ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">

				<li class="woocommerce-order-overview__order order">
					<?php esc_html_e( 'Order number:', 'woocommerce' ); ?>
					<strong><?php echo $order->get_order_number(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
				</li>

				<li class="woocommerce-order-overview__date date">
					<?php esc_html_e( 'Date:', 'woocommerce' ); ?>
					<strong><?php echo wc_format_datetime( $order->get_date_created() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
				</li>

				<?php if ( is_user_logged_in() && $order->get_user_id() === get_current_user_id() && $order->get_billing_email() ) : ?>
					<li class="woocommerce-order-overview__email email">
						<?php esc_html_e( 'Email:', 'woocommerce' ); ?>
						<strong><?php echo $order->get_billing_email(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
					</li>
				<?php endif; ?>

				<li class="woocommerce-order-overview__total total">
					<?php esc_html_e( 'Total:', 'woocommerce' ); ?>
					<strong><?php echo $order->get_formatted_order_total(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
				</li>

				<?php if ( $order->get_payment_method_title() ) : ?>
					<li class="woocommerce-order-overview__payment-method method">
						<?php esc_html_e( 'Payment method:', 'woocommerce' ); ?>
						<strong><?php echo wp_kses_post( $order->get_payment_method_title() ); ?></strong>
					</li>
				<?php endif; ?>

			</ul>

	<?php endif; ?>

	<?php else : ?>

		<p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"><?php echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woocommerce' ), null ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>

	<?php endif; ?>

</div>
