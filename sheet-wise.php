<?php
/**
 * Plugin Name: Sheet Wise
 * Description: Sync and manage your Google Sheets spreadsheet through your WordPress site.
 * Show google sheet contents in your site.
 * Author: sapayth
 * Version: 1.0.1
 * Text Domain: sheet-wise
 * license: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

defined( 'ABSPATH' ) || exit;

if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	return;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Main bootstrap class for SheetWise
 */
final class SheetWise {
	/**
	 * Container for dynamic properties.
	 *
	 * @var array
	 */
	protected $container = [];

	/**
	 * Singleton instance
	 *
	 * @var self
	 */
	private static $instance;

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

		$this->includes();
		$this->init_hooks();

		do_action( 'swise_loaded' );
	}

	/**
	 * Define the constants
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function define_constants() {
		$this->define( 'SWISE_VERSION', '1.0.1' );
		$this->define( 'SWISE_FILE', __FILE__ );
		$this->define( 'SWISE_ROOT', __DIR__ );
		$this->define( 'SWISE_ROOT_URL', plugins_url( '', __FILE__ ) );
		$this->define( 'SWISE_ASSET_URL', SWISE_ROOT_URL . '/assets' );
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

	/**
	 * Get the singleton instance
	 *
	 * @return self
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Get dynamic property from container.
	 *
	 * @param string $name
	 *
	 * @return mixed
	 */
	public function __get( $name ) {
		if ( isset( $this->container[ $name ] ) ) {
			return $this->container[ $name ];
		}

		return null;
	}

	/**
	 * Set dynamic property to container.
	 *
	 * @param string $name
	 * @param mixed  $value
	 *
	 * @return void
	 */
	public function __set( $name, $value ) {
		$this->container[ $name ] = $value;
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
