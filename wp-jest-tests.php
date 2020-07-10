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

define( 'WP_JEST_TESTS_VERSION', '1.0.0' );

add_action( 'wp_enqueue_scripts', 'wp_jest_tests_scripts' );

function wp_jest_tests_scripts() {
    $initial_state = rawurlencode( wp_json_encode( array(
        'restUrl' => esc_url_raw( rest_url() ),
        'posts'   => 5,
    ) ) );

    wp_enqueue_style( 
		'wp-jest-tests',
		plugins_url( 'css/front.css', __FILE__ ),
		array(),
		WP_JEST_TESTS_VERSION
	);
    
    wp_enqueue_script( 
		'wp-jest-tests',
		plugins_url( 'js/front.js', __FILE__ ),
		array(),
		WP_JEST_TESTS_VERSION,
		true
	);

	wp_add_inline_script(
		'wp-jest-tests',
		'window.wpJestTests = JSON.parse(decodeURIComponent("' . $initial_state . '"));',
		'before'
    );
}