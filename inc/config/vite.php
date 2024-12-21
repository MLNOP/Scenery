<?php
declare(strict_types=1);

/**
 * Vite Integration Configuration
 *
 * Handles asset management and integration with Vite development server
 */

require_once __DIR__ . '/env.php';

/**
 * Fetch asset information from Vite manifest
 *
 * @param string $filePath Path to the asset file
 * @return array{
 *     path: string,
 *     css?: array<string>
 * }
 */
function vite_fetch_asset_from_manifest(string $filePath): array {
    $manifest_path = DIST_PATH . '/manifest.json';

    if (!file_exists($manifest_path)) {
        return ['path' => ''];
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);
    if (!is_array($manifest)) {
        return ['path' => ''];
    }

    $fileName = basename($filePath);
    $fileKey = array_filter(
        array_keys($manifest),
        fn(string $asset): bool => str_contains($asset, $fileName)
    );

    if (empty($fileKey)) {
        return ['path' => ''];
    }

    $firstKey = array_values($fileKey)[0];
    $asset = $manifest[$firstKey];

    $result = [
        'path' => DIST_PATH . "/{$asset['file']}"
    ];

    if (isset($asset['css']) && !empty($asset['css'])) {
        $result['css'] = array_map(
            fn(string $css): string => DIST_PATH . "/{$css}",
            $asset['css']
        );
    }

    return $result;
}

/**
 * Enqueue a style asset
 *
 * @param string $filePath Path to the style file
 * @return void
 */
function vite_enqueue_style(string $filePath): void {
    if (IS_VITE_DEVELOPMENT) {
        echo sprintf(
            '<link rel="stylesheet" href="%s/%s">',
            VITE_SERVER,
            $filePath
        );
        return;
    }

    $manifestFileInfos = vite_fetch_asset_from_manifest($filePath);
    if (empty($manifestFileInfos['path'])) {
        throw new RuntimeException("No build file found for asset \"{$filePath}\"");
    }

    echo sprintf(
        '<link rel="stylesheet" type="text/css" href="%s">',
        $manifestFileInfos['path']
    );
}

/**
 * Enqueue a script asset
 *
 * @param string $filePath Path to the script file
 * @param bool $inHead Whether to load the script in head with defer
 * @return void
 */
function vite_enqueue_script(string $filePath, bool $inHead = false): void {
    $defer = $inHead ? 'defer="true"' : '';

    if (IS_VITE_DEVELOPMENT) {
        echo sprintf(
            '<script type="module" crossorigin src="%s/%s"></script>',
            VITE_SERVER,
            $filePath
        );
        return;
    }

    $manifestFileInfos = vite_fetch_asset_from_manifest($filePath);
    if (empty($manifestFileInfos['path'])) {
        throw new RuntimeException("No build file found for asset \"{$filePath}\"");
    }

    // Enqueue associated CSS files if any
    if (isset($manifestFileInfos['css'])) {
        foreach ($manifestFileInfos['css'] as $cssPath) {
            echo sprintf(
                '<link rel="stylesheet" type="text/css" href="%s">',
                $cssPath
            );
        }
    }

    echo sprintf(
        '<script %s type="module" src="%s"></script>',
        $defer,
        $manifestFileInfos['path']
    );
}
