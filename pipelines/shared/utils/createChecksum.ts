export async function createChecksum(body: string) {
  const checksumBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body))
  const checksum = Array.from(new Uint8Array(checksumBuffer), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')

  return { checksum, checksumBuffer }
}
