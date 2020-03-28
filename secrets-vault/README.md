## Secrets are stored in azure key vault.

Public certificates are stored by the following format:
`${sha256 hash of cerificate modulus}-cert-pem` - file
`${sha256 hash of cerificate modulus}-b64-cert-pem`- base64 encoded version of the file

Private keys are stored by the following format:
`${sha256 hash of matching cerificate modulus}-private-key`
