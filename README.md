# Open Order Status

This report can be included in other pages with the following requirements:
- The container element has `id="apps-open-order-status"`
- The manifest file is included from `/apps/open-order-status/public/js/manifest.json`
- See examples below

## Optional Container Attributes
| Attribute             | Value Type | Description                                    |
|-----------------------|------------|------------------------------------------------|
| data-show-edi         | `boolean`  | Sets the default value for "Show EDI" checkbox |
| data-show-web         | `boolean`  | Sets the default value for "Show Web" checkbox |
| data-default-days     | `number`   | Sets the default value Order Date range        |
| data-refresh-interval | `number`   | Sets the default refresh interval (in minutes) |



```html
<!-- file: body.php -->
<div class="row g-3">
    <div class="col-12 col-lg-8">
        <div id="apps-open-order-status"  
             data-show-edi="false" data-show-web="true" 
             data-default-days="3" data-refresh-interval="10">
            <div class="alert alert-info">Loading Open Order Status</div>
        </div>
    </div>
    <div class="col-12 col-lg-4">
        <!-- other content here -->
    </div>
</div>
```

```php
// file: index.php
use chums\ui\WebUI2
use chums\user\Groups;

$ui = new WebUI2([
    'requiredRoles' => [Groups::PRODUCTION, Groups::CS, Groups::IMPRINT, Groups::SALES] 
]);
$ui->addManifestJSON('/apps/open-order-status/js/manifest.json')
    ->addCSS('/apps/open-order-status/public/styles.css');
    
// add other content info here.

$ui->render();
```
