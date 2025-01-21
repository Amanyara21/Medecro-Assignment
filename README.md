

# Medecro.ai Assignment App
This app contains two screens for two tasks:

Task 1: Displays the upper and lower teeth. Users can select any tooth by clicking on it, which opens a Bottom View Modal to input details about the issue with the tooth. Upon clicking "Next," the details are saved to the SQLite database.

Task 2: Includes a dropdown to select a date (limited to 1 week from today). Below the dropdown, an hourly view of appointments is displayed using static data.

## 1. Clone Project

Clone the repository to your local machine:

```bash
git clone https://github.com/amanyara21/Medecro-Assignment.git
cd Medecro-Assignment
```

## 2. Install Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

## 3. Run on Android

Ensure that you have an Android emulator running or a physical device connected. Then run the following command to launch the app on Android:

```bash
npm run android
```

## 4. Project Structure

```
app/
  ├── screens/                 # Contains different screens of the app
  │    ├── HomeScreen.jsx      # Main screen displaying Teeth Chart and 
  │    ├── AppointmentsHourly.jsx # Hourly view of appointments
  ├── components/              # Contains reusable components
  │    ├── BottomModel.jsx     # Component for bottom Model
  │    ├── Legend.jsx          # Legend for Blue and Yellow for Want treatment and Early Treated Respectively
  │    ├── TeethView.jsx       # Component for visualizing teeth in ellipse form           
  ├── db/                      # Contains SQLite database functions
  │    ├── database.js         # SQLite functions for Add data , Read data and Update Data for Tooth Treatment
  ├── index.js                 # App entry point
  ├── _layout.js                
```


**APK File:** : 
Apk file can be downloaded from : /apk/App.apk
or from using this link : https://expo.dev/artifacts/eas/7wZRhJnrpCtcnZRPtz1kxP.apk


