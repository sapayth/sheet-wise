<?php

namespace SheetWise\Integrations;

class WooCommerce {
    public function __construct() {
        add_filter( 'swise_integration_data_sources', [ $this, 'add_wc_data_sources' ] );
        add_filter( 'swise_integration_data_source_events', [ $this, 'add_wc_data_source_events' ] );

        $hooks = $this->get_wc_data_sources();

        foreach ( $hooks as $hook => $value ) {
            $num_of_args = ! empty( $value['num_of_args'] ) ? $value['num_of_args'] : 1;

            if ( 'woocommerce_update_product' === $hook ) {
                add_action( 'edit_post', [ $this, 'woocommerce_update_product' ], 10, $num_of_args );
            } else if ( 'woocommerce_delete_product' === $hook ) {
                add_action( 'before_delete_post', [ $this, 'woocommerce_delete_product' ], 10, $num_of_args );
            } else {
                add_action( $hook, [ $this, $hook ], 10, $num_of_args );
            }
        }
    }

    /**
     * Add WooCommerce data source events
     *
     * @param array $events
     *
     * @return array
     */
    public function add_wc_data_source_events( $events ) {
        $wc_events = apply_filters(
            'swise_wc_data_source_events', [
                'woocommerce_new_product'      => array_merge(
                    $this->common_product_data(), [
                        'slug'       => [
                            'label' => __( 'Slug', 'sheet-wise' ),
                            'type'  => 'text',
                        ],
                        'date'       => [
                            'label' => __( 'Date Created', 'sheet-wise' ),
                            'type'  => 'date',
                        ],
                    ]
                ),
                'woocommerce_update_product'   => $this->common_product_data(),
                'woocommerce_delete_product'   => $this->common_product_data(),
                'woocommerce_update_order'     => $this->common_order_data(),
            ]
        );

        return array_merge( $events, $wc_events );
    }

    /**
     * Add WooCommerce data sources
     *
     * @param array $sources
     *
     * @return array
     */
    public function add_wc_data_sources( $sources ) {
        $integrations       = swise_get_settings_schema( 'integrations' );
        $saved_integrations = get_option( 'swise_settings_integrations' );

        $wc_hooks = $this->get_wc_data_sources();

        if ( ! empty( $integrations['fields'] ) ) {
            foreach ( array_keys( $integrations['fields'] ) as $integration ) {
                if ( ! empty( $saved_integrations[ $integration ] ) ) {
                    $sources = array_merge( $sources, $wc_hooks );
                }
            }
        }

        return $sources;
    }

    /**
     * Get WooCommerce hooks
     *
     * @return array
     */
    public function get_wc_data_sources() {
        return apply_filters( 'swise_integration_data_sources_wc',
            [
                'woocommerce_new_product'      => [
                    'label'       => __( 'WooCommerce New Product' ),
                    'num_of_args' => 2,
                ],
                'woocommerce_update_product'   => [
                    'label'       => __( 'WooCommerce Update Product' ),
                    'num_of_args' => 2,
                ],
                'woocommerce_delete_product'   => [
                    'label'       => __( 'WooCommerce Delete Product' ),
                ],
                'woocommerce_update_order'     => [
                    'label'       => __( 'WooCommerce Update Order' ),
                    'num_of_args' => 2,
                ],
            ]
        );
    }

