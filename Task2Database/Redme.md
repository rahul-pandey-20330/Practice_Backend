step 1 : server hmara src folder ke ander creat hota hai
ster 2 : Root folder me server file create krna hota hai jisme hm server ko require krte hai src folder se and ise call krte hai 
step 3 : isme server ko database se connect krne ke liye src folder me db naam ka folder bnate hai jisme db.js ka file hota hai jiska kaam hota hai server ko database se connect krna 
step 4 : .env ek file hoti hai jisme hum sensitive/configuration values store karte hain, jaise MongoDB URL, password, API keys etc.

Example:

MONGODB_URI=mongodb+srv://...
PORT=3000

dotenv ek Node.js package hai jo .env file ki values ko application mein load karta hai.

Install:

npm install dotenv
| `.env`                          | `dotenv`                              |
| ------------------------------- | ------------------------------------- |
| File hoti hai                   | npm package hai                       |
| Variables store karti hai       | Variables load karta hai              |
| Configuration contain karti hai | `.env` ko read karta hai              |
| Example: `MONGODB_URI=...`      | Example: `require("dotenv").config()` |

step 5 : now ab hme task1 me jo note create kiye the use is me database me create krna hai uske liye hme us data ka schema create krna hoga and iske ilye hme src me modles naam ka folder create krenge and usme nites naam ka 