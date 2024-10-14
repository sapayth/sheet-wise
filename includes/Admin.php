<?php

namespace SheetWise;

use WeDevs\WpUtils\ContainerTrait;

class Admin {
	use ContainerTrait;

	public function __construct() {
		$this->container['menu']      = new Admin\Menu();
		$this->container['settings']  = new Admin\Settings();
		$this->container['dashboard'] = new Admin\Dashboard();
	}
}
