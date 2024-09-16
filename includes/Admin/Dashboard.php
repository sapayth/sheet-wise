<?php

namespace SheetWise\Admin;

class Dashboard {
	public function __construct() {
		add_action( 'swise_load_dashboard', 'swise_remove_admin_notices' );
		add_action( 'swise_load_dashboard', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * Enqueue scripts
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'swise-dashboard' );
		wp_enqueue_style( 'swise-dashboard' );

		wp_localize_script(
			'swise-dashboard',
			'swiseDashboard',
			[
				'nonce'       => wp_create_nonce( 'wp_rest' ),
				'version'     => SWISE_VERSION,
				'restURL'     => rest_url( 'swise/v1' ),
				'pageURL'     => admin_url( 'admin.php?page=sheet-wise' ),
				'dataSources' => swise_get_data_sources(),
				'dataEvents'  => get_data_source_events(),
			]
		);
	}


}
