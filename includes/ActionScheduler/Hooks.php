<?php
namespace SheetWise\ActionScheduler;

use SheetWise\Admin\GoogleSheet;
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

		add_action( 'swise_gs_data', [ $this, 'insert_into_google_sheet' ], 10, 2 );
	}

	public function process_data( $args ) {
		if ( empty( $args['hook'] || empty( $args['values'] || $args['type'] ) ) ) {
			return;
		}

		$processed_data = [];

		switch ( $args['type'] ) {
			case 'post':
				$processed_data = $this->get_post_data_for_google_sheet( $args );
				break;

			case 'user':
				$processed_data = $this->get_user_data_for_google_sheet( $args );
				break;
		}

		do_action( 'swise_gs_data', $processed_data, $args );
	}

	public function insert_into_google_sheet( $values, $args ) {
		if ( empty( $values ) || ! is_array( $values ) || empty( $args['sheet_id'] ) ) {
			return;
		}

		$default = [
			'range'   => 'Sheet1',
			'options' => [ 'valueInputOption' => 'USER_ENTERED' ],
		];

		$args     = wp_parse_args( $args, $default );
		$sheet_id = ! empty( $args['sheet_id'] ) ? $args['sheet_id'] : 0;

		$value_range = new ValueRange();
		$value_range->setValues( [ $values ] );
		$sheet = new GoogleSheet( $sheet_id );
		$service = $sheet->get_service();

		// append data in the first sheet of the spreadsheet
		$service->spreadsheets_values->append( $sheet_id, $args['range'], $value_range, $args['options'] );
	}

	private function get_post_data_for_google_sheet( $args ) {
		$all_event_codes = swise_get_data_source_events();
		if ( ! array_key_exists( $args['hook'], $all_event_codes ) ) {
			return [];
		}

		$post_values = [];
		$default_events = array_keys( $all_event_codes[ $args['hook'] ] );

		foreach ( $default_events as $event ) {
			if ( isset( $args['values'][ $event ] ) ) {
				$post_values[] = $args['values'][ $event ];
			}
		}

		// add `[[` and `]]` to the $default_events array
		$default_events = array_map(
			function ( $event ) {
				return "[[$event]]";
			}, $default_events
		);

		$values = [];

		foreach ( $args['event_codes'] as $event_code ) {
			$values[] = str_replace( $default_events, $post_values, $event_code );
		}

		return $values;
	}

	private function get_user_data_for_google_sheet( $values ) {
		return [];
	}
}
