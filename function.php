<?php
function style_scripts() {
	wp_enqueue_style( 'main-style', get_stylesheet_uri() . '/style.css' . date('YmdHi'), array() );
}
//開発終了したらdateではなくversionにすること
//wp_enqueue_style( 'style-name', get_stylesheet_uri() . '/style.css', array(), '1.0.0', true );

add_action( 'wp_enqueue_scripts', 'style_scripts' );
?>
