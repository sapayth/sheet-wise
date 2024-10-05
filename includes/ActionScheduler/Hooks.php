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
			add_action( 'sheetwise_scheduled_' . $action, [ $this, 'insert_into_google_sheet' ] );
		}
	}

	public function insert_into_google_sheet( $args ) {
		$default = [
			'range'   => 'Sheet1',
			'options' => [ 'valueInputOption' => 'USER_ENTERED' ],
		];

		$args     = wp_parse_args( $args, $default );
		$values   = ! empty( $args['values'] ) ? $args['values'] : [];
		$sheet_id = ! empty( $args['sheet_id'] ) ? $args['sheet_id'] : 0;

		if ( empty( $values ) || empty( $sheet_id ) ) {
			return;
		}

		$value_range = new ValueRange();
		$value_range->setValues( [ $values ] );
		$sheet = new GoogleSheet( $sheet_id );
		$service = $sheet->get_service();

		// append data in the first sheet of the spreadsheet
		$service->spreadsheets_values->append( $sheet_id, $args['range'], $value_range, $args['options'] );
	}

}
