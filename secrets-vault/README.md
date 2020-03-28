## Secrets are stored in azure key vault.

Public certificates are stored by the following format:
`${sha256 hash of cerificate modulus}-cert-pem`

Private keys are stored by the following format:
`${sha256 hash of matching cerificate modulus}-private-key`
