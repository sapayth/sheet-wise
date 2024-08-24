<?php

namespace SheetWise;

use SheetWise\Api\Integrations;
use SheetWise\Api\Settings;
use SheetWise\Api\Sheet;
use WeDevs\WpUtils\ContainerTrait;

class Api {
	use ContainerTrait;

	public function __construct() {
		$this->container['settings']     = new Settings();
		$this->container['sheet']        = new Sheet();
		$this->container['integrations'] = new Integrations();

		add_action( 'rest_api_init', [ $this, 'init_api' ] );
	}

	public function init_api() {
		foreach ( $this->container as $class ) {
			$object = new $class();
			$object->register_routes();
		}
	}
}