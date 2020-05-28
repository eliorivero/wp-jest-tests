<?php
/**
 * Plugin Name: WP Jest Tests
 * Plugin URI: https://startfunction.com/
 * Description: Sample JS tests with Jest.
 * Version: 1.0.0
 * Author: Elio Rivero
 * Author URI: https://startfunction.com
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', 'wp_jest_tests_scripts' );

function wp_jest_tests_scripts() {
    if ( ! function_exists( 'get_plugin_data' ) ) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    $plugin_version = get_plugin_data( __FILE__ )['Version'];

    $initial_state = rawurlencode( wp_json_encode( array(
        'restUrl' => esc_url_raw( rest_url() ),
        'posts'   => 5,
    ) ) );

    wp_enqueue_style( 
		'wp-jest-tests',
		plugins_url( 'front.css', __FILE__ ),
		array(),
		$plugin_version
	);
    
    wp_enqueue_script( 
		'wp-jest-tests',
		plugins_url( 'front.js', __FILE__ ),
		array(),
		$plugin_version,
		true
	);

	wp_add_inline_script(
		'wp-jest-tests',
		'window.wpJestTests = JSON.parse(decodeURIComponent("' . $initial_state . '"));',
		'before'
    );
}