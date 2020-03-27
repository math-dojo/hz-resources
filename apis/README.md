# Important Information about APIs

## Notes for request signature api

The key_id used in the request signature configuration of all apis is based on the following operation:

```sh
openssl x509 -noout -modulus -in ${THE_CERT_FILE.PEM} | openssl sha256
```

The generated hash is used as the identifier of that certificate (`kid` as per https://tools.ietf.org/html/rfc7517#section-4.5) within the jwks response of the upstream signatures api
