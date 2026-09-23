# Task2Database: Notes API

यह project Express, MongoDB और Mongoose का उपयोग करके notes के लिए CRUD API बनाता है।

## Project Structure

```text
Task2Database/
├── .env                 # Local configuration; Git में commit नहीं होती
├── server.js            # Application का entry point
├── package.json
├── src/
│   ├── app.js           # Express app और API routes
│   ├── db/
│   │   └── db.js        # MongoDB connection
│   └── models/
│       └── note.model.js # Note schema और model
└── Redme.md
```

## Requirements

- Node.js installed होना चाहिए।
- MongoDB Atlas account या local MongoDB server होना चाहिए।
- MongoDB Atlas में current IP address **Network Access** में allowed होना चाहिए।

## Installation

Task2Database folder में जाकर dependencies install करें:

```powershell
npm install
```

Server start करें:

```powershell
node server.js
```

Successful startup पर terminal में यह messages दिखेंगे:

```text
connected to DB
app is running on port 3000
```

## Environment Configuration

Project root में `.env` file बनाएँ:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

`.env` में password और connection string जैसी sensitive values रहती हैं। इसलिए इसे `.gitignore` में रखा गया है और इसे GitHub पर push नहीं करना चाहिए। अगर password गलती से public हो जाए, तो MongoDB Atlas में उसे तुरंत rotate करें।

`server.js` में:

```js
require("dotenv").config();
```

`dotenv` `.env` की values को `process.env` में load करता है, ताकि code में password hard-code न करना पड़े।

## Application Startup Flow

1. `server.js` सबसे पहले environment variables load करता है।
2. यह Express app और `connectDB` function import करता है।
3. `await connectDB()` MongoDB connection complete होने तक wait करता है।
4. Database connect होने के बाद ही port `3000` पर server start होता है।
5. Connection fail होने पर error terminal में दिखता है और server बंद हो जाता है।

Database को पहले connect करना जरूरी है क्योंकि application को ऐसे state में requests accept नहीं करनी चाहिए जहाँ data store या read नहीं हो सकता। `serverSelectionTimeoutMS: 5000` इसलिए लगाया गया है ताकि unavailable MongoDB के लिए application अनिश्चित समय तक wait न करे।

## Note Model

`src/models/note.model.js` में schema define है:

```js
const noteSchema = new mongoose.Schema({
		title: String,
		description: String
});
```

Schema database में note का expected shape तय करता है। Mongoose model इसी schema के आधार पर MongoDB में documents create, read, update और delete करता है।

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### 1. Create Note

```http
POST /note
Content-Type: application/json
```

Request body:

```json
{
	"title": "Learn MongoDB",
	"description": "Practice CRUD operations"
}
```

यह route `noteModel.create()` से नया document database में save करता है और `201 Created` response देता है। `201` इसलिए उपयोग किया गया है क्योंकि नया resource create हुआ है।

### 2. Read All Notes

```http
GET /note
```

यह route `noteModel.find()` से सभी notes लाता है और `200 OK` response देता है। `200` read operation के successful होने को दर्शाता है।

### 3. Update Note

```http
PATCH /note/:id
Content-Type: application/json
```

Example:

```http
PATCH /note/64f123456789abcdef123456
```

Request body:

```json
{
	"description": "Updated description"
}
```

`findByIdAndUpdate()` दिए गए MongoDB `_id` वाले note को update करता है। `{ new: true }` इसलिए दिया गया है ताकि response में updated document मिले, पुराना document नहीं।

### 4. Delete Note

```http
DELETE /note/:id
```

`findByIdAndDelete()` दिए गए `_id` वाले note को database से remove करता है और deleted document response में लौटाता है।

## Testing with PowerShell

Create:

```powershell
Invoke-RestMethod -Method Post `
	-Uri http://localhost:3000/note `
	-ContentType "application/json" `
	-Body '{"title":"First note","description":"My first database note"}'
```

Read:

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/note
```

Update और delete के लिए पहले GET response से note का `_id` लें:

```powershell
Invoke-RestMethod -Method Patch `
	-Uri http://localhost:3000/note/<NOTE_ID> `
	-ContentType "application/json" `
	-Body '{"title":"Updated note"}'

Invoke-RestMethod -Method Delete `
	-Uri http://localhost:3000/note/<NOTE_ID>
```

## Important Error: MongoDB Connection Failed

अगर terminal में यह error आए:

```text
Could not connect to any servers in your MongoDB Atlas cluster
```

तो सामान्य कारण ये हो सकते हैं:

1. MongoDB Atlas में current IP allow नहीं है। **Network Access** में अपना IP add करें।
2. `.env` में `MONGODB_URI` missing या गलत है।
3. Username या password गलत है। Password में special characters हों तो उन्हें URL-encode करना पड़ सकता है।
4. Network, VPN या firewall MongoDB connection block कर रहा है।

Connection fail होने पर server को port `3000` पर start न करना intentional है। इससे application में false success नहीं दिखता और error जल्दी पता चल जाता है।

## Git Workflow

इस workspace में main Git repository `D:\Backend` है। इसलिए changes push करने के लिए commands parent folder से चलाएँ:

```powershell
git -C D:\Backend status
git -C D:\Backend add Task2Database/Redme.md
git -C D:\Backend commit -m "Document Task2 database API"
git -C D:\Backend push origin main
```

`.env`, `node_modules` और unrelated folders को stage न करें। `.env` में credentials होते हैं और `node_modules` generated dependencies होती हैं, इसलिए दोनों ignore किए गए हैं।

## Current Limitations

- Routes में अभी centralized error middleware नहीं है।
- Invalid या missing MongoDB `_id` के लिए अलग validation response नहीं है।
- Notes में required fields और validation rules अभी minimal हैं।
- Production में authentication और authorization जोड़ना जरूरी होगा।