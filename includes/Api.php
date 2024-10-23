<?php

namespace SheetWise;

use SheetWise\Api\Integrations;
use SheetWise\Api\Settings;
use SheetWise\Api\Sheet;
use SheetWise\Traits\ContainerTrait;

class Api {
	use ContainerTrait;

	/**
	 * Api constructor.
	 */
	public function __construct() {
		$this->container['settings']     = new Settings();
		$this->container['sheet']        = new Sheet();
		$this->container['integrations'] = new Integrations();

		add_action( 'rest_api_init', [ $this, 'init_api' ] );
	}

	/**
	 * Initialize API
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function init_api() {
		foreach ( $this->container as $class ) {
			$object = new $class();
			$object->register_routes();
		}
	}
}
