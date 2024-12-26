<?php

namespace SheetWise\Api;

use SheetWise\Traits\RestResponseError;
use WP_REST_Server;

class Settings extends Swise_REST_Controller {

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
		$settings = $request->get_param( 'settings' );

		if ( is_null( $settings ) ) {
			return rest_ensure_response(
				[
					'code'    => 400,
					'message' => __( 'Nothing to store/update', 'sheet-wise' ),
				]
			);
		}

		$settings_schema = swise_get_settings_schema();

		foreach ( $settings as $key => $value ) {
			if ( ! isset( $settings_schema[ $key ] ) ) {
				continue;
			}

			$fields = $settings_schema[ $key ]['fields'];

			$data_to_store = [];

			foreach ( $fields as $field_key => $field_value ) {
				if ( ! isset( $value[ $field_key ] ) ) {
					continue;
				}

				$data_to_store[ $field_key ] = $value[ $field_key ];
			}

			apply_filters( 'swise_before_update_settings', $data_to_store, $key );
			apply_filters( 'swise_before_update_' . $key, $data_to_store );
			update_option( 'swise_settings_' . $key, $data_to_store );
			apply_filters( 'swise_after_update_' . $key, $data_to_store );
			apply_filters( 'swise_after_update_settings', $data_to_store, $key );
		}

		return rest_ensure_response(
			[
				'code'       => 200,
				'message'    => __( 'Settings updated successfully', 'sheet-wise' ),
				'credential' => $settings,
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
		$settings_schema = swise_get_settings_schema();
		$result = [];

		foreach ( $settings_schema as $key => $value ) {
			$option = get_option( 'swise_settings_' . $key );
			$fields = $value['fields'];

			foreach ($fields as $field_key => $field_value) {
				$result[ $key ][ $field_key ] = ! empty( $option[ $field_key ] ) ? $option[ $field_key ] : '';
			}
		}

		$settings = [
			'code'     => 200,
			'settings' => $result,
		];

		return rest_ensure_response( $settings );
	}
}
