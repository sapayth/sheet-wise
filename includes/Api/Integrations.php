<?php

namespace SheetWise\Api;

use SheetWise\Admin\GoogleSheet;
use WP_REST_Server;

class Integrations extends Swise_REST_Controller {
	/**
	 * Route name
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $base = 'integrations';

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
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'create_item' ],
					'permission_callback' => [ $this, 'permission_check' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Create a new integration
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function create_item( $request ) {
		$integration = json_decode( $request->get_body() );

		if ( ! $integration ) {
			return $this->error_response( new \WP_Error( 'invalid_json', 'Invalid JSON' ) );
		}
		$sanitized_rows  = [];
		$sanitized_event_codes  = [];
		$sanitized_data_sources = [];

		$title        = $integration->title ? sanitize_text_field( $integration->title ) : '';
		$rows         = is_array( $integration->rows ) ? $integration->rows : [];
		$event_codes  = is_array( $integration->event_codes ) ? $integration->event_codes : [];
		$data_sources = is_array( $integration->data_sources ) ? $integration->data_sources : [];

		foreach ( $rows as $row ) {
			$sanitized_rows[] = sanitize_text_field( $row );
		}

		foreach ( $event_codes as $event_code ) {
			$sanitized_event_codes[] = sanitize_text_field( $event_code );
		}

		foreach ( $data_sources as $data_source ) {
			$sanitized_data_sources[] = sanitize_text_field( $data_source );
		}

		$integration->rows         = $sanitized_rows;
		$integration->event_codes  = $sanitized_event_codes;
		$integration->data_sources = $sanitized_data_sources;

		$integration_id = wp_insert_post(
			[
				'post_name'    => 'swise-' . sanitize_title( $title ),
				'post_title'   => $title,
				'post_content' => wp_json_encode( $integration ),
				'post_type'    => swise_get_post_types(),
				'post_status'  => 'publish',
			]
		);

		if ( is_wp_error( $integration_id ) ) {
			return $this->error_response( $integration_id );
		}

		return rest_ensure_response(
			[
				'code'    => 200,
				'message' => __( 'Integration created successfully', 'sheet-wise' ),
				'id'      => $integration_id,
			]
		);
	}

	/**
	 * Error response
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_Error $error
	 *
	 * @return \WP_REST_Response
	 */
	public function error_response( $error ) {
		return rest_ensure_response(
			[
				'code'    => 400,
				'message' => $error->get_error_message(),
			]
		);
	}
}
