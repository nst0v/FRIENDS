param(
  [string]$OutputDirectory = (Split-Path -Parent $PSScriptRoot)
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$ink = [System.Drawing.ColorTranslator]::FromHtml("#0d0f12")
$lime = [System.Drawing.ColorTranslator]::FromHtml("#c8ff3d")
$transparent = [System.Drawing.Color]::Transparent
$pngFormat = [System.Drawing.Imaging.ImageFormat]::Png

function New-RoundedRectanglePath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $Radius * 2
  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function New-SparklePath {
  param(
    [float]$Scale,
    [float]$Offset
  )

  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $point = {
    param([float]$X, [float]$Y)
    return [System.Drawing.PointF]::new(($X * $Scale) + $Offset, ($Y * $Scale) + $Offset)
  }

  $top = & $point 42 10
  $path.StartFigure()
  $path.AddBezier(
    $top,
    (& $point 43.4 18.5),
    (& $point 47.5 22.6),
    (& $point 56 24)
  )
  $path.AddBezier(
    (& $point 56 24),
    (& $point 47.5 25.4),
    (& $point 43.4 29.5),
    (& $point 42 38)
  )
  $path.AddBezier(
    (& $point 42 38),
    (& $point 40.6 29.5),
    (& $point 36.5 25.4),
    (& $point 28 24)
  )
  $path.AddBezier(
    (& $point 28 24),
    (& $point 36.5 22.6),
    (& $point 40.6 18.5),
    $top
  )
  $path.CloseFigure()
  return $path
}

function New-IconBitmap {
  param(
    [int]$Size,
    [ValidateSet("favicon", "app", "maskable")]
    [string]$Mode
  )

  $renderSize = [Math]::Max(512, $Size * 4)
  $pixelScale = $renderSize / 64.0
  $render = [System.Drawing.Bitmap]::new(
    $renderSize,
    $renderSize,
    [System.Drawing.Imaging.PixelFormat]::Format32bppPArgb
  )
  $graphics = [System.Drawing.Graphics]::FromImage($render)
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  if ($Mode -eq "favicon") {
    $graphics.Clear($transparent)
    $tile = New-RoundedRectanglePath `
      -X (3 * $pixelScale) `
      -Y (3 * $pixelScale) `
      -Width (58 * $pixelScale) `
      -Height (58 * $pixelScale) `
      -Radius (16 * $pixelScale)
    $tileBrush = [System.Drawing.SolidBrush]::new($lime)
    $tilePen = [System.Drawing.Pen]::new($ink, 4 * $pixelScale)
    $graphics.FillPath($tileBrush, $tile)
    $graphics.DrawPath($tilePen, $tile)
    $tilePen.Dispose()
    $tileBrush.Dispose()
    $tile.Dispose()
    $markScale = $pixelScale
    $markOffset = 0.0
  } else {
    $graphics.Clear($lime)
    if ($Mode -eq "maskable") {
      $markScale = $pixelScale * 0.72
      $markOffset = $pixelScale * 8.96
    } else {
      $markScale = $pixelScale
      $markOffset = 0.0
    }
  }

  $markBrush = [System.Drawing.SolidBrush]::new($ink)
  $sparkle = New-SparklePath -Scale $markScale -Offset $markOffset
  $graphics.FillPath($markBrush, $sparkle)

  $circlePen = [System.Drawing.Pen]::new($ink, 5.5 * $markScale)
  $circlePen.Alignment = [System.Drawing.Drawing2D.PenAlignment]::Center
  $circleDiameter = 19 * $markScale
  $circleX = ((20 - 9.5) * $markScale) + $markOffset
  $circleY = ((44 - 9.5) * $markScale) + $markOffset
  $graphics.DrawEllipse($circlePen, $circleX, $circleY, $circleDiameter, $circleDiameter)

  $circlePen.Dispose()
  $sparkle.Dispose()
  $markBrush.Dispose()
  $graphics.Dispose()

  $result = [System.Drawing.Bitmap]::new(
    $Size,
    $Size,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )
  $resultGraphics = [System.Drawing.Graphics]::FromImage($result)
  if ($Mode -eq "favicon") {
    $resultGraphics.Clear($transparent)
    $resultGraphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  } else {
    $resultGraphics.Clear($lime)
    $resultGraphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
  }
  $resultGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::GammaCorrected
  $resultGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $resultGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $resultGraphics.DrawImage(
    $render,
    [System.Drawing.Rectangle]::new(0, 0, $Size, $Size),
    0,
    0,
    $renderSize,
    $renderSize,
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $resultGraphics.Dispose()
  $render.Dispose()

  return $result
}

function Save-Png {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$Path
  )

  $Bitmap.Save($Path, $pngFormat)
  $Bitmap.Dispose()
}

function Convert-BitmapToPngBytes {
  param([System.Drawing.Bitmap]$Bitmap)

  $stream = [System.IO.MemoryStream]::new()
  $Bitmap.Save($stream, $pngFormat)
  $bytes = $stream.ToArray()
  $stream.Dispose()
  $Bitmap.Dispose()
  return ,$bytes
}

if (-not (Test-Path -LiteralPath $OutputDirectory)) {
  [System.IO.Directory]::CreateDirectory($OutputDirectory) | Out-Null
}

$favicon32 = New-IconBitmap -Size 32 -Mode "favicon"
Save-Png -Bitmap $favicon32 -Path (Join-Path $OutputDirectory "favicon-32.png")

$icoImages = foreach ($size in 16, 32, 48) {
  $bitmap = New-IconBitmap -Size $size -Mode "favicon"
  [pscustomobject]@{
    Size = $size
    Bytes = Convert-BitmapToPngBytes -Bitmap $bitmap
  }
}

$icoPath = Join-Path $OutputDirectory "favicon.ico"
$fileStream = [System.IO.File]::Open($icoPath, [System.IO.FileMode]::Create)
$writer = [System.IO.BinaryWriter]::new($fileStream)
$writer.Write([UInt16]0)
$writer.Write([UInt16]1)
$writer.Write([UInt16]$icoImages.Count)

$imageOffset = 6 + (16 * $icoImages.Count)
foreach ($image in $icoImages) {
  $writer.Write([byte]$image.Size)
  $writer.Write([byte]$image.Size)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]$image.Bytes.Length)
  $writer.Write([UInt32]$imageOffset)
  $imageOffset += $image.Bytes.Length
}

foreach ($image in $icoImages) {
  $writer.Write([byte[]]$image.Bytes)
}

$writer.Dispose()
$fileStream.Dispose()

Save-Png `
  -Bitmap (New-IconBitmap -Size 180 -Mode "app") `
  -Path (Join-Path $OutputDirectory "apple-touch-icon.png")
Save-Png `
  -Bitmap (New-IconBitmap -Size 192 -Mode "app") `
  -Path (Join-Path $OutputDirectory "icon-192.png")
Save-Png `
  -Bitmap (New-IconBitmap -Size 512 -Mode "app") `
  -Path (Join-Path $OutputDirectory "icon-512.png")
Save-Png `
  -Bitmap (New-IconBitmap -Size 512 -Mode "maskable") `
  -Path (Join-Path $OutputDirectory "icon-maskable-512.png")

Write-Output "Generated favicon and app icon assets in $OutputDirectory"
