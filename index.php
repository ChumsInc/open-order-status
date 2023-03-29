<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");
require_once ('access.inc.php');

$bodyPath = "/apps/open-order-status";

$ui = new WebUI($bodyPath, 'Open Order Status', '', true, 5);
$ui->bodyClassName = 'container-fluid';
$ui->AddCSS("public/styles.css");
$ui->addManifest('public/js/manifest.json');
$ui->Send();
/**
 * Changelog:
 */


