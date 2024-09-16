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
		Finder::create()->files()->in( 'vendor/paragonie' ),
		Finder::create()->files()->in( 'vendor/phpcompatibility' ),
		Finder::create()->files()->in( 'vendor/phpcsstandards' ),
		Finder::create()->files()->in( 'vendor/phpseclib' ),
		Finder::create()->files()->in( 'vendor/psr' ),
		Finder::create()->files()->in( 'vendor/ralouphie' ),
		Finder::create()->files()->in( 'vendor/squizlabs' ),
		Finder::create()->files()->in( 'vendor/symfony' ),
	],
];
