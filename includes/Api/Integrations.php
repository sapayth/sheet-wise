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

		register_rest_route(
			$this->namespace,
			'/' . $this->base,
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_items' ],
					'permission_callback' => [ $this, 'permission_check' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->base . '/(?P<id>[\d]+)',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_item' ],
					'permission_callback' => [ $this, 'permission_check' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->base . '/(?P<id>[\d]+)',
			[
				[
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'update_item' ],
					'permission_callback' => [ $this, 'permission_check' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->base . '/(?P<id>[\d]+)',
			[
				[
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => [ $this, 'delete_item' ],
					'permission_callback' => [ $this, 'permission_check' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Delete an integration
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function delete_item( $request ) {
		$integration_id = $request->get_param( 'id' );

		$deleted = wp_delete_post( $integration_id );

		if ( ! $deleted ) {
			return $this->error_response( new \WP_Error( 'invalid_id', 'Invalid ID' ) );
		}

		return rest_ensure_response(
			[
				'code'    => 200,
				'success' => true,
				'message' => __( 'Integration deleted successfully', 'sheet-wise' ),
			]
		);
	}

	/**
	 * Update an integration
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function update_item( $request ) {
		$integration = json_decode( $request->get_body() );

		if ( ! $integration ) {
			return $this->error_response( new \WP_Error( 'invalid_json', 'Invalid JSON' ) );
		}
		$sanitized_rows  = [];
		$sanitized_event_codes  = [];
		$sanitized_data_sources = [];

		$title        = $integration->title ? sanitize_text_field( $integration->title ) : '';
		$source       = $integration->source ? sanitize_text_field( $integration->source ) : '';
		$data_sources = is_array( $integration->data_sources ) ? $integration->data_sources : [];
		$rows         = is_array( $integration->rows ) ? $integration->rows : [];
		$event_codes  = is_array( $integration->event_codes ) ? $integration->event_codes : [];

		$default_sources = swise_get_data_sources();

		if ( ! array_key_exists( $source, $default_sources ) ) {
			return $this->error_response( new \WP_Error( 'invalid_source', 'Invalid source' ) );
		}

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

		$integration_id = wp_update_post(
			[
				'post_name'    => 'swise-' . sanitize_title( $title ),
				'post_title'   => $title,
				'post_content' => wp_json_encode( $integration ),
				'post_type'    => swise_get_post_type(),
				'post_status'  => 'publish',
				'ID'           => $integration->id,
			]
		);

		if ( is_wp_error( $integration_id ) ) {
			return $this->error_response( $integration_id );
		}

		update_post_meta( $integration_id, swise_get_hook_meta_key(), $source );

		// define hook name beforehand
//		$creation_hook = 'sheetwise_sc_integration_update';
//
//		if ( false === as_next_scheduled_action( $creation_hook ) ) {
//			// enqueue the action
//			as_enqueue_async_action(
//				$creation_hook,
//				[
//					'hook'           => $integration->source,
//					'integration_id' => $integration_id,
//				]
//			);
//		}

		return rest_ensure_response(
			[
				'code'    => 200,
				'message' => __( 'Integration updated successfully', 'sheet-wise' ),
				'id'      => $integration_id,
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
				'post_type'    => swise_get_post_type(),
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
	 * Get list of integrations
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function get_items( $request ) {
		$integrations = get_posts(
			[
				'post_type'      => swise_get_post_type(),
				'posts_per_page' => -1,
			]
		);

		$items = [];

		foreach ( $integrations as $integration ) {
			$items[] = [
				'id'    => $integration->ID,
				'title' => $integration->post_title,
			];
		}

		return rest_ensure_response(
			[
				'code'    => 200,
				'success' => true,
				'files'   => $items,
			]
		);
	}

	/**
	 * Get a single integration
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function get_item( $request ) {
		$integration_id = $request->get_param( 'id' );

		$integration = get_post( $integration_id );

		if ( ! $integration ) {
			return $this->error_response( new \WP_Error( 'invalid_id', 'Invalid ID' ) );
		}

		return rest_ensure_response(
			[
				'code'        => 200,
				'success'     => true,
				'data'        => $integration,
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
