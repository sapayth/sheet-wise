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
	 * @param array $schema {
	 *     Array elements are for both REST schema and UI schema.
	 *
	 *     @type string|array $show_if     Conditional argument to show/hide settings field. Options:
	 *                                     i) string: '{{ slack.client_id }}'
	 *                                     ii) array: [ '{{ slack.client_id }}', '{{ slack.client_secret }}', ... ]
	 *                                     iii) associative array [
	 *                                         '{{ slack.client_id }}' => [
	 *                                             '===' => 'value_to_be_equaled'
	 *                                         ],
	 *                                         '{{ foo.bar }}' => [
	 *                                             '>=' => {{ foo.buzz }},
	 *                                             '<' => 10
	 *                                             ...
	 *                                         ]
	 *                                         ...
	 *                                     ]
	 *                                     i, ii will return false for nullable values.
	 *                                     Acceptable operators for iii are:
	 *                                         ===, !==, >, <, >=, <=
	 * }
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
