// jshint esversion:6
const tykApiResponseData = {
    "api_model": {},
    "api_definition": {
        "id": "54b53e47eba6db5c70000002",
        "name": "Nitrous Test",
        "api_id": "39d2c98be05c424371c600bd8b3e2242",
        "org_id": "54b53d3aeba6db5c35000002",
        "use_keyless": false,
        "use_oauth2": false,
        "oauth_meta": {
            "allowed_access_types": [],
            "allowed_authorize_types": [
                "token"
            ],
            "auth_login_redirect": ""
        },
        "auth": {
            "auth_header_name": "authorization"
        },
        "use_basic_auth": false,
        "notifications": {
            "shared_secret": "",
            "oauth_on_keychange_url": ""
        },
        "enable_signature_checking": false,
        "definition": {
            "location": "header",
            "key": ""
        },
        "version_data": {
            "not_versioned": true,
            "versions": {
                "Default": {
                    "name": "Default",
                    "expires": "",
                    "paths": {
                        "ignored": [],
                        "white_list": [],
                        "black_list": []
                    },
                    "use_extended_paths": false,
                    "extended_paths": {
                        "ignored": [],
                        "white_list": [],
                        "black_list": []
                    }
                }
            }
        },
        "proxy": {
            "listen_path": "/39d2c98be05c424371c600bd8b3e2242/",
            "target_url": "http://tyk.io",
            "strip_listen_path": true
        },
        "custom_middleware": {
            "pre": null,
            "post": null
        },
        "session_lifetime": 0,
        "active": true,
        "auth_provider": {
            "name": "",
            "storage_engine": "",
            "meta": null
        },
        "session_provider": {
            "name": "",
            "storage_engine": "",
            "meta": null
        },
        "event_handlers": {
            "events": {}
        },
        "enable_batch_request_support": false,
        "enable_ip_whitelisting": false,
        "allowed_ips": [],
        "expire_analytics_after": 0
    },
    "hook_references": []
};

const tykDeleteApiResponseData = {"Status":"OK","Message":"API deleted","Meta":null};

module.exports.tykApiResponseData = tykApiResponseData;
module.exports.tykDeleteApiResponse = tykDeleteApiResponseData;
