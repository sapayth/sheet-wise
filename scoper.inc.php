<?php

use Isolated\Symfony\Component\Finder\Finder;

return [
	'prefix'     => 'SheetWise\Scoped',
	'output-dir' => 'scoped',
	'finders'    => [
		Finder::create()->files()->in( 'vendor/firebase' ),
		Finder::create()->files()->in( 'vendor/google' ),
		Finder::create()->files()->in( 'vendor/guzzlehttp' ),
		Finder::create()->files()->in( 'vendor/monolog' ),
		Finder::create()->files()->in( 'vendor/psr' ),
	],
];
