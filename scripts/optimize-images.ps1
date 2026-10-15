Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

function Resize-Jpeg {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$MaxWidth = 1800,
        [int]$Quality = 82
    )

    $img = [System.Drawing.Image]::FromFile($InputPath)
    try {
        $ratio = $img.Width / [double]$img.Height
        $newWidth = [Math]::Min($img.Width, $MaxWidth)
        $newHeight = [int][Math]::Round($newWidth / $ratio)

        $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        try {
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            try {
                $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            } finally {
                $g.Dispose()
            }

            $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
            $bmp.Save($OutputPath, $jpegCodec, $params)
        } finally {
            $bmp.Dispose()
        }
    } finally {
        $img.Dispose()
    }
}

function Copy-Png {
    param([string]$InputPath, [string]$OutputPath, [int]$MaxWidth = 1200)

    $img = [System.Drawing.Image]::FromFile($InputPath)
    try {
        if ($img.Width -le $MaxWidth) {
            Copy-Item -LiteralPath $InputPath -Destination $OutputPath -Force
            return
        }
        $ratio = $img.Width / [double]$img.Height
        $newWidth = $MaxWidth
        $newHeight = [int][Math]::Round($newWidth / $ratio)

        $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        try {
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            try {
                $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            } finally {
                $g.Dispose()
            }
            $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        } finally {
            $bmp.Dispose()
        }
    } finally {
        $img.Dispose()
    }
}

$src = Join-Path $PSScriptRoot '..\assets'
$dst = Join-Path $PSScriptRoot '..\public\images'
New-Item -ItemType Directory -Force -Path $dst | Out-Null

$jpegMap = @{
    'best_shot_of_band.JPG'                    = 'band-hero.jpg'
    'better_shot_of_band.jpg'                  = 'band-portrait.jpg'
    'ok_shot_of_band.jpg'                      = 'band-wide.jpg'
    'band_in_studio.jpg'                       = 'band-studio.jpg'
    'band_in_studio_2.jpg'                     = 'band-studio-2.jpg'
    'band_performing_musicians_easy_to_see.jpg' = 'band-live.jpg'
    'band_performing_visible_crowd.jpg'        = 'band-live-crowd.jpg'
    'best_shot_of_crowd.jpg'                   = 'crowd.jpg'
    '3am_club_album_cover.jpg'                 = '3am-club.jpg'
}

$pngMap = @{
    'band_logo_wide_one_line.png'                             = 'logo-wide.png'
    'band_logo_2_black_text_no_background.png'                = 'logo-black.png'
    'typical_band_logo_white_words_black_background.png'      = 'logo-white.png'
}

foreach ($pair in $jpegMap.GetEnumerator()) {
    $inPath = Join-Path $src $pair.Key
    $outPath = Join-Path $dst $pair.Value
    if (-not (Test-Path -LiteralPath $inPath)) {
        Write-Host "SKIP missing: $($pair.Key)"
        continue
    }
    $maxW = if ($pair.Value -eq '3am-club.jpg') { 1200 } else { 1800 }
    Write-Host "Resize $($pair.Key) -> $($pair.Value) (max $maxW px)"
    Resize-Jpeg -InputPath $inPath -OutputPath $outPath -MaxWidth $maxW -Quality 82
    $sz = [Math]::Round((Get-Item $outPath).Length / 1KB, 1)
    Write-Host "  wrote ${sz} KB"
}

foreach ($pair in $pngMap.GetEnumerator()) {
    $inPath = Join-Path $src $pair.Key
    $outPath = Join-Path $dst $pair.Value
    if (-not (Test-Path -LiteralPath $inPath)) {
        Write-Host "SKIP missing: $($pair.Key)"
        continue
    }
    Write-Host "Copy $($pair.Key) -> $($pair.Value)"
    Copy-Png -InputPath $inPath -OutputPath $outPath -MaxWidth 1200
    $sz = [Math]::Round((Get-Item $outPath).Length / 1KB, 1)
    Write-Host "  wrote ${sz} KB"
}

# Favicon from the black-text logo
$faviconSrc = Join-Path $src 'band_logo_2_black_text_no_background.png'
$faviconDst = Join-Path $PSScriptRoot '..\public\favicon.png'
if (Test-Path -LiteralPath $faviconSrc) {
    Copy-Png -InputPath $faviconSrc -OutputPath $faviconDst -MaxWidth 128
    Write-Host "Favicon written"
}

Write-Host "Done."
