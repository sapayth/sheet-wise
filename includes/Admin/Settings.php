<?php

namespace SheetWise\Admin;

class Settings {
	public function __construct() {
		add_action( 'swise_load_settings', 'swise_remove_admin_notices' );
		add_action( 'swise_load_settings', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * Enqueue scripts
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'swise-settings' );
		wp_enqueue_style( 'swise-settings' );

		wp_localize_script(
			'swise-settings',
			'swiseSettings',
			[
				'nonce'    => wp_create_nonce( 'wp_rest' ),
				'version'  => SWISE_VERSION,
				'restURL'  => rest_url( 'swise/v1' ),
				'pageURL'  => admin_url( 'admin.php?page=sheet-wise-settings' ),
				'assetURL' => SWISE_ASSET_URL,
				'settings' => swise_get_settings_schema(),
			]
		);
	}

	/**
	 * Remove admin notices for this page
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function remove_admin_notices() {
		global $wp_filter;
		// Check if the WP_Admin_Bar exists, as it's not available on all admin pages.
		if ( isset( $wp_filter['admin_notices'] ) ) {
			// Remove all actions hooked to the 'admin_notices' hook.
			unset( $wp_filter['admin_notices'] );
		}
	}
}
