# Fix breakfast recipe image paths in data/recipes.ts
# Run this script from the Meal Planner project root.

$recipeFile = Join-Path $PSScriptRoot "data\recipes.ts"

if (-not (Test-Path $recipeFile)) {
    Write-Host "ERROR: Could not find data\recipes.ts" -ForegroundColor Red
    Write-Host "Make sure this script is in your Meal Planner project root." -ForegroundColor Yellow
    exit 1
}

# Create a backup before making any changes.
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupFile = "$recipeFile.backup-$timestamp"

Copy-Item $recipeFile $backupFile

$content = Get-Content $recipeFile -Raw

$replacements = @{
    'b001-apple-cinnamon-french-toast.png'      = 'apple-cinnamon-french-toast.png'
    'b002-blueberry-lemon-pancakes.png'         = 'blueberry-lemon-pancakes.png'
    'b003-scrambled-egg-pepper-toast.png'       = 'scrambled-egg-red-pepper-toast.png'
    'b004-strawberry-crumpets.png'              = 'strawberry-crumpets.png'
    'b005-apple-cinnamon-rice-breakfast.png'    = 'apple-cinnamon-rice-pudding.png'
    'b006-egg-herb-breakfast-sandwich.png'      = 'egg-herb-sandwich.png'
    'b007-lemon-blueberry-pancake-stack.png'    = 'lemon-blueberry-pancake-stack.png'
    'b008-peach-vanilla-rice-bowl.png'          = 'peach-vanilla-rice.png'
    'b009-savoury-egg-pepper-wrap.png'          = 'egg-pepper-wrap.png'
    'b010-apple-blueberry-breakfast-toast.png'  = 'apple-blueberry-toast.png'
    'b011-scrambled-eggs-on-toast.png'          = 'scrambled-eggs-on-toast.png'
    'b012-poached-eggs-on-toast.png'            = 'poached-eggs-on-toast.png'
    'b013-egg-and-soldiers.png'                 = 'egg-and-soldiers.png'
    'b014-sausage-and-egg-breakfast-muffin.png' = 'sausage-and-egg-breakfast-muffin.png'
    'b015-bacon-and-egg-toast.png'              = 'bacon-and-egg-toast.png'
    'b016-egg-and-cheese-crumpets.png'          = 'egg-and-cheese-crumpets.png'
    'b017-sausage-on-toast.png'                 = 'sausage-on-toast.png'
    'b018-egg-and-ham-breakfast-bagel.png'      = 'egg-and-ham-breakfast-bagel.png'
    'b019-egg-and-pepper-breakfast-bagel.png'   = 'egg-and-pepper-breakfast-bagel.png'
    'b020-apple-cinnamon-porridge.png'          = 'apple-cinnamon-porridge.png'
}

$changed = 0

foreach ($old in $replacements.Keys) {

    $new = $replacements[$old]

    if ($content.Contains($old)) {

        $content = $content.Replace($old, $new)

        $changed++

        Write-Host "Fixed: $old" -ForegroundColor Green
    }
}

Set-Content `
    -Path $recipeFile `
    -Value $content `
    -Encoding UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Breakfast image fix complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Changed $changed image paths." -ForegroundColor Green

Write-Host ""
Write-Host "Backup created:" -ForegroundColor Yellow
Write-Host $backupFile -ForegroundColor White

Write-Host ""
Write-Host "Now refresh your Meal Planner and test Pick for Me several times." -ForegroundColor Cyan