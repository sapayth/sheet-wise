<?php

namespace SheetWise\Admin;

class Menu {
	/**
	 * Parent slug
	 *
	 * @var string
	 */
	private $parent_slug;

	/**
	 * Menu hooks
	 *
	 * @var array
	 */
	private $menu_hooks = [];

	public function __construct() {
		$this->parent_slug = 'sheet-wise';

		add_action( 'admin_menu', [ $this, 'admin_menus' ] );
	}

	/**
	 * Register admin menus
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function admin_menus() {
		$capability = swise_get_admin_capability();
		$dashboard_hook = add_menu_page( __( 'Sheet Wise', 'sheet-wise' ), __( 'Sheet Wise', 'sheet-wise' ), $capability, $this->parent_slug, [ $this, 'render_dashboard' ] );

		$settings_hook = add_submenu_page(
			$this->parent_slug,
			__( 'Settings', 'sheet-wise' ),
			__( 'Settings', 'sheet-wise' ),
			$capability,
			'settings',
			[ $this, 'render_settings' ]
		);

		add_action( 'load-' . $dashboard_hook, [ $this, 'dashboard_menu_action' ] );
		add_action( 'load-' . $settings_hook, [ $this, 'settings_menu_action' ] );

		$this->menu_hooks = [
			'dashboard' => 'load-' . $dashboard_hook,
			'settings'  => 'load-' . $settings_hook,
		];

		foreach ( $this->menu_hooks as $hook ) {
			add_action( $hook, [ $this, 'run_common_page_tasks' ] );
		}
	}

	/**
	 * Run common page tasks
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function run_common_page_tasks() {
		/**
		 * Enqueue common scripts and styles
		 */
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_common_scripts' ] );
	}

	/**
	 * Enqueue common scripts and styles
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function enqueue_common_scripts() {
		wp_enqueue_style( 'swise-admin' );

		wp_localize_script(
			'swise-admin',
			'swiseAdmin',
			[
				'nonce'  => wp_create_nonce( 'wp_rest' ),
				'apiUrl' => swise_rest_url(),
			]
		);
	}

	/**
	 * Dashboard menu action
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function dashboard_menu_action() {
		/**
		 * Backdoor for calling the menu hook.
		 * This hook won't get translated even the site language is changed
		 */
		do_action( 'swise_load_dashboard' );
	}

	/**
	 * Settings menu action
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function settings_menu_action() {
		/**
		 * Backdoor for calling the menu hook.
		 * This hook won't get translated even the site language is changed
		 */
		do_action( 'swise_load_settings' );
	}

	/**
	 * Render settings page
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function render_settings() {
		echo '<div id="swise-settings"></div>';
	}

	/**
	 * Render dashboard page
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function render_dashboard() {
		echo '<div id="swise-dashboard"></div>';
	}
}
