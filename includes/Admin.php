<?php

namespace SheetWise;

use SheetWise\Traits\ContainerTrait;

class Admin {
	use ContainerTrait;

	/**
	 * Admin constructor.
	 */
	public function __construct() {
		$this->container['menu']      = new Admin\Menu();
		$this->container['settings']  = new Admin\Settings();
		$this->container['dashboard'] = new Admin\Dashboard();
	}
}
