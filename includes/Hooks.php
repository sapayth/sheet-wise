<?php

namespace SheetWise;

use Google\Service\Sheets;
use SheetWise\Scoped\Google\Service\Sheets\ValueRange;
use SheetWise\Admin\GoogleSheet;

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

		foreach ( $hooks as $hook => $label ) {
			add_action( $hook, [ $this, 'swise_' . $hook ], 10, 3 );
		}
	}

	// user_register
	// wp_update_user
	// delete_user
	// wp_login
	// wp_logout
	// wp_insert_post
	// edit_post
	// wp_trash_post
	// wp_insert_comment
	// edit_comment

	/**
	 * Handle the user_register hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $user_id
	 *
	 * @return void
	 */
	public function swise_user_register( $user_id ) {
		global $wpdb;

		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM $wpdb->postmeta WHERE meta_key = %s AND meta_value = %s",
				swise_get_hook_meta_key(),
				'user_register'
			)
		);

		if ( empty( $results ) ) {
			return;
		}

		foreach ( $results as $result ) {
			$integration = get_post( $result->post_id );

			if ( ! $integration ) {
				continue;
			}

			$integration = json_decode( $integration->post_content );

			if ( ! $integration ) {
				continue;
			}

			$sheet_id = $integration->sheet_id;

			$sheet = new GoogleSheet( $sheet_id );

			// $sheet->get_sheet_by_id( $sheet_id );


		}
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
	public function swise_wp_update_user( $user_id, $userdata, $userdata_raw ) {
		global $wpdb;

		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM $wpdb->postmeta WHERE meta_key = %s AND meta_value = %s",
				swise_get_hook_meta_key(),
				'wp_update_user'
			)
		);

		if ( empty( $results ) ) {
			return;
		}

		foreach ( $results as $result ) {
			$integration = get_post( $result->post_id );

			if ( ! $integration ) {
				continue;
			}

			$integration = json_decode( $integration->post_content );

			if ( ! $integration ) {
				continue;
			}

			$sheet_id = $integration->sheet;

			if ( ! $sheet_id ) {
				continue;
			}

			$event_codes = $integration->event_codes;

			if ( ! $event_codes ) {
				continue;
			}

			$sheet = new GoogleSheet( $sheet_id );

			$user = get_user_by( 'ID', $user_id );

			if ( ! $user ) {
				continue;
			}

			$args = [
				'options'     => [ 'valueInputOption' => 'USER_ENTERED' ],
				'type'        => 'append',
				'clear_sheet' => false,
			];

			$data = [];

			$all_event_codes = get_data_source_events();

			if ( ! array_key_exists( 'wp_update_user', $all_event_codes ) ) {
				continue;
			}

			$default_events = array_keys( $all_event_codes['wp_update_user'] );

			// add `[[` and `]]` to the $default_events array
			$default_events = array_map(
				function ( $event ) {
					return "[[$event]]";
				}, $default_events
			);

			$user_values = [
				$user->data->ID,
				$user->data->user_email,
				$user->data->user_login,
				$user->data->user_registered,
			];

			$values = [];

			foreach ( $event_codes as $event_code ) {
				$values[] = str_replace( $default_events, $user_values, $event_code );
			}

			$value_range = new ValueRange();
			$value_range->setValues( [ $values ] );

			$service = $sheet->get_service();

			// append data in the first sheet of the spreadsheet
			$service->spreadsheets_values->append( $sheet_id, 'Sheet1', $value_range, $args['options'] );
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
	public function swise_delete_user( $user_id ) {
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
	public function swise_wp_login( $user_login, $user ) {
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
	public function swise_wp_logout( $user ) {
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
	public function swise_wp_insert_post( $post_id ) {
		error_log( 'swise_wp_insert_post' );
	}

	/**
	 * Handle the edit_post hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id
	 * @param WP_Post $post_after
	 * @param WP_Post $post_before
	 *
	 * @return void
	 */
	public function swise_edit_post() {
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
	public function swise_wp_trash_post( $post_id ) {
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
	public function swise_wp_insert_comment( $comment_id, $comment ) {
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
	public function swise_edit_comment( $comment_id, $comment ) {
		error_log( 'swise_edit_comment' );
	}

}
