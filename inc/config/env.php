<?php
declare(strict_types=1);

/**
 * Environment Configuration
 *
 * Defines core environment constants and provides environment detection functionality
 */

// Development mode configuration
const IS_VITE_DEVELOPMENT = true;
const VITE_SERVER = 'http://localhost:5171';
const DIST_FOLDER = 'build';
const DIST_PATH = DIST_FOLDER;


/**
* Environment information structure
*
* @return array{
*     env: 'production'|'local',
*     url: string
* }
*/
function get_env(): array {
    $local_ips = [
        '127.0.0.1',
        '::1'
    ];

    $is_https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] === 443;

    $protocol = $is_https ? 'https://' : 'http://';
    $url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    return [
        'env' => in_array($_SERVER['REMOTE_ADDR'], $local_ips, true) ? 'local' : 'production',
        'url' => $url
    ];
}
