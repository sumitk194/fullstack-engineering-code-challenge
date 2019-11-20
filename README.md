## Pre-Requisites

Make sure to install:

1. docker
1. docker-compose

## Installation Steps

Run the below mentioned command to run the application:

```
  docker network create -d bridge fullstack
  docker-compose up -d
```

## Accessibel URL

1. Front-End: http://localhost:5001
2. BACKEND SERVER: http://localhost:4000

## API Endpoints

`[POST]` /api/v1/scan/<br>
`[GET]` /api/v1/scan?page=1&limit=20<br>
`[GET]` /api/v1/scan/:id<br>

#### Note:

- We are not calling any third party API to fetch the scan report of the repositories
- Implementation of the CRON job is still pending to process the requested repositories.
- Our system at the moment is giving the option to submit the report in case of "Failure".

```
  [
    {
      "type": "sast",
      "ruleId": "G402",
      "location": {
        "path": "connectors/apigateway.go",
        "positions": {
          "begin": {
            "line": 60
          }
        }
      },
      "metadata": {
        "description": "TLS InsecureSkipVerify set true.",
        "severity": "HIGH"
      }
    },
    {
      "type": "sast",
      "ruleId": "G404",
      "location": {
        "path": "util/util.go",
        "positions": {
          "begin": {
            "line": 32
          }
        }
      },
      "metadata": {
        "description": "Use of weak random number generator (math/rand instead of crypto/rand)",
        "severity": "HIGH"
      }
    }
    ]
```

- There is still plenty of scope for the improvement, like we have missed the defaultProps, and propTypes validations for some React Components.

## Yet to be done
- Remove unused pacakges from the dashboard package.json & upgrading of the packages.
