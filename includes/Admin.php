<?php

namespace SheetWise;

use WeDevs\WpUtils\ContainerTrait;

class Admin {
	use ContainerTrait;

	public function __construct() {
		$this->menu      = new Admin\Menu();
		$this->settings  = new Admin\Settings();
		$this->dashboard = new Admin\Dashboard();
	}
}
