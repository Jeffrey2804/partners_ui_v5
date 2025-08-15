# 🚀 Process: Adding New GHL API Endpoints

## 📋 Overview
This document outlines the **exact step-by-step process** to add new cURL APIs (campaigns, notes, tags, workflows, etc.) to your GHL integration system.

## ⚡ **Quick Process Summary**
```
1. Research API → 2. Create Service → 3. Add to Integration → 4. Update Hook → 5. Test & Use
```

---

## **Step 1: Research the GHL API Endpoint** 📋

### 1.1 Use the Research Template
Copy and fill out `API_RESEARCH_TEMPLATE.md` for your new API:

```markdown
## New API: [YOUR_API_NAME] (e.g., Notes, Tags, Workflows)

### 📋 Basic Information
- Resource Name: notes
- Base Endpoint: `/contacts/{contactId}/notes`
- Authorization: Bearer token required
- Location-based: Yes/No

### 🔗 Available Endpoints
#### GET (Read)
- GET /contacts/{contactId}/notes
- GET /notes/{noteId}

#### POST (Create)  
- POST /contacts/{contactId}/notes

#### PUT/PATCH (Update)
- PUT /notes/{noteId}

#### DELETE (Delete)
- DELETE /notes/{noteId}

### 📝 Data Structure
{
  "id": "string",
  "contactId": "string",
  "userId": "string",
  "body": "string",
  "dateAdded": "ISO date"
}

### 🧪 Test cURL Commands
# Test basic GET
curl -X GET "https://services.leadconnectorhq.com/contacts/CONTACT_ID/notes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Version: 2021-07-28"
```

### 1.2 Test the API with cURL
1. Replace placeholders with real values
2. Test GET endpoint first 
3. Verify response structure
4. Test POST with minimal data
5. Check permissions needed

---

## **Step 2: Create Individual API Service** 🔧

### 2.1 Create the Service File
Create `./my-dashboard/src/shared/services/api/[RESOURCE]Api.js`

**Example:** `./my-dashboard/src/shared/services/api/notesApi.js`

### 2.2 Follow the Pattern
Copy the structure from `campaignApi.js` and adapt:

```javascript
// ========================================
// 🎯 [RESOURCE] API SERVICE
// ========================================

import { toast } from 'react-hot-toast';
import { createLogger } from '@utils/logger';
import { GHL_CONFIG, getGHLHeaders } from '@config/ghlConfig';

const notesLogger = createLogger('NotesAPI');

class NotesApiService {
  constructor() {
    this.config = GHL_CONFIG;
    this.logger = notesLogger;
    // Adjust baseUrl based on your research
    this.baseUrl = `${this.config.locationUrl}/contacts`;
  }

  // ========================================================================
  // 📥 READ OPERATIONS
  // ========================================================================

  async fetchNotes(contactId, filters = {}) {
    try {
      const url = `${this.baseUrl}/${contactId}/notes`;
      // ... implement following campaignApi pattern
    } catch (error) {
      // ... error handling
    }
  }

  async fetchNoteById(noteId) {
    // ... implement
  }

  // ========================================================================
  // 📤 CREATE OPERATIONS
  // ========================================================================

  async createNote(contactId, noteData) {
    // ... implement
  }

  // ========================================================================
  // 📝 UPDATE OPERATIONS  
  // ========================================================================

  async updateNote(noteId, updates) {
    // ... implement
  }

  // ========================================================================
  // 🗑️ DELETE OPERATIONS
  // ========================================================================

  async deleteNote(noteId) {
    // ... implement
  }

  // ========================================================================
  // 🧪 TESTING
  // ========================================================================

  async testNotesApiConnection() {
    // ... implement
  }
}

const notesApi = new NotesApiService();
export default notesApi;
```

### 2.3 Key Adaptations
- **Change class name**: `NotesApiService`
- **Update endpoints**: Based on your research
- **Adjust baseUrl**: Location-based vs company-based
- **Modify data cleaning**: Resource-specific validation
- **Update logger name**: `NotesAPI`

---

## **Step 3: Add to GHL Integration Service** 🔗

### 3.1 Import the New Service
In `./my-dashboard/src/shared/services/api/ghlIntegrationService.js`:

```javascript
// Import existing API services
import contactApi from './contactApi';
import taskApi from './taskApi';
import pipelineApi from './pipelineApi';
import calendarApi from './calendarApi';
import userApi from './userApi';
import campaignApi from './campaignApi';
import notesApi from './notesApi'; // ← ADD THIS
import apiService from './apiService';
```

### 3.2 Add Endpoint to Constructor
```javascript
// Resource endpoints
this.endpoints = {
  contacts: `/contacts`,
  tasks: `/tasks`,
  users: `/users`,
  calendar: `/calendars`,
  pipeline: `/opportunities`,
  workflows: `/workflows`,
  campaigns: `/campaigns`,
  notes: `/notes`, // ← ADD THIS
  locations: `/locations`,
  companies: `/companies`
};
```

### 3.3 Add Resource-Specific Methods
Add after the `campaigns` section:

```javascript
/**
 * 📝 Notes Operations
 */
notes = {
  get: (id) => notesApi.fetchNoteById(id),
  getAll: (contactId, filters = {}) => notesApi.fetchNotes(contactId, filters),
  getByContact: (contactId) => notesApi.fetchNotes(contactId),
  create: (contactId, data) => notesApi.createNote(contactId, data),
  update: (id, data) => notesApi.updateNote(id, data),
  delete: (id) => notesApi.deleteNote(id),
  test: () => notesApi.testNotesApiConnection()
};
```

---

## **Step 4: Update API Services Index** 📁

In `./my-dashboard/src/shared/services/api/index.js`:

```javascript
// Core API services
export { default as apiService } from './apiService';
export { default as calendarApi } from './calendarApi';
export { default as campaignApi } from './campaignApi';
export { default as contactApi } from './contactApi';
export { default as notesApi } from './notesApi'; // ← ADD THIS
export { default as pipelineApi } from './pipelineApi';
export { default as taskApi } from './taskApi';
export { default as userApi } from './userApi';
```

---

## **Step 5: Update React Hook** ⚛️

### 5.1 Add Operations to Hook
In `./my-dashboard/src/hooks/useGHLIntegration.js`, add after `campaigns`:

```javascript
// ========================================================================
// 📝 NOTES OPERATIONS
// ========================================================================

const notes = {
  // Get single note
  get: useCallback(async (id) => {
    return handleOperation(
      () => ghlIntegration.notes.get(id),
      null
    );
  }, [handleOperation]),

  // Get all notes for contact
  getAll: useCallback(async (contactId, filters = {}) => {
    return handleOperation(
      () => ghlIntegration.notes.getAll(contactId, filters),
      null
    );
  }, [handleOperation]),

  // Create note
  create: useCallback(async (contactId, noteData) => {
    return handleOperation(
      () => ghlIntegration.notes.create(contactId, noteData),
      `✅ Note created successfully!`
    );
  }, [handleOperation]),

  // Update note
  update: useCallback(async (id, updates) => {
    return handleOperation(
      () => ghlIntegration.notes.update(id, updates),
      `✅ Note updated successfully!`
    );
  }, [handleOperation]),

  // Delete note
  delete: useCallback(async (id) => {
    return handleOperation(
      () => ghlIntegration.notes.delete(id),
      `✅ Note deleted successfully!`
    );
  }, [handleOperation])
};
```

### 5.2 Add to Return Object
```javascript
return {
  // State
  loading,
  error,
  
  // Operations by resource
  contacts,
  tasks,
  pipeline,
  calendar,
  campaigns,
  notes, // ← ADD THIS
  users,
  
  // Bulk operations
  bulk,
  
  // Diagnostics
  diagnostics,
  
  // Direct access to service (for advanced use)
  service: ghlIntegration
};
```

---

## **Step 6: Test & Use** 🧪

### 6.1 Test the Integration
```javascript
import { useGHLIntegration } from '@shared/hooks';

const TestComponent = () => {
  const { notes, diagnostics } = useGHLIntegration();

  useEffect(() => {
    const testNotes = async () => {
      try {
        // Test connection
        const test = await notes.test?.();
        console.log('Notes API test:', test);

        // Test get all notes for a contact
        const contactNotes = await notes.getAll('contact-id-123');
        console.log('Contact notes:', contactNotes);

        // Test create note
        const newNote = await notes.create('contact-id-123', {
          body: 'Test note from integration'
        });
        console.log('Created note:', newNote);
      } catch (error) {
        console.error('Notes test failed:', error);
      }
    };

    testNotes();
  }, []);

  // ... rest of component
};
```

### 6.2 Use in Your Components
```javascript
const ContactDetail = ({ contactId }) => {
  const { notes } = useGHLIntegration();
  const [contactNotes, setContactNotes] = useState([]);

  const loadNotes = async () => {
    const data = await notes.getAll(contactId);
    setContactNotes(data || []);
  };

  const addNote = async (noteText) => {
    await notes.create(contactId, { body: noteText });
    loadNotes(); // Refresh
  };

  return (
    <div>
      {contactNotes.map(note => (
        <div key={note.id}>
          <p>{note.body}</p>
          <button onClick={() => notes.delete(note.id).then(loadNotes)}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={() => addNote('New note')}>Add Note</button>
    </div>
  );
};
```

---

## **🎯 Quick Checklist for New APIs**

When adding any new API (notes, tags, workflows, etc.):

### ✅ **Files to Create/Update:**
1. **Create**: `./src/shared/services/api/[resource]Api.js`
2. **Update**: `./src/shared/services/api/ghlIntegrationService.js`
3. **Update**: `./src/shared/services/api/index.js`
4. **Update**: `./src/hooks/useGHLIntegration.js`

### ✅ **What to Change:**
1. **Resource name** (notes, tags, workflows)
2. **Class name** (`NotesApiService`)
3. **Logger name** (`NotesAPI`)
4. **Base URL** (location-based vs company-based)
5. **Endpoints** (match GHL API structure)
6. **Data validation** (resource-specific cleaning)
7. **Hook operations** (resource-specific methods)

### ✅ **Testing Steps:**
1. **cURL test** → **Service test** → **Hook test** → **Component test**
2. Test all CRUD operations
3. Check error handling
4. Verify toast notifications
5. Test with real data

---

## **📋 Common GHL APIs to Add**

Here are common GHL APIs you might want to add:

### 🏷️ **Tags API**
- Endpoint: `/contacts/{contactId}/tags`
- Operations: get, add, remove
- Use case: Lead categorization

### 📝 **Notes API** 
- Endpoint: `/contacts/{contactId}/notes`
- Operations: CRUD
- Use case: Contact history

### 🔄 **Workflows API**
- Endpoint: `/workflows`
- Operations: trigger, get status
- Use case: Automation

### 📧 **Email Templates API**
- Endpoint: `/templates`
- Operations: get, create, update
- Use case: Email campaigns

### 📞 **Call Logs API**
- Endpoint: `/contacts/{contactId}/calls`
- Operations: get, create
- Use case: Call tracking

### 💬 **Conversations API**
- Endpoint: `/conversations`
- Operations: get, send message
- Use case: Chat/SMS

---

## **🚨 Important Notes**

### **API Permissions**
- Each API requires specific permissions in your GHL token
- Test permissions with simple GET requests first
- Update token if you get 403/401 errors

### **Rate Limits**
- GHL has rate limits (~1000 requests/minute)
- Implement appropriate delays for bulk operations
- Monitor your usage in GHL dashboard

### **Data Validation**
- Each resource has different required fields
- Some fields are read-only (id, dateAdded, etc.)
- Always test with minimal data first

### **Error Handling**
- Your integration already includes comprehensive error handling
- Check console logs for detailed error information
- Toast notifications show user-friendly messages

---

## **🎉 You're Done!**

Following this process, you can add **any GHL API** to your system:

1. **Research** → Test with cURL
2. **Create Service** → Copy pattern, adapt endpoints
3. **Add to Integration** → Import and add resource methods
4. **Update Hook** → Add operations and return object
5. **Test & Use** → Verify all operations work

Your integration system is designed to make adding new APIs as simple as following this repeatable process! 🚀
