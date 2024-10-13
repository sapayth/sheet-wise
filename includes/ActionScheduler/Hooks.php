<?php
namespace SheetWise\ActionScheduler;

use SheetWise\Admin\GoogleSheet;
use SheetWise\Scoped\Google\Service\Exception;
use SheetWise\Scoped\Google\Service\Sheets\ValueRange;

class Hooks {

	/**
	 * Initialize the scheduled action hooks
	 */
	public function __construct() {
		$actions = array_keys( swise_get_data_sources() );

		foreach ( $actions as $action ) {
			add_action( 'sheetwise_scheduled_' . $action, [ $this, 'process_data' ] );
		}
	}

	public function process_data( $args ) {
		if ( empty( $args['hook'] ) || empty( $args['values'] ) || empty( $args['type'] ) || empty( $args['id'] ) ) {
			return false;
		}

		$hook    = ! empty( $args['hook'] ) ? $args['hook'] : '';
		$results = $this->get_results( $hook );

		$values = ! empty( $args['values'] ) ? $args['values'] : [];

		if ( empty( $results ) ) {
			return [];
		}

		foreach ( $results as $result ) {
			$data = $this->get_common_data( $result );
			if ( ! $data ) {
				continue;
			}

			$all_event_codes = swise_get_data_source_events();
			if ( ! array_key_exists( $hook, $all_event_codes ) ) {
				continue;
			}

			$all_event_codes = swise_get_data_source_events();

			if ( ! array_key_exists( $hook, $all_event_codes ) ) {
				continue;
			}

			$comment_values = [];
			$default_events = array_keys( $all_event_codes[ $hook ] );

			foreach ( $default_events as $event ) {
				$comment_values[] = isset( $values[ $event ] ) ? $values[ $event ] : '';
			}

			// add `[[` and `]]` to the $default_events array
			$default_events = array_map(
				function ( $event ) {
					return "[[$event]]";
				}, $default_events
			);

			$values = [];

			foreach ( $data['event_codes'] as $event_code ) {
				$values[] = str_replace( $default_events, $comment_values, $event_code );
			}

			$values = apply_filters( 'swise_values_to_insert_' . $hook, $values, $hook, $result );

			if ( empty( $values ) ) {
				continue;
			}

			$spreadsheet_id = ! empty( $data['sheet_id'] ) ? $data['sheet_id'] : '';

			if ( empty( $spreadsheet_id ) ) {
				continue;
			}

			$value_range = new ValueRange();
			$value_range->setValues( [ $values ] );
			$sheet       = new GoogleSheet( $spreadsheet_id );
			$service     = $sheet->get_service();
			$sheet_title = apply_filters( 'swise_sheet_title_' . $hook, 'Sheet1', $spreadsheet_id );

			try {
				return $service->spreadsheets_values->append( $spreadsheet_id, $sheet_title, $value_range, [ 'valueInputOption' => 'USER_ENTERED' ] );
			} catch ( Exception $ex ) {
				error_log( print_r( [ 'Failed to insert data', $ex->getErrors() ], true ) );

				return false;
			}
		}
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
}
