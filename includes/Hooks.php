<?php

namespace SheetWise;

use WP_Comment;
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
	 * @parem array $userdata
	 *
	 * @return void
	 */
	public function user_register( $user_id, $userdata ) {
		$user = get_user_by( 'ID', $user_id );
		$hook = 'user_register';

		if ( ! $user ) {
			return;
		}

		$user_meta_keys = array_keys( get_user_meta( $user->data->ID ) );

		$all_event_codes = swise_get_data_source_events();
		if ( ! array_key_exists( $hook, $all_event_codes ) ) {
			return;
		}

		$all_event_codes = swise_get_data_source_events();

		$user_values = $this->get_user_values( $all_event_codes, $hook, $user, $user_meta_keys );

		if ( empty( $user_values ) ) {
			return;
		}

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'user',
					'hook'   => $hook,
					'values' => $user_values,
					'id'     => $user_id,
				],
			],
			'swise_user',
			true
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
	public function wp_update_user( $user_id, $userdata, $userdata_raw ) {
		$user = get_user_by( 'ID', $user_id );
		$hook = 'wp_update_user';

		if ( ! $user ) {
			return;
		}

		$user_meta_keys = array_keys( get_user_meta( $user->data->ID ) );

		$all_event_codes = swise_get_data_source_events();

		if ( ! array_key_exists( $hook, $all_event_codes ) ) {
			return;
		}

		$user_values = $this->get_user_values( $all_event_codes, $hook, $user, $user_meta_keys );

		if ( empty( $user_values ) ) {
			return;
		}

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'user',
					'hook'   => $hook,
					'values' => $user_values,
					'id'     => $user_id,
				],
			],
			'swise_user',
			true
		);
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
	public function delete_user( $user_id, $reassign, $user ) {
		$hook = 'delete_user';

		$user_meta_keys = array_keys( get_user_meta( $user->data->ID ) );

		$all_event_codes = swise_get_data_source_events();

		if ( ! array_key_exists( $hook, $all_event_codes ) ) {
			return;
		}

		$user_values = $this->get_user_values( $all_event_codes, $hook, $user, $user_meta_keys );

		if ( empty( $user_values ) ) {
			return;
		}

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'user',
					'hook'   => $hook,
					'values' => $user_values,
					'id'     => $user_id,
				],
			],
			'swise_user',
			true
		);
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
		$hook = 'wp_login';

		$user_meta_keys = array_keys( get_user_meta( $user->data->ID ) );

		$all_event_codes = swise_get_data_source_events();

		if ( ! array_key_exists( $hook, $all_event_codes ) ) {
			return;
		}

		$user_values = $this->get_user_values( $all_event_codes, $hook, $user, $user_meta_keys );

		if ( empty( $user_values ) ) {
			return;
		}

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'user',
					'hook'   => $hook,
					'values' => $user_values,
					'id'     => $user->ID,
				],
			],
			'swise_user',
			true
		);
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

		$hook = 'wp_logout';

		$user_meta_keys = array_keys( get_user_meta( $user->data->ID ) );

		$all_event_codes = swise_get_data_source_events();

		if ( ! array_key_exists( $hook, $all_event_codes ) ) {
			return;
		}

		$user_values = $this->get_user_values( $all_event_codes, $hook, $user, $user_meta_keys );

		if ( empty( $user_values ) ) {
			return;
		}

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'user',
					'hook'   => $hook,
					'values' => $user_values,
					'id'     => $user->ID,
				],
			],
			'swise_user',
			true
		);
	}

	/**
	 * Handle the save_post hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id
	 * @param WP_Post $post
	 * @param bool $update
	 *
	 * @return void
	 */
	public function save_post( $post_id, $post, $update ) {
		// Only want to set if this is a new post!
		if ( 'auto-draft' === $post->post_status ) {
			return;
		}

		// Avoid autosaves
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// Check if this is the first published version of the post
		if ( 'publish' !== $post->post_status && $post->post_date_gmt !== $post->post_modified_gmt ) {
			return;
		}

		// Only set for our allowed post_type
		if ( ! in_array( get_post_type( $post_id ), swise_get_supported_post_types(), true ) ) {
			return;
		}

		$hook = 'save_post';

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'post',
					'hook'   => $hook,
					'values' => $post,
					'id'     => $post_id,
				],
			],
			'swise_post',
			true
		);
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
		$hook = 'edit_post';

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'post',
					'hook'   => $hook,
					'values' => $post,
					'id'     => $post_id,
				],
			],
			'swise_post',
			true
		);
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
		$post = get_post( $post_id );

		if ( ! ( $post instanceof WP_Post ) ) {
			return;
		}

		$hook = 'wp_trash_post';

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'post',
					'hook'   => $hook,
					'values' => $post,
					'id'     => $post_id,
				],
			],
			'swise_post',
			true
		);
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
		$hook = 'wp_insert_comment';

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'comment',
					'hook'   => $hook,
					'values' => $comment,
					'id'     => $comment_id,
				],
			],
			'swise_comment',
			true
		);
	}

	/**
	 * Handle the edit_comment hook
	 *
	 * @since 1.0.0
	 *
	 * @param int $comment_id
	 * @param array $data
	 *
	 * @return void
	 */
	public function edit_comment( $comment_id, $data ) {
		$hook = 'edit_comment';

		// define hook name beforehand
		$creation_hook = 'sheetwise_scheduled_' . $hook;

		as_enqueue_async_action(
			$creation_hook,
			[
				'args' => [
					'type'   => 'comment',
					'hook'   => $hook,
					'values' => get_comment( $comment_id ),
					'id'     => $comment_id,
				],
			],
			'swise_comment',
			true
		);
	}

	/**
	 * Get the user values
	 *
	 * @since 1.0.0
	 *
	 * @param array $all_event_codes
	 * @param string $hook
	 * @param WP_User $user
	 * @param array $user_meta_keys
	 *
	 * @return array
	 */
	private function get_user_values( $all_event_codes, $hook, $user, $user_meta_keys ) {
		$user_values = [];
		$default_events = array_keys( $all_event_codes[ $hook ] );

		foreach ( $default_events as $event ) {
			if ( $event === 'user_id' ) {
				$user_values[ $event ] = $user->data->ID;
			} elseif ( in_array( $event, $user_meta_keys, true ) ) {
				$user_values[ $event ] = get_user_meta( $user->data->ID, $event, true );
			} else {
				$user_values[ $event ] = $user->data->$event;
			}
		}

		return $user_values;
	}
}
