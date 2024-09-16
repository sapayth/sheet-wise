<?php

namespace SheetWise;

class Actions {
	public function __construct() {
		add_action( 'sheetwise_sc_integration_update', [ $this, 'integration_update' ] );
	}

	public function integration_update() {
		error_log( print_r( 'action to run after integration update', true ) );
	}
}
