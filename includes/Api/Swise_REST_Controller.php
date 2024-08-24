<?php

namespace SheetWise\Api;

class Swise_REST_Controller extends \WP_REST_Controller {
	/**
	 * The namespace of this controller's route.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $namespace = 'swise/v1';

	/**
	 * Check permission for settings
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return bool
	 */
	public function permission_check() {
		return current_user_can( swise_get_admin_capability() );
	}
}
