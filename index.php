<?php

use chums\ui\WebUI2;
use chums\user\Groups;

require_once ("autoload.inc.php");

$ui = new WebUI2([
    'requiredRoles' => [Groups::PRODUCTION, Groups::CS, Groups::IMPRINT, Groups::SALES],
    'bodyClassName' => 'container-fluid',
    'title' => "Open Order Status",
    'contentFile' => 'body.inc.php',
]);

$ui->addCSS('public/styles.css')
    ->addManifestJSON('public/js/manifest.json')
    ->render();
