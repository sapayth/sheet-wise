<?php
/**
 * Plugin Name: SheetWise
 * Plugin URI: https://sapayth.com
 * Description: Sync and manage your Google Sheets spreadsheet through your WordPress site.
 * Show google sheet contents in your site.
 * Author: Sapayth H.
 * Author URI: https://sapayth.com
 * Version: 1.0.0
 * Text Domain: sheet-wise
 */

defined( 'ABSPATH' ) || exit;

if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	return;
}

require_once __DIR__ . '/vendor/autoload.php';

use WeDevs\WpUtils\ContainerTrait;
use WeDevs\WpUtils\SingletonTrait;

/**
 * Main bootstrap class for SheetWise
 */
final class SheetWise {
	use SingletonTrait;
	use ContainerTrait;

	/**
	 * Minimum PHP version required
	 *
	 * @var string
	 */
	private $min_php = '7.4';

	/**
	 * Fire up the plugin
	 */
	public function __construct() {
		if ( ! $this->is_supported_php() ) {
			return;
		}

		$this->define_constants();

		// @todo:register activation hook
		// @todo:register deactivation hook

		$this->includes();
		$this->init_hooks();

		do_action( 'swise_loaded' );
	}

	public function define_constants() {
		$this->define( 'SWISE_VERSION', '1.0.0' );
		$this->define( 'SWISE_FILE', __FILE__ );
		$this->define( 'SWISE_ROOT', __DIR__ );
		$this->define( 'SWISE_ROOT_URI', plugins_url( '', __FILE__ ) );
		$this->define( 'SWISE_ASSET_URI', SWISE_ROOT_URI . '/assets' );
		$this->define( 'SWISE_INCLUDES', SWISE_ROOT . '/includes' );
	}

	/**
	 * Define a constant if it is not already defined
	 *
	 * @since 1.0.0
	 *
	 * @param string $constant
	 * @param mixed  $value
	 *
	 * @return void
	 */
	private function define( $constant, $value ) {
		if ( ! defined( $constant ) ) {
			define( $constant, $value );
		}
	}

	/**
	 * Initialize the hooks
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function init_hooks() {
		add_action( 'plugins_loaded', [ $this, 'instantiate' ] );
		add_action( 'swise_loaded', [ $this, 'include_action_scheduler' ] );
	}

	/**
	 * Include the action scheduler
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function include_action_scheduler() {
		swise_require_file( SWISE_ROOT . '/vendor/woocommerce/action-scheduler/action-scheduler.php' );
		swise_require_file(
			SWISE_ROOT . '/vendor/deliciousbrains/wp-background-processing/wp-background-processing.php'
		);
	}

	/**
	 * Instantiate the classes
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function instantiate() {
		$this->container['assets']          = new SheetWise\Assets();
		$this->container['api']             = new SheetWise\Api();
		$this->container['hooks']           = new SheetWise\Hooks();
		$this->container['scheduled_hooks'] = new SheetWise\ActionScheduler\Hooks();

		if ( is_admin() ) {
			$this->container['admin'] = new SheetWise\Admin();
		}
	}

	/**
	 * Include the required files
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function includes() {
		$helpers = SWISE_ROOT . '/helpers/swise-functions.php';

		if ( file_exists( $helpers ) ) {
			require_once $helpers;
		}
	}

	/**
	 * Check if the PHP version is supported
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public function is_supported_php( $min_php = null ) {
		$min_php = ! is_null( $min_php ) ? $min_php : $this->min_php;

		if ( version_compare( PHP_VERSION, $min_php, '<=' ) ) {
			return false;
		}

		return true;
	}
}

/**
 * Returns the main instance of SheetWise
 *
 * @since 1.0.0
 *
 * @return SheetWise
 */
function swise() {
	return SheetWise::instance();
}

swise();
