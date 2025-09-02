# Test script for LinkedIn Agent API
Write-Host "Testing LinkedIn Agent API..." -ForegroundColor Green

# Test health endpoint
Write-Host "`nTesting health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
    Write-Host "Health Check: $($health.status)" -ForegroundColor Green
    Write-Host "Environment: $($health.env)" -ForegroundColor Cyan
    Write-Host "XAI Configured: $($health.xaiConfigured)" -ForegroundColor Cyan
} catch {
    Write-Host "Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test user endpoint
Write-Host "`nTesting user endpoint..." -ForegroundColor Yellow
try {
    $user = Invoke-RestMethod -Uri "http://localhost:5000/api/user" -Method GET
    Write-Host "User: $($user.name)" -ForegroundColor Green
    Write-Host "Plan: $($user.plan)" -ForegroundColor Cyan
} catch {
    Write-Host "User endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test content generation
Write-Host "`nTesting content generation..." -ForegroundColor Yellow
$contentData = @{
    contentType = "Professional Insight"
    targetAudience = "Software Developers"
    keywords = "AI and Machine Learning"
} | ConvertTo-Json

try {
    $content = Invoke-RestMethod -Uri "http://localhost:5000/api/generate-content" -Method POST -Body $contentData -ContentType "application/json"
    Write-Host "Content generated successfully!" -ForegroundColor Green
    Write-Host "Preview: $($content.content.Substring(0, 100))..." -ForegroundColor Cyan
    Write-Host "Engagement Prediction: $($content.engagementPrediction)" -ForegroundColor Cyan
} catch {
    Write-Host "Content generation failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAPI Testing Complete!" -ForegroundColor Green
