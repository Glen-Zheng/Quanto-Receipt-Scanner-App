# Quanto Recipt Scanner

https://quanto-receipt-scanner-app-omc9.vercel.app/

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/Glen-Zheng/Quanto-Receipt-Scanner-App && cd into the director
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   The app should now be running on [http://localhost:3000](http://localhost:3000).

4. Build the project (for production):
   ```
   npm run build
   ```

5. Start the production server:
   ```
   npm start
   ```

---

## API Choice and Rationale

I chose the TabScanner API to not reinvent the wheel and use something that would be simple and less voltaile, like an LLM. The API took in the image as a param and outputted the information we wanted, so I decided to use this to keep it simple Furthermore, AI APIs often required extensive registration processes with banking information. This API, although not the best, does the job in most cases and can read our receipts (works well for test case 4). The code and its modularity was the main focus of this project, and the API can always be improved, which is why I chose something straightforward and that makes the developer's life easier!

---

## Limitations and Assumptions

The API can be a little disfunctional at times. Works well for test case 4. (API can always be improved).

---
