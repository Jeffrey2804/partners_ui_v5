# 🔍 GHL API Research Template

## New API: [API_NAME] (e.g., Campaigns)

### 📋 Basic Information
- **Resource Name**: campaigns
- **Base Endpoint**: `/campaigns`
- **Authorization**: Bearer token required
- **Rate Limits**: Check GHL documentation

### 🔗 Available Endpoints

#### GET Endpoints (Read)
```bash
# Get all campaigns
GET /campaigns
# Parameters: limit, offset, locationId

# Get single campaign
GET /campaigns/{campaignId}
```

#### POST Endpoints (Create)
```bash
# Create campaign
POST /campaigns
# Body: { name, type, status, settings, ... }
```

#### PUT/PATCH Endpoints (Update)
```bash
# Update campaign
PUT /campaigns/{campaignId}
# Body: { name, status, settings, ... }

# Start/Stop campaign
PATCH /campaigns/{campaignId}/status
# Body: { status: "active" | "paused" | "stopped" }
```

#### DELETE Endpoints (Delete)
```bash
# Delete campaign
DELETE /campaigns/{campaignId}
```

### 📝 Data Structure
```json
{
  "id": "string",
  "name": "string", 
  "type": "email | sms | voice",
  "status": "active | paused | stopped | draft",
  "locationId": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date",
  "settings": {
    "subject": "string",
    "content": "string",
    "schedule": "object"
  },
  "stats": {
    "sent": "number",
    "delivered": "number",
    "opened": "number",
    "clicked": "number"
  }
}
```

### 🧪 Test cURL Commands
```bash
# Test GET all campaigns
curl -X GET "https://services.leadconnectorhq.com/locations/YOUR_LOCATION_ID/campaigns" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Version: 2021-07-28"

# Test CREATE campaign
curl -X POST "https://services.leadconnectorhq.com/locations/YOUR_LOCATION_ID/campaigns" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Version: 2021-07-28" \
  --data '{
    "name": "Test Campaign",
    "type": "email",
    "status": "draft"
  }'
```

### ⚠️ Important Notes
- Required fields: name, type
- Optional fields: status (defaults to draft)
- Location-based endpoint: Uses locationId
- Permissions needed: campaigns.read, campaigns.write
