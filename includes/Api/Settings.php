<?php

namespace SheetWise\Api;

use SheetWise\Traits\RestResponseError;
use WP_REST_Server;

class Settings extends Swise_API {

	use RestResponseError;

	/**
	 * Route name
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $base = 'settings';

	/**
	 * Register routes
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->base,
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_items' ],
					'permission_callback' => [ $this, 'permission_check' ],
				],
				[
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'update_items' ],
					'permission_callback' => [ $this, 'permission_check' ],
					'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::EDITABLE ),
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Update settings
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function update_items( $request ) {
		$credential = $request->get_param( 'credentialJson' );

		if ( is_null( $credential ) ) {
			return rest_ensure_response(
				[
					'code'    => 400,
					'message' => __( 'Credential is required', 'sheet-wise' ),
				]
			);
		}

		apply_filters( 'swise_before_update_credential', $credential );

		update_option( 'swise_service_account_credential', sanitize_textarea_field( $credential ) );

		apply_filters( 'swise_after_update_credential', $credential );

		return rest_ensure_response(
			[
				'code'       => 200,
				'message'    => __( 'Credential updated successfully', 'sheet-wise' ),
				'credential' => $credential,
			]
		);
	}

	/**
	 * Retrieves a collection of settings
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function get_items( $request ) {
		$credential = get_option( 'swise_service_account_credential' );

		$settings = [
			'code'       => 200,
			'credential' => wp_kses_post( $credential ),
		];

		return rest_ensure_response( $settings );
	}
}
