#!/usr/bin/env node
// One-off helper: set a GitHub Actions secret on the repo via the REST API.
// Usage: node scripts/set-github-secret.mjs <NAME> <VALUE>

import sodium from 'libsodium-wrappers';

const REPO = 'maefigma-crypto/megajom-mega-site';
const PAT = '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';

const [, , name, value] = process.argv;
if (!name || !value) {
  console.error('Usage: node set-github-secret.mjs <NAME> <VALUE>');
  process.exit(1);
}

async function main() {
  await sodium.ready;

  const pk = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/public-key`, {
    headers: { Authorization: `Bearer ${PAT}`, Accept: 'application/vnd.github+json' },
  }).then((r) => r.json());

  if (!pk?.key) {
    console.error('Failed to fetch public key:', pk);
    process.exit(1);
  }

  const messageBytes = sodium.from_string(value);
  const keyBytes = sodium.from_base64(pk.key, sodium.base64_variants.ORIGINAL);
  const encryptedBytes = sodium.crypto_box_seal(messageBytes, keyBytes);
  const encrypted_value = sodium.to_base64(encryptedBytes, sodium.base64_variants.ORIGINAL);

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/actions/secrets/${encodeURIComponent(name)}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${PAT}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ encrypted_value, key_id: pk.key_id }),
    },
  );

  if (res.status === 201 || res.status === 204) {
    console.log(`✅ ${name} set (status ${res.status})`);
  } else {
    console.error(`❌ ${name} failed:`, res.status, await res.text());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
