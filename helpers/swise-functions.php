<?php
/**
 * Get the admin capability
 *
 * @since 1.0.0
 *
 * @return string
 */
function swise_get_admin_capability() {
    return apply_filters( 'swise_admin_capabilities', 'manage_options' );
}

/**
 * Settings schema
 *
 * @since 1.0.0
 *
 * @return array
 */
function swise_get_settings_schema( $section = '' ) {
    /**
     * Schema generates the settings UI too
     *
     * @since 1.0.0
     *
     * @param array       $schema                  {
     *                                             Array elements are for both REST schema and UI schema.
     *
     * @type string|array $show_if                 Conditional argument to show/hide settings field. Options:
     *                                             i) string: '{{ slack.client_id }}'
     *                                             ii) array: [ '{{ slack.client_id }}', '{{ slack.client_secret }}', ... ]
     *                                             iii) associative array [
     *                                             '{{ slack.client_id }}' => [
     *                                             '===' => 'value_to_be_equaled'
     *                                             ],
     *                                             '{{ foo.bar }}' => [
     *                                             '>=' => {{ foo.buzz }},
     *                                             '<' => 10
     *                                             ...
     *                                             ]
     *                                             ...
     *                                             ]
     *                                             i, ii will return false for nullable values.
     *                                             Acceptable operators for iii are:
     *                                             ===, !==, >, <, >=, <=
     *                                             }
     */

    $settings['google_sheet'] = [
        'label'       => __( 'Google Sheet', 'sheet-wise' ),
        'description' => __( 'Google Sheet related settings', 'sheet-wise' ),
        'type'        => 'object',
        'context'     => [ 'view', 'edit' ],
        'icon'        => 'table-cells',
        'fields'      => [
            'credential_json'      => [
                'label'       => __( 'Service Account Credential JSON', 'sheet-wise' ),
                'description' => sprintf(
                    __( 'Copy the full JSON file Credentials and paste it here. %1$sHow to?%2$s', 'sheet-wise' ),
                    '<a href="' . admin_url( 'admin.php?page=sheet-wise-settings#/how-to' ) . '" target="_blank">',
                    '</a>'
                ),
                'type'        => 'string',
                'default'     => '',
                'context'     => [ 'view', 'edit' ],
                'field_type'  => 'textarea',
            ],
        ],
    ];

    $settings['integrations'] = [
        'label'       => __( 'Integrations', 'sheet-wise' ),
        'description' => __( 'Third party integration related settings', 'sheet-wise' ),
        'type'        => 'object',
        'context'     => [ 'view', 'edit' ],
        'icon'        => 'table-cells',
        'fields'      => [
            'woocommerce' => [
                'label'       => __( 'WooCommerce', 'sheet-wise' ),
                'description' => __(
                    'Toggle on the WooCommerce integrations to active WooCommerce hooks', 'sheet-wise'
                ),
                'type'        => 'boolean',
                'default'     => '',
                'context'     => [ 'view', 'edit' ],
                'field_type'  => 'toggle',
            ],
        ],
    ];

    $schema = apply_filters( 'swise_settings_schema', $settings );

    // return specific settings schema
    if ( $section && isset( $schema[ $section ] ) ) {
        return $schema[ $section ];
    } elseif ( $section ) {
        return [];
    }

    return $schema;
}

/**
 * Remove admin notices for this page
 *
 * @since 1.0.0
 *
 * @return void
 */
function swise_remove_admin_notices() {
    global $wp_filter;
    // Check if the WP_Admin_Bar exists, as it's not available on all admin pages.
    if ( isset( $wp_filter['admin_notices'] ) ) {
        // Remove all actions hooked to the 'admin_notices' hook.
        unset( $wp_filter['admin_notices'] );
    }
}

/**
 * Get the REST URL
 *
 * @since 1.0.0
 *
 * @return string
 */
function swise_rest_url() {
    return rest_url( 'swise/v1' );
}

/**
 * Get the Sheet-Wise post type
 *
 * @since 1.0.0
 *
 * @return string
 */
function swise_get_post_type() {
    return 'swise_integration';
}

/**
 * Get the hook meta key
 *
 * @since 1.0.0
 *
 * @return string
 */
function swise_get_hook_meta_key() {
    return 'swise_data_source_hook';
}

/**
 * Require a file if exists
 *
 * @since 1.0.0
 *
 * @return void
 */
function swise_require_file( $file ) {
    if ( file_exists( $file ) ) {
        require_once $file;
    }
}

/**
 * Get the data sources for integrations
 *
 * @since 1.0.0
 *
 * @return array
 */
function swise_get_data_sources() {
    $sources = [
        'user_register'     => [
            'label'       => __( 'WordPress New User', 'sheet-wise' ),
            'num_of_args' => 2,
        ],
        'wp_update_user'    => [
            'label'       => __( 'WordPress User Profile Update', 'sheet-wise' ),
            'num_of_args' => 3,
        ],
        'delete_user'       => [
            'label'       => __( 'WordPress Delete User', 'sheet-wise' ),
            'num_of_args' => 3,
        ],
        'wp_login'          => [
            'label'       => __( 'WordPress User Login', 'sheet-wise' ),
            'num_of_args' => 2,
        ],
        'wp_logout'         => [
            'label'       => __( 'WordPress User Logout', 'sheet-wise' ),
            'num_of_args' => 1,
        ],
        'save_post'         => [
            'label'       => __( 'WordPress New Post', 'sheet-wise' ),
            'num_of_args' => 3,
        ],
        'edit_post'         => [
            'label'       => __( 'WordPress Edit Post', 'sheet-wise' ),
            'num_of_args' => 2,
        ],
        'wp_trash_post'     => [
            'label'       => __( 'WordPress Delete Post', 'sheet-wise' ),
            'num_of_args' => 2,
        ],
        'wp_insert_comment' => [
            'label'       => __( 'WordPress New Comment', 'sheet-wise' ),
            'num_of_args' => 2,
        ],
        'edit_comment'      => [
            'label'       => __( 'WordPress Edit Comment', 'sheet-wise' ),
            'num_of_args' => 2,
        ],
    ];

    return apply_filters( 'swise_integration_data_sources', $sources );
}

/**
 * Get the data source events for integrations
 *
 * @since 1.0.0
 *
 * @return array
 */
function swise_get_data_source_events() {
    $user_register     = apply_filters(
        'swise_data_source_event_user_register', [
            'user_register' => swise_get_common_user_data_source_events(),
        ]
    );
    $update_user       = apply_filters(
        'swise_data_source_event_update_user', [
            'wp_update_user' => swise_get_common_user_data_source_events(),
        ]
    );
    $delete_user       = apply_filters(
        'swise_data_source_event_delete_user', [
            'delete_user' => swise_get_common_user_data_source_events(),
        ]
    );
    $wp_login          = apply_filters(
        'swise_data_source_event_wp_login', [
            'wp_login' => swise_get_common_user_data_source_events(),
        ]
    );
    $wp_logout         = apply_filters(
        'swise_data_source_event_wp_logout', [
            'wp_logout' => swise_get_common_user_data_source_events(),
        ]
    );
    $save_post         = apply_filters(
        'swise_data_source_event_wp_insert_post', [
            'save_post' => swise_get_common_post_data_source_events(),
        ]
    );
    $edit_post         = apply_filters(
        'swise_data_source_event_edit_post', [
            'edit_post' => swise_get_common_post_data_source_events(),
        ]
    );
    $wp_trash_post     = apply_filters(
        'swise_data_source_event_wp_trash_post', [
            'wp_trash_post' => swise_get_common_post_data_source_events(),
        ]
    );
    $wp_insert_comment = apply_filters(
        'swise_data_source_event_wp_insert_comment', [
            'wp_insert_comment' => swise_get_common_comment_source_events(),
        ]
    );
    $edit_comment      = apply_filters(
        'swise_data_source_event_edit_comment', [
            'edit_comment' => swise_get_common_comment_source_events(),
        ]
    );
    $events            = array_merge(
        $user_register, $update_user, $delete_user, $wp_login, $wp_logout, $save_post, $edit_post, $wp_trash_post,
        $wp_insert_comment, $edit_comment
    );

    return apply_filters( 'swise_integration_data_source_events', $events );
}

/**
 * Get the supported post types
 *
 * @since 1.0.0
 *
 * @return array
 */
function swise_get_supported_post_types() {
    return [ 'post' ];
}

/**
 * Get the common user data source events
 *
 * @since 1.0.0
 *
 * @return array
 */
function swise_get_common_user_data_source_events() {
    return apply_filters(
        'swise_common_user_data_source_events', [
            'user_id'         => [
                'label' => __( 'User ID', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'user_email'      => [
                'label' => __( 'User Email', 'sheet-wise' ),
                'type'  => 'email',
            ],
            'user_login'      => [
                'label' => __( 'User Login', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'user_registered' => [
                'label' => __( 'User Registered Time', 'sheet-wise' ),
                'type'  => 'date-time',
            ],
            'first_name'      => [
                'label' => __( 'First Name', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'last_name'       => [
                'label' => __( 'Last Name', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'user_nicename'   => [
                'label' => __( 'Nice name', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'nickname'        => [
                'label' => __( 'Nickname', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'description'     => [
                'label' => __( 'Description', 'sheet-wise' ),
                'type'  => 'textarea',
            ],
            'user_url'        => [
                'label' => __( 'User URL', 'sheet-wise' ),
                'type'  => 'url',
            ],
            'display_name'    => [
                'label' => __( 'Display Name', 'sheet-wise' ),
                'type'  => 'text',
            ],
        ]
    );
}

/**
 * Get the common post data source events
 *
 * @since 1.0.0
 *
 * @return array
 */
function swise_get_common_post_data_source_events() {
    return apply_filters(
        'swise_common_post_data_source_events', [
            'ID'            => [
                'label' => __( 'Post ID', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'post_title'    => [
                'label' => __( 'Post Title', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'post_content'  => [
                'label' => __( 'Post Content', 'sheet-wise' ),
                'type'  => 'textarea',
            ],
            'post_author'   => [
                'label' => __( 'Post Author ID', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'post_date'     => [
                'label' => __( 'Post Date', 'sheet-wise' ),
                'type'  => 'date-time',
            ],
            'post_date_gmt' => [
                'label' => __( 'Post Date GMT', 'sheet-wise' ),
                'type'  => 'date-time',
            ],
            'post_excerpt'  => [
                'label' => __( 'Post Excerpt', 'sheet-wise' ),
                'type'  => 'textarea',
            ],
            'post_status'   => [
                'label' => __( 'Post Status', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'post_name'     => [
                'label' => __( 'Post Name (Slug)', 'sheet-wise' ),
                'type'  => 'text',
            ],
        ]
    );
}

/**
 * Get the common comment data source events
 *
 * @since 1.0.0
 *
 * @return array
 */
function swise_get_common_comment_source_events() {
    return apply_filters(
        'swise_common_comment_data_source_events', [
            'comment_ID'           => [
                'label' => __( 'Comment ID', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'comment_post_ID'      => [
                'label' => __( 'Comment Post ID', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'comment_author'       => [
                'label' => __( 'Comment Author', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'comment_author_email' => [
                'label' => __( 'Comment Author Email', 'sheet-wise' ),
                'type'  => 'email',
            ],
            'comment_author_url'   => [
                'label' => __( 'Comment Author URL', 'sheet-wise' ),
                'type'  => 'url',
            ],
            'comment_author_IP'    => [
                'label' => __( 'Comment Author IP', 'sheet-wise' ),
                'type'  => 'text',
            ],
            'comment_date'         => [
                'label' => __( 'Comment Date', 'sheet-wise' ),
                'type'  => 'date-time',
            ],
            'comment_date_gmt'     => [
                'label' => __( 'Comment Date GMT', 'sheet-wise' ),
                'type'  => 'date-time',
            ],
            'comment_content'      => [
                'label' => __( 'Comment Content', 'sheet-wise' ),
                'type'  => 'textarea',
            ],
            'comment_approved'     => [
                'label' => __( 'Comment Approved', 'sheet-wise' ),
                'type'  => 'number',
            ],
            'comment_parent'       => [
                'label' => __( 'Comment Parent', 'sheet-wise' ),
                'type'  => 'number',
            ],
        ]
    );
}
