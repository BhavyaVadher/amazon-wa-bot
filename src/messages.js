const WELCOME = `⚠️ Please double-check your details. If you put anything wrong then we will not be responsible.

Welcome! I will collect your information for Amazon Warehouse shifts step by step.

Let's get started. Please answer each question carefully.`;

const PROMPTS = {
  1: `1️⃣ Please enter your Full Name (as per your SIN Number):`,

  2: `2️⃣ Enter your Amazon account email (must be @gmail.com):

If you don't have an Amazon account, create one here:
https://auth.hiring.amazon.com/#/login`,

  3: `3️⃣ Enter your 6-digit Amazon login code (numbers only, no spaces):`,

  4: `4️⃣ Enter your 16-digit Google App Password (letters only, no spaces, no numbers):

Need help? Follow these steps:
1. Go to: https://myaccount.google.com/
2. Go to Security section
3. Enable 2-Step Verification (if not already)
4. Visit: https://myaccount.google.com/apppasswords
5. Make sure correct account is selected (top right)
6. Enter any name (e.g. Amazon)
7. Copy the 16-letter password shown and paste here

📹 Watch this short video for help:
https://youtube.com/shorts/ooRh3rU5bww?si=b5D-vNzSSQllkZ9D`,

  5: `5️⃣ Enter your 10-digit Canadian contact number (numbers only, no spaces, no dashes):`,

  6: `6️⃣ Select your Availability:

• Fulltime — 5 days/week, 8 hours/day
• Parttime — 5 days/week, 4 hours/day
• Flex Time — Choose your own shifts, 24–35 hrs/week (Training Week is mandatory)

Reply with: Fulltime, Parttime, or Flex Time`,

  7: `7️⃣ Select your Shift Preference:

• Any — Open to any shift
• Day — Day shifts only
• Night — Night shifts only

Reply with: Any, Day, or Night`,

  8: `8️⃣ Select your preferred work locations (choose minimum 2):

1. Scarborough
2. Ajax
3. Whitby
4. Mississauga
5. Brampton
6. Hamilton
7. St. Thomas
8. Bolton
9. Cambridge
10. Milton
11. London
12. Other (type your city name after selecting at least 2 from above)

Reply with numbers separated by commas. Example: 1,3,5
If choosing Other, add it like: 1,3,12,Vaughan

⚠️ Once you commit to a location, you cannot change it.`,

  9: `9️⃣ Select your Visa Status:

• Study Permit
• Work Permit
• Applied Work Permit
• PR (Permanent Resident)
• Citizen

Reply with one of the above options exactly.`,

  10: `🔟 Enter your SIN Number (9 digits, no spaces, no dashes):
Format: XXXXXXXXX`,

  11: `1️⃣1️⃣ Enter your Date of Birth:
Format: YYYYMMDD (Example: 19950315 for March 15, 1995)`,

  12: `1️⃣2️⃣ Enter your full Address (street number, street name, city):
Example: 123 Main Street, Toronto`,

  13: `1️⃣3️⃣ Enter your Postal Code:
Format: XXX XXX (letter-number-letter space number-letter-number)
Example: M1B 2C3`,

  14: `1️⃣4️⃣ Enter your Landing Date in Canada:
Format: YYYYMMDD (Example: 20200101 for January 1, 2020)`,

  15: `1️⃣5️⃣ Have you worked at Amazon before?

Reply with: Yes or No`,

  16: `1️⃣6️⃣ Which Amazon location did you work at?
Example: Amazon YYZ2 Brampton, Amazon YYZ4 Mississauga`,

  17: `1️⃣7️⃣ What were your work dates at Amazon?
Format: YYMM-YYMM (Example: 2201-2306 means Jan 2022 to Jun 2023)`,
};

const ERRORS = {
  1: `❌ Invalid name. Please enter your full name using letters only (no numbers or symbols). Example: John Smith`,
  2: `❌ Invalid email. Only @gmail.com emails are accepted. Example: yourname@gmail.com`,
  3: `❌ Invalid code. Please enter exactly 6 digits with no spaces or letters. Example: 123456`,
  4: `❌ Invalid App Password. It must be exactly 16 letters with no numbers, spaces, or symbols. Please follow the steps above and try again.`,
  5: `❌ Invalid number. Please enter exactly 10 digits only. Example: 6471234567`,
  6: `❌ Invalid option. Please reply with exactly: Fulltime, Parttime, or Flex Time`,
  7: `❌ Please reply with exactly: Any, Day, or Night`,
  8: `❌ Please select at least 2 locations. Reply with numbers like: 1,3,5\nIf adding a custom city, include it like: 1,3,12,YourCity`,
  9: `❌ Please reply with one of: Study Permit, Work Permit, Applied Work Permit, PR, Citizen`,
  10: `❌ Invalid SIN. Please enter exactly 9 digits only. Example: 123456789`,
  11: `❌ Invalid date. Please use YYYYMMDD format. Example: 19950315`,
  12: `❌ Please enter a valid address including your street number and name. Example: 123 Main Street, Toronto`,
  13: `❌ Invalid postal code. Use format: M1B 2C3 (letter-number-letter space number-letter-number)`,
  14: `❌ Invalid date. Please use YYYYMMDD format and ensure it is not a future date. Example: 20200101`,
  15: `❌ Please reply with Yes or No only.`,
  16: `❌ Please enter the Amazon location where you previously worked.`,
  17: `❌ Invalid format. Use YYMM-YYMM. Example: 2201-2306`,
};

const SESSION_EXPIRED = `⏱️ Your session has expired due to inactivity. Please send any message to start again.`;

const CLOSING = `✅ Thank you! Your information has been submitted successfully.

We update hiring locations every Friday night in our WhatsApp Group.
Join here to stay updated:
👉 https://chat.whatsapp.com/KUKbbIoxmV80aJnUgagqh0

If you are okay with the posted location, DM us at that time and we will consider your profile.

Good luck! 🍀`;

module.exports = { WELCOME, PROMPTS, ERRORS, SESSION_EXPIRED, CLOSING };
