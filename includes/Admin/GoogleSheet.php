<?php

namespace SheetWise\Admin;

use Google\Client;
use Google\Service\Drive;
use Google\Service\Sheets;
use Google_Service_Drive;

class GoogleSheet {
	/**
	 * Creates and return the Google API Client. Returns null if failed to create the client
	 *
	 * @since 1.1.1
	 *
	 * @param $scopes
	 *
	 */
	private function get_client( $scopes = [] ) {
		$credential = get_option( 'swise_service_account_credential', false );

		if ( ! $credential ) {
			return null;
		}

		$credential = json_decode( $credential, true );

		$default_scopes = [
			'https://www.googleapis.com/auth/drive',
			'https://www.googleapis.com/auth/spreadsheets',
		];

		$scopes = array_merge( $scopes, $default_scopes );

		return new Client(
			[
				'credentials' => $credential,
				'scopes'      => $scopes,
			]
		);
	}

	/**
	 * Get all the spreadsheets of the user
	 *
	 * @since 1.1.1
	 *
	 * @param array $args
	 *
	 * @return array
	 */
	public function get_all( $args = [] ) {
		$list = [];

		$default = [
			'q' => "mimeType='application/vnd.google-apps.spreadsheet'",
		];

		$args   = wp_parse_args( $args, $default );
		$client = $this->get_client();

		if ( is_null( $client ) ) {
			return $list;
		}

		// get the spreadsheet files of the user
		$service    = new Drive( $client );
		$list_files = $service->files->listFiles( $args );

		if ( ! is_a( $list_files, 'Google\Service\Drive\FileList' ) ) {
			return $list;
		}

		// get only the spreadsheets
		$files = $list_files->getFiles();

		foreach ( $files as $file ) {
			if ( $file->getMimeType() !== 'application/vnd.google-apps.spreadsheet' ) {
				continue;
			}

			$list[] = [
				'id'   => $file->getId(),
				'name' => $file->getName(),
			];
		}

		return $list;
	}
}
