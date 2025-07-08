# Rewrite audio links to use CloudFront CDN
def get_cdn_audio_url(file_key):
    return f'https://cdn.yourdomain.com/audio/{file_key}'