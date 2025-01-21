import * as SQLite from 'expo-sqlite';


let db;  
const database=async()=>{
  db = await SQLite.openDatabaseAsync('TeethDatabase');
  // deleteTable()
}
database()


export const initializeDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS teethStatus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        toothNumber INTEGER UNIQUE,
        problem1 TEXT,
        problem2 TEXT,
        note TEXT,
        status TEXT
      );
    `);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
export const fetchToothStatuses = async (setTeethStatus) => {
  try {
    const allRows = await db.getAllAsync('SELECT toothNumber, status FROM teethStatus;');
    const statusMap = [];
    allRows.forEach((row) => {
      statusMap[row.toothNumber] = row.status === 'pending' ? 'blue' : 'yellow';
    });
    setTeethStatus(statusMap);
  } catch (error) {
    console.error('Error fetching statuses:', error);
  }
};

export const updateToothStatus = async (toothNumber, problem1, problem2, note, status) => {
  try {
    const result = await db.runAsync(
      'INSERT OR REPLACE INTO teethStatus (toothNumber, problem1, problem2, note, status) VALUES (?, ?, ?, ?, ?);',
      toothNumber,
      problem1,
      problem2,
      note,
      status
    );
  } catch (error) {
    console.error('Error updating status:', error);
  }
};



// Just For Testing 
// const deleteTable = async () => {
//   try {
//     await db.runAsync('DROP TABLE IF EXISTS teethStatus;');
//     console.log('Table deleted successfully');
//   } catch (error) {
//     console.error('Error deleting table:', error);
//   }
// };