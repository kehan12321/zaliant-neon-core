// License key generation utility
export function generateLicenseKey(productId: string): string {
  const segments = [
    generateSegment(4),
    generateSegment(4),
    generateSegment(4),
    generateSegment(4),
  ];
  
  return segments.join('-');
}

function generateSegment(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

export function generateMultipleLicenseKeys(
  productId: string,
  quantity: number
): string[] {
  const keys: string[] = [];
  
  for (let i = 0; i < quantity; i++) {
    keys.push(generateLicenseKey(productId));
  }
  
  return keys;
}

export interface License {
  key: string;
  productId: string;
  productTitle: string;
  activatedAt: string | null;
  expiresAt: string | null;
  status: 'active' | 'inactive' | 'expired';
}

export function createLicense(
  key: string,
  productId: string,
  productTitle: string
): License {
  return {
    key,
    productId,
    productTitle,
    activatedAt: new Date().toISOString(),
    expiresAt: null, // Set based on subscription type
    status: 'active',
  };
}
