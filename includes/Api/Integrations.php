<?php

namespace SheetWise\Api;

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

		if ( property_exists( $integration, 'edit_single' ) && $integration->edit_single ) {
			if ( ! $integration->id || ! $integration->row_name || ! $integration->value ) {
				return $this->error_response( new \WP_Error( 'invalid_json', 'Invalid JSON' ) );
			}

			return $this->edit_single_row( $integration->id, $integration->row_name, $integration->value );
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
		$source       = $integration->source ? sanitize_text_field( $integration->source ) : '';
		$data_sources = is_array( $integration->data_sources ) ? $integration->data_sources : [];

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

		update_post_meta( $integration_id, swise_get_hook_meta_key(), $source );

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
				'posts_per_page' => - 1,
				'post_status'    => [ 'publish', 'draft' ],
			]
		);

		$items = [];

		foreach ( $integrations as $integration ) {
			$items[] = [
				'id'          => $integration->ID,
				'title'       => $integration->post_title,
				'post_status' => $integration->post_status,
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
	 * Edit a single row
	 *
	 * @since 1.0.0
	 *
	 * @param int    $integration_id
	 * @param string $row_name
	 * @param string $value
	 *
	 * @return \WP_REST_Response
	 */
	private function edit_single_row( $integration_id, $row_name, $value ) {
		$integration_id = wp_update_post(
			[
				$row_name => $value,
				'ID'      => $integration_id,
			]
		);

		if ( is_wp_error( $integration_id ) ) {
			return $this->error_response( $integration_id );
		}

		return rest_ensure_response(
			[
				'code'    => 200,
				'message' => sprintf(
					// translators: %s: DB row name
					__( '%s updated successfully', 'sheet-wise' ),
					$row_name
				),
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
