**Start by setting up the [backend](https://github.com/Mentor-Canada/Opportunity-and-Resource-Connector-Backend)**

# Opportunity And Resource Connector Frontend

## Getting started

```bash
docker-compose up -d
npm install
npx webpack
```

## Environment variables

```bash
npx webpack --env var1=value --env var2 # var2 = true
```

| Variable | Choices/Defaults          | Comments                                                                                        | 
|----------|---------------------------|-------------------------------------------------------------------------------------------------|
| api_url  | **http://localhost:8081** |                                                                                                 |
| mock     | true<br/>**false**        | Substitute requests with mock data.<br/><br/>*See ./src/mock/mock.ts for more info.*   |

## Usage

Navigate to http://localhost:8080. Admin account is 'admin@example.com', the password is 'admin123'.

## Testing

Create small, medium, and large screenshots for manual review.

```bash
CYPRESS_BASE_URL=http://localhost:8080 npm run screenshots
```