    /**
     * Common product data
     *
     * @since SWISE_SINCE
     *
     * @return array
     */
    protected function common_product_data() {
        return [
            'product_id'    => [
                'label' => __( 'Product ID', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'post_title'    => [
                'label' => __( 'Name', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'post_content'  => [
                'label' => __( 'Product Details', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'post_name'     => [
                'label' => __( 'Slug', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'post_date'     => [
                'label' => __( 'Create Date', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'post_modified' => [
                'label' => __( 'Update Date', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'active_price'  => [
                'label' => __( 'Active Price', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'regular_price' => [
                'label' => __( 'Regular Price', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'sale_price'    => [
                'label' => __( 'Sale Price', 'sheet-wise' ),
                'type'  => 'text',
            ],
        ];
    }

    /**
     * Common order data
     *
     * @since SWISE_SINCE
     *
     * @return array
     */
    protected function common_order_data() {
        return [
            'order_id'     => [
                'label' => __( 'Order ID', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'order_status' => [
                'label' => __( 'Order Status', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'order_date'   => [
                'label' => __( 'Order Date', 'sheet-wise' ),
                'type'  => 'date',
            ],
            'order_total'  => [
                'label' => __( 'Order Total', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'total_tax'  => [
                'label' => __( 'Total Tax', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'currency'    => [
                'label' => __( 'Currency', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'shipping_total'   => [
                'label' => __( 'Shipping Total', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'order_key'   => [
                'label' => __( 'Order Key', 'sheet-wise' ),
                'type'  => 'text',
            ],
        ];
    }

    /**
     * Handle the WooCommerce new product hook
     *
     * @since 1.0.0
     *
     * @param int $product_id
     * @param object $product
     *
     * @return void
     */
    public function woocommerce_new_product( $product_id, $product ) {
        $hook            = 'woocommerce_new_product';
        $all_event_codes = swise_get_data_source_events();

        if ( ! array_key_exists( $hook, $all_event_codes ) ) {
            return;
        }

        // define hook name beforehand
        $creation_hook = 'sheetwise_scheduled_' . $hook;

        as_enqueue_async_action(
            $creation_hook,
            [
                'args' => [
                    'type'   => 'woocommerce',
                    'hook'   => $hook,
                    'values' => $product,
                    'id'     => $product_id,
                ],
            ],
            'swise_user',
            true
        );
    }

    /**
     * Handle the WooCommerce update product hook
     *
     * @since SWISE_SINCE
     *
     * @param int $product_id
     * @param object $post
     *
     * @return void
     */
    public function woocommerce_update_product( $product_id, $post ) {
        $hook            = 'woocommerce_update_product';
        $all_event_codes = swise_get_data_source_events();

        if ( ! array_key_exists( $hook, $all_event_codes ) ) {
            return;
        }

        $wc_product = wc_get_product( $product_id );

        if ( ! $wc_product instanceof \WC_Product ) {
            return;
        }

        $post->product_id    = $wc_product->get_id();
        $post->name          = $wc_product->get_name();
        $post->slug          = $wc_product->get_slug();
        $post->active_price  = $wc_product->get_price();
        $post->regular_price = $wc_product->get_regular_price();
        $post->sale_price    = $wc_product->get_sale_price();

        // define hook name beforehand
        $creation_hook = 'sheetwise_scheduled_' . $hook;

        as_enqueue_async_action(
            $creation_hook,
            [
                'args' => [
                    'type'   => 'woocommerce',
                    'hook'   => $hook,
                    'values' => $post,
                    'id'     => $product_id,
                ],
            ],
            'swise_user',
            true
        );
    }

    /**
     * @since SWISE_SINCE
     *
     * @param $product_id
     *
     * @return void
     */
    public function woocommerce_delete_product( $product_id ) {
        $hook = 'woocommerce_delete_product';
        $post = get_post( $product_id );

        if ( ! $post instanceof \WP_Post ) {
            return;
        }

        if ( 'product' !== $post->post_type ) {
            return;
        }

        $wc_product = wc_get_product( $product_id );

        if ( ! $wc_product instanceof \WC_Product ) {
            return;
        }

        $post->product_id    = $wc_product->get_id();
        $post->name          = $wc_product->get_name();
        $post->slug          = $wc_product->get_slug();
        $post->active_price  = $wc_product->get_price();
        $post->regular_price = $wc_product->get_regular_price();
        $post->sale_price    = $wc_product->get_sale_price();

        // define hook name beforehand
        $creation_hook = 'sheetwise_scheduled_' . $hook;

        as_enqueue_async_action(
            $creation_hook,
            [
                'args' => [
                    'type'   => 'woocommerce',
                    'hook'   => $hook,
                    'values' => $post,
                    'id'     => $product_id,
                ],
            ],
            'swise_user',
            true
        );
    }

    /**
     * Handle the WooCommerce update order hook
     *
     * @since SWISE_SINCE
     *
     * @param int $order_id
     * @param object $order
     *
     * @return void
     */
    public function woocommerce_update_order( $order_id, $order ) {
        $hook = 'woocommerce_update_order';

        if ( ! $order instanceof \WC_Order ) {
            return;
        }

        $order_data = [
            'order_id'       => $order->get_id(),
            'order_status'   => $order->get_status(),
            'order_date'     => $order->get_date_created()->date_i18n(),
            'order_total'    => $order->get_total(),
            'total_tax'      => $order->get_total_tax(),
            'currency'       => $order->get_currency(),
            'shipping_total' => $order->get_shipping_total(),
            'order_key'      => $order->get_order_key(),
        ];

        // define hook name beforehand
        $creation_hook = 'sheetwise_scheduled_' . $hook;

        as_enqueue_async_action(
            $creation_hook,
            [
                'args' => [
                    'type'   => 'woocommerce',
                    'hook'   => $hook,
                    'values' => $order_data,
                    'id'     => $order_id,
                ],
            ],
            'swise_user',
            true
        );
    }
}
