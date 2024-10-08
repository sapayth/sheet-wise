<?php

namespace SheetWise;

use SheetWise\Scoped\Google\Service\Sheets\ValueRange;
use SheetWise\Admin\GoogleSheet;
use WP_Post;
use WP_User;

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
		$user = get_user_by( 'ID', $user_id );

		if ( ! $user ) {
			return;
		}

		$this->process_user_action( 'user_register', $user );
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
		$user = get_user_by( 'ID', $user_id );

		if ( ! $user ) {
			return;
		}

		$this->process_user_action( 'wp_update_user', $user );
	}

	/**
	 * Handle the delete_user hook
	 *
	 * @since 1.0.0
	 *
	 * @param int     $id
	 * @param bool    $reassign
	 * @param WP_User $user
	 *
	 * @return void
	 */
	public function delete_user( $id, $reassign, $user ) {
		$this->process_user_action( 'delete_user', $user );
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
		$this->process_user_action( 'wp_login', $user );
	}

	/**
	 * Handle the wp_logout hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $user_id
	 *
	 * @return void
	 */
	public function wp_logout( $user_id ) {
		$user = get_user_by( 'ID', $user_id );
		$this->process_user_action( 'wp_logout', $user );
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

		if ( 'publish' !== $post->post_status ) {
			return;
		}

		$this->process_post_action( 'wp_insert_post', $post );
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

		$this->process_post_action( 'edit_post', $post );
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
	public function wp_trash_post( $post_id, $previous_status ) {
		if ( ! in_array( get_post_type( $post_id ), swise_get_supported_post_types(), true ) ) {
			return;
		}

		$this->process_post_action( 'wp_trash_post', get_post( $post_id ) );
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
	 * @return array|object|null Database query results.
	 */
	private function get_results( $meta_value ) {
		global $wpdb;

		return $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM $wpdb->postmeta pm
				INNER JOIN $wpdb->posts p ON pm.post_id = p.ID
				WHERE pm.meta_key = %s AND pm.meta_value = %s AND p.post_status != %s",
				swise_get_hook_meta_key(),
				$meta_value,
				'draft'
			)
		);
	}

	/**
	 * Get the common data
	 *
	 * @since 1.0.0
	 *
	 * @param object $result
	 *
	 * @return null|array
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
	 * Process the user action
	 *
	 * @since 1.0.0
	 *
	 * @param string $action
	 * @param WP_User $user
	 *
	 * @return void
	 */
	private function process_user_action( $action, $user ) {
		if ( ! $user instanceof WP_User ) {
			return;
		}

		$results = $this->get_results( $action );

		if ( empty( $results ) ) {
			return;
		}

		foreach ( $results as $result ) {
			$data = $this->get_common_data( $result );
			if ( ! $data ) {
				continue;
			}

			$user_meta_keys = array_keys( get_user_meta( $user->data->ID ) );

			$all_event_codes = swise_get_data_source_events();
			if ( ! array_key_exists( $action, $all_event_codes ) ) {
				continue;
			}

			$all_event_codes = swise_get_data_source_events();

			if ( ! array_key_exists( $action, $all_event_codes ) ) {
				continue;
			}

			$user_values = [];
			$default_events = array_keys( $all_event_codes[ $action ] );

			foreach ( $default_events as $event ) {
				if ( $event === 'user_id' ) {
					$user_values[] = $user->data->ID;
				} elseif ( in_array( $event, $user_meta_keys, true ) ) {
					$user_values[] = get_user_meta( $user->data->ID, $event, true );
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

			foreach ( $data['event_codes'] as $event_code ) {
				$values[] = str_replace( $default_events, $user_values, $event_code );
			}

			// define hook name beforehand
			$creation_hook = 'sheetwise_scheduled_' . $data['source'];

			if ( false === as_next_scheduled_action( $creation_hook ) ) {
				// enqueue the action
				as_enqueue_async_action(
					$creation_hook,
					[
						'args' => [
							'hook'      => $data['source'],
							'values'    => $values,
							'sheet_id'  => $data['sheet_id'],
						],
					]
				);
			}
		}
	}

	/**
	 * Process the post action
	 *
	 * @since 1.0.0
	 *
	 * @param string $action
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	private function process_post_action( $action, $post ) {
		if ( ! $post instanceof WP_Post ) {
			return;
		}

		$results = $this->get_results( $action );

		if ( empty( $results ) ) {
			return;
		}

		foreach ( $results as $result ) {
			$data = $this->get_common_data( $result );
			if ( ! $data ) {
				continue;
			}

			// define hook name beforehand
			$creation_hook = 'sheetwise_scheduled_' . $data['source'];

			if ( false === as_next_scheduled_action( $creation_hook ) ) {
				// enqueue the action
				as_enqueue_async_action(
					$creation_hook,
					[
						'args' => [
							'type'        => 'post',
							'hook'        => $data['source'],
							'values'      => $post,
							'sheet_id'    => $data['sheet_id'],
							'event_codes' => $data['event_codes'],
						],
					]
				);
			}
		}
	}
}
