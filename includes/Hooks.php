<?php

namespace SheetWise;

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
			add_action( $hook, [ $this, 'swise_' . $hook ] );
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
	public function swise_wp_update_user( $user_id ) {
		error_log( 'swise_wp_update_user' );
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
	public function swise_wp_insert_post( $post_id, $post, $update ) {
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
	public function swise_edit_post( $post_id, $post_after, $post_before ) {
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
