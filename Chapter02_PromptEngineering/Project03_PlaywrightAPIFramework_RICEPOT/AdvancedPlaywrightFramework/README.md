# AdvancedPlaywrightFramework — restful-booker API

Enterprise Playwright API automation framework built with `APIRequestContext`, following the RICE-POT prompt and anti-hallucination rules. Target API: [restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html).

## Structure

```
AdvancedPlaywrightFramework/
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── src/
│   ├── api/
│   │   ├── BaseApiClient.ts       # Reusable HTTP client (APIRequestContext wrapper)
│   │   ├── AuthApi.ts             # POST /auth
│   │   ├── BookingApi.ts          # GET/POST/PUT/PATCH/DELETE /booking
│   │   └── PingApi.ts             # GET /ping
│   ├── config/
│   │   ├── env.config.ts
│   │   └── .env.qa
│   ├── data/
│   │   └── BookingBuilder.ts      # Test data builder
│   ├── fixtures/
│   │   └── api.fixtures.ts        # Playwright fixtures (auto init/dispose)
│   └── utils/
│       ├── logger.ts
│       └── types.ts
└── tests/
    ├── auth/auth.spec.ts
    ├── booking/booking-read.spec.ts
    ├── booking/booking-crud.spec.ts
    └── ping/ping.spec.ts
```

## Setup

```powershell
cd AdvancedPlaywrightFramework
npm install
npx playwright install
```

## Run

```powershell
npm test                    # all tests
npm run test:smoke          # @smoke tagged
npm run test:regression     # @regression tagged
npm run test:auth
npm run test:booking
npm run test:ping
npm run report              # open HTML report
```

## Environment switching

```powershell
$env:TEST_ENV="qa"; npm test
```

Loads `src/config/.env.<TEST_ENV>`.

## Endpoint coverage

| Endpoint       | Method | Test file              |
| -------------- | ------ | ---------------------- |
| `/auth`        | POST   | `auth.spec.ts`         |
| `/booking`     | GET    | `booking-read.spec.ts` |
| `/booking/:id` | GET    | `booking-read.spec.ts` |
| `/booking`     | POST   | `booking-crud.spec.ts` |
| `/booking/:id` | PUT    | `booking-crud.spec.ts` |
| `/booking/:id` | PATCH  | `booking-crud.spec.ts` |
| `/booking/:id` | DELETE | `booking-crud.spec.ts` |
| `/ping`        | GET    | `ping.spec.ts`         |

## Design

- `BaseApiClient` centralises context lifecycle, default headers, logging and error handling (try/catch on every verb).
- API classes (`AuthApi`, `BookingApi`, `PingApi`) extend the base and expose typed methods.
- Fixtures auto-create and dispose contexts per test — no duplicated setup.
- `BookingBuilder` (builder pattern) for deterministic + random test data, no hardcoding inside tests.
- All assertions traceable to restful-booker API documentation (no invented endpoints/fields).
