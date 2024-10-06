<?php

namespace SheetWise;

use SheetWise\Scoped\Google\Service\Sheets\ValueRange;
use SheetWise\Admin\GoogleSheet;
use WP_Post;

class Hooks {

	/**
	 * Initialize the hooks
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function __construct() {
		$hooks = swise_get_data_sources();

		foreach ( $hooks as $hook => $value ) {
			$num_of_args = ! empty( $value['num_of_args'] ) ? $value['num_of_args'] : 1;

			add_action( $hook, [ $this, $hook ], 10, $num_of_args );
		}
	}

	/**
	 * Handle the user_register hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $user_id
	 *
	 * @return void
	 */
	public function user_register( $user_id ) {
		global $wpdb;

		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM $wpdb->postmeta pm
				INNER JOIN $wpdb->posts p ON pm.post_id = p.ID
				WHERE pm.meta_key = %s AND pm.meta_value = %s AND p.post_status != %s",
				swise_get_hook_meta_key(),
				'user_register',
				'draft'
			)
		);

		if ( empty( $results ) ) {
			return;
		}

		foreach ( $results as $result ) {
			$data = $this->get_common_data( $result );

			if ( ! $data ) {
				continue;
			}

			$event_codes = ! empty( $data['event_codes'] ) ? $data['event_codes'] : [];
			$sheet       = ! empty( $data['sheet'] ) ? $data['sheet'] : null;
			$sheet_id    = ! empty( $data['sheet_id'] ) ? $data['sheet_id'] : null;
			$source      = ! empty( $data['source'] ) ? $data['source'] : null;

			if ( ! $event_codes || ! $sheet || ! $sheet_id || $source ) {
				continue;
			}

			$all_event_codes = swise_get_data_source_events();

			if ( ! array_key_exists( 'user_register', $all_event_codes ) ) {
				continue;
			}

			$user = get_user_by( 'ID', $user_id );

			if ( ! $user ) {
				continue;
			}

			$user_values = [];
			$default_events = array_keys( $all_event_codes['user_register'] );

			foreach ( $default_events as $event ) {
				if ( $event === 'user_id' ) {
					$user_values[] = $user->data->ID;
				} else {
					$user_values[] = $user->data->$event;
				}
			}

			// add `[[` and `]]` to the $default_events array
			$default_events = array_map(
				function ( $event ) {
					return "[[$event]]";
				}, $default_events
			);

			$values = [];

			foreach ( $event_codes as $event_code ) {
				$values[] = str_replace( $default_events, $user_values, $event_code );
			}

			// define hook name beforehand
			$creation_hook = 'sheetwise_scheduled_' . $source;

			if ( false === as_next_scheduled_action( $creation_hook ) ) {
				// enqueue the action
				as_enqueue_async_action(
					$creation_hook,
					[
						'args' => [
							'hook'      => $source,
							'values'    => $values,
							'sheet_id'  => $sheet_id,
						],
					]
				);
			}
		}
	}

	/**
	 * Get the common data
	 *
	 * @since 1.0.0
	 *
	 * @param object $result
	 *
	 * @return mixed
	 */
	private function get_common_data( $result ) {
		$integration = get_post( $result->post_id );

		if ( ! $integration ) {
			return null;
		}

		$integration = json_decode( $integration->post_content );

		if ( ! $integration ) {
			return null;
		}

		$sheet_id = $integration->sheet;

		if ( ! $sheet_id ) {
			return null;
		}

		$event_codes = $integration->event_codes;

		if ( ! $event_codes ) {
			return null;
		}

		$source = $integration->source;

		if ( ! $source ) {
			return null;
		}

		$sheet = new GoogleSheet( $sheet_id );

		return [
			'event_codes' => $integration->event_codes,
			'sheet'       => $sheet,
			'sheet_id'    => $sheet_id,
			'source'      => $source,
		];
	}

	/**
	 * Handle the wp_update_user hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $user_id
	 *
	 * @return void
	 */
	public function wp_update_user( $user_id, $userdata, $userdata_raw ) {
		global $wpdb;

		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM $wpdb->postmeta pm
				INNER JOIN $wpdb->posts p ON pm.post_id = p.ID
				WHERE pm.meta_key = %s AND pm.meta_value = %s AND p.post_status != %s",
				swise_get_hook_meta_key(),
				'wp_update_user',
				'draft'
			)
		);

		if ( empty( $results ) ) {
			return;
		}

		foreach ( $results as $result ) {
			$data = $this->get_common_data( $result );

			if ( ! $data ) {
				continue;
			}

			$event_codes = ! empty( $data['event_codes'] ) ? $data['event_codes'] : [];
			$sheet       = ! empty( $data['sheet'] ) ? $data['sheet'] : null;
			$sheet_id    = ! empty( $data['sheet_id'] ) ? $data['sheet_id'] : null;
			$source      = ! empty( $data['source'] ) ? $data['source'] : null;

			if ( ! $event_codes || ! $sheet || ! $sheet_id ) {
				continue;
			}

			$all_event_codes = swise_get_data_source_events();

			if ( ! array_key_exists( 'wp_update_user', $all_event_codes ) ) {
				continue;
			}

			$user = get_user_by( 'ID', $user_id );

			if ( ! $user ) {
				continue;
			}

			$default_events = array_keys( $all_event_codes['wp_update_user'] );

			// add `[[` and `]]` to the $default_events array
			$default_events = array_map(
				function ( $event ) {
					return "[[$event]]";
				}, $default_events
			);

			$user_values = apply_filters(
				'swise_wp_update_user_values',
				[
					$user->data->ID,
					$user->data->user_email,
					$user->data->user_login,
					$user->data->user_registered,
					$userdata['first_name'],
					$userdata['last_name'],
					$user->data->user_nicename,
					$userdata['description'],
					$userdata['role'],
					$user->data->user_url,
					$user->data->display_name,
				]
			);

			$values = [];

			foreach ( $event_codes as $event_code ) {
				$values[] = str_replace( $default_events, $user_values, $event_code );
			}

			// define hook name beforehand
			$creation_hook = 'sheetwise_scheduled_' . $source;

			if ( false === as_next_scheduled_action( $creation_hook ) ) {
				// enqueue the action
				as_enqueue_async_action(
					$creation_hook,
					[
						'args' => [
							'hook'      => $source,
							'values'    => $values,
							'sheet_id'  => $sheet_id,
						],
					]
				);
			}
		}
	}

	/**
	 * Handle the delete_user hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $user_id
	 *
	 * @return void
	 */
	public function delete_user( $user_id ) {
		error_log( 'swise_delete_user' );
	}

	/**
	 * Handle the wp_login hook
	 *
	 * @since 1.0.0
	 *
	 * @param string $user_login
	 * @param WP_User $user
	 *
	 * @return void
	 */
	public function wp_login( $user_login, $user ) {
		error_log( 'swise_wp_login' );
	}

	/**
	 * Handle the wp_logout hook
	 *
	 * @since 1.0.0
	 *
	 * @param WP_User $user
	 *
	 * @return void
	 */
	public function wp_logout( $user ) {
		error_log( 'swise_wp_logout' );
	}

	/**
	 * Handle the wp_insert_post hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id
	 * @param WP_Post $post
	 * @param bool $update
	 *
	 * @return void
	 */
	public function wp_insert_post( $post_id, $post, $update ) {
		if ( ! in_array( get_post_type( $post_id ), swise_get_supported_post_types(), true ) ) {
			return;
		}
	}

	/**
	 * Handle the edit_post hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	public function edit_post( $post_id, $post ) {
		if ( ! in_array( get_post_type( $post_id ), swise_get_supported_post_types(), true ) ) {
			return;
		}
		error_log( 'swise_edit_post' );
	}

	/**
	 * Handle the wp_trash_post hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id
	 *
	 * @return void
	 */
	public function wp_trash_post( $post_id ) {
		error_log( 'swise_wp_trash_post' );
	}

	/**
	 * Handle the wp_insert_comment hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $comment_id
	 * @param WP_Comment $comment
	 *
	 * @return void
	 */
	public function wp_insert_comment( $comment_id, $comment ) {
		error_log( 'swise_wp_insert_comment' );
	}

	/**
	 * Handle the edit_comment hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $comment_id
	 * @param WP_Comment $comment
	 *
	 * @return void
	 */
	public function edit_comment( $comment_id, $comment ) {
		error_log( 'swise_edit_comment' );
	}

	/**
	 * Get the results
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	private function get_results( $meta_value ) {
		global $wpdb;

		return $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM $wpdb->postmeta WHERE meta_key = %s AND meta_value = %s",
				swise_get_hook_meta_key(),
				$meta_value
			)
		);
	}
}
