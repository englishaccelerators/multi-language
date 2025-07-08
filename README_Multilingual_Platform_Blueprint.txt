Multilingual Education Platform – System Blueprint

🌍 LANGUAGE STRUCTURE
Each language has:
- One PostgreSQL database for all text (definitions, examples, grammar)
- Multiple S3 audio folders per region/accent

🎤 AUDIO LOGIC (By Region)
Text is shared across accents; audio is not.

Example:
Text: “He went to school.” (One entry in the database)
Audio:
- UK     → UK/school-V-1-D-E-1-UK
- US     → US/school-V-1-D-E-1-US
- Canada → CAN/school-V-1-D-E-1-CAN

🧠 MANAGER-CONTROLLED AUDIO ROUTING RULES (NO CODE)
Manager defines once:

{
  "english": {
    "language_code": "en",
    "postgres_db": "dictionarydb_english",
    "audio_bucket": "exampleenglishfordictionary",
    "example_folder": {
      "UK": "UK/",
      "US": "US/",
      "CAN": "CAN/"
    },
    "word_folder": {
      "UK": "newfileaudio/words/uk/",
      "US": "newfileaudio/words/us/",
      "CAN": "newfileaudio/words/can/"
    },
    "suffixes": ["UK", "US", "CAN"]
  }
}

System uses these rules to:
- Detect block type (word, example, etc.)
- Detect voice region by suffix
- Store audio in the correct S3 folder
- Save text in the correct PostgreSQL DB

📦 LANGUAGE DATABASE CONFIGURATION

| Language | DB Name              | Audio Bucket Name             |
|----------|----------------------|-------------------------------|
| English  | dictionarydb_en      | exampleenglishfordictionary  |
| Arabic   | dictionarydb_ar      | arabicdictionaryaudio         |
| French   | dictionarydb_fr      | frenchdictionaryaudio         |

🖥 MANAGER INTERFACE (NO CODE)

Add Language:
- Language Name: English
- Language Code: en
- Database Name: dictionarydb_english
- Audio Bucket Name: exampleenglishfordictionary

Add Audio Rules:

{
  "-V-*": {
    "UK": "newfileaudio/words/uk/",
    "US": "newfileaudio/words/us/",
    "CAN": "newfileaudio/words/can/"
  },
  "-D-E-*": {
    "UK": "UK/",
    "US": "US/",
    "CAN": "CAN/"
  }
}

🧩 IDENTIFIERCODE FLOW EXAMPLE

If added: school-V-22-D-E-2-CAN

| Action           | Result                      |
|------------------|-----------------------------|
| Language         | English                     |
| DB Used          | dictionarydb_english        |
| Block Type       | Example Sentence (-D-E-*)   |
| Region           | CAN                         |
| Audio Folder     | CAN/                        |
| Audio File       | school-V-22-D-E-2-CAN       |

✅ FINAL SUMMARY

| Component        | Logic                                                    |
|------------------|----------------------------------------------------------|
| Text             | One DB per language (shared across all voice regions)    |
| Audio            | Separate per region, stored by suffix folder             |
| Routing          | Defined once by Manager via UI                           |
| Developer-Free   | 100% No-code scalable system                             |
