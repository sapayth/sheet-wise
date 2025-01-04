<?php

namespace SheetWise;

use SheetWise\Traits\ContainerTrait;

class Integrations {
    use ContainerTrait;

    public function __construct() {
        $this->container['woocommerce']  = new Integrations\WooCommerce();
    }
}