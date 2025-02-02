<?php

namespace SheetWise\Api;

use SheetWise\Admin\GoogleSheet;
use WP_REST_Server;

class Sheet extends Swise_REST_Controller {
	/**
	 * Route name
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $base = 'sheets';

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
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->base . '/(?P<id>[\w-]+)/rows',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_item_rows' ],
					'permission_callback' => [ $this, 'permission_check' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Get list of sheets
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function get_items( $request ) {
		$sheet = new GoogleSheet();

		$files = [
			'code'    => 200,
			'success' => true,
			'files'   => $sheet->get_all(),
		];

		return rest_ensure_response( $files );
	}

	/**
	 * Get rows of a sheet
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function get_item_rows( $request ) {
		$sheet = new GoogleSheet();
		$id    = $request->get_param( 'id' );

		$rows = [
			'code'    => 200,
			'success' => true,
			'rows'   => $sheet->get_rows( $id ),
		];

		return rest_ensure_response( $rows );
	}
}
