# Detects user location and assigns currency/price

def get_price_by_region(ip_address):
    region_map = {'US': '$10', 'SA': '﷼35', 'IN': '₹500'}
    return region_map.get('SA', '$10')