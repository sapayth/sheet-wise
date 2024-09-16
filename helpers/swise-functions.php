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
	$schema = apply_filters( 'swise_settings_schema', [] );
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
		'user_register'     => __( 'Wordpress New User', 'sheet-wise' ),
		'wp_update_user'    => __( 'Wordpress User Profile Update', 'sheet-wise' ),
		'delete_user'       => __( 'Wordpress Delete User', 'sheet-wise' ),
		'wp_login'          => __( 'Wordpress User Login', 'sheet-wise' ),
		'wp_logout'         => __( 'Wordpress User Logout', 'sheet-wise' ),
		'wp_insert_post'    => __( 'Wordpress New Post', 'sheet-wise' ),
		'edit_post'         => __( 'Wordpress Edit Post', 'sheet-wise' ),
		'wp_trash_post'     => __( 'Wordpress Delete Post', 'sheet-wise' ),
		'wp_insert_comment' => __( 'Wordpress Comment', 'sheet-wise' ),
		'edit_comment'      => __( 'Wordpress Edit Comment', 'sheet-wise' ),
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
function get_data_source_events() {
	$user_register     = apply_filters(
		'data_source_event_user_register', [
			'user_register' => [
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
					'label' => __( 'User Registered', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$update_user       = apply_filters(
		'data_source_event_update_user', [
			'wp_update_user' => [
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
					'label' => __( 'User Registered', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$delete_user       = apply_filters(
		'data_source_event_delete_user', [
			'delete_user' => [
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
					'label' => __( 'User Registered', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$wp_login          = apply_filters(
		'data_source_event_wp_login', [
			'wp_login' => [
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
					'label' => __( 'User Registered', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$wp_logout         = apply_filters(
		'data_source_event_wp_logout', [
			'wp_logout' => [
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
					'label' => __( 'User Registered', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$wp_insert_post    = apply_filters(
		'data_source_event_wp_insert_post', [
			'wp_insert_post' => [
				'post_id'      => [
					'label' => __( 'Post ID', 'sheet-wise' ),
					'type'  => 'number',
				],
				'post_title'   => [
					'label' => __( 'Post Title', 'sheet-wise' ),
					'type'  => 'text',
				],
				'post_content' => [
					'label' => __( 'Post Content', 'sheet-wise' ),
					'type'  => 'textarea',
				],
				'post_date'    => [
					'label' => __( 'Post Date', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$edit_post         = apply_filters(
		'data_source_event_edit_post', [
			'edit_post' => [
				'post_id'      => [
					'label' => __( 'Post ID', 'sheet-wise' ),
					'type'  => 'number',
				],
				'post_title'   => [
					'label' => __( 'Post Title', 'sheet-wise' ),
					'type'  => 'text',
				],
				'post_content' => [
					'label' => __( 'Post Content', 'sheet-wise' ),
					'type'  => 'textarea',
				],
				'post_date'    => [
					'label' => __( 'Post Date', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$wp_trash_post     = apply_filters(
		'data_source_event_wp_trash_post', [
			'wp_trash_post' => [
				'post_id'      => [
					'label' => __( 'Post ID', 'sheet-wise' ),
					'type'  => 'number',
				],
				'post_title'   => [
					'label' => __( 'Post Title', 'sheet-wise' ),
					'type'  => 'text',
				],
				'post_content' => [
					'label' => __( 'Post Content', 'sheet-wise' ),
					'type'  => 'textarea',
				],
				'post_date'    => [
					'label' => __( 'Post Date', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$wp_insert_comment = apply_filters(
		'data_source_event_wp_insert_comment', [
			'wp_insert_comment' => [
				'comment_id'      => [
					'label' => __( 'Comment ID', 'sheet-wise' ),
					'type'  => 'number',
				],
				'comment_content' => [
					'label' => __( 'Comment Content', 'sheet-wise' ),
					'type'  => 'textarea',
				],
				'comment_date'    => [
					'label' => __( 'Comment Date', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);
	$edit_comment      = apply_filters(
		'data_source_event_edit_comment', [
			'edit_comment' => [
				'comment_id'      => [
					'label' => __( 'Comment ID', 'sheet-wise' ),
					'type'  => 'number',
				],
				'comment_content' => [
					'label' => __( 'Comment Content', 'sheet-wise' ),
					'type'  => 'textarea',
				],
				'comment_date'    => [
					'label' => __( 'Comment Date', 'sheet-wise' ),
					'type'  => 'date-time',
				],
			],
		]
	);

	$events = array_merge(
		$user_register, $update_user, $delete_user, $wp_login, $wp_logout, $wp_insert_post, $edit_post, $wp_trash_post,
		$wp_insert_comment, $edit_comment
	);

	return apply_filters( 'swise_integration_data_source_events', $events );
}
