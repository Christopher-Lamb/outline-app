import initialJSON from "../pages/outline/inital-state.json";

/**
 * Opens (or creates) a database and an object store, then retrieves all keys in the store.
 * @param {object} options Options for creating the store, e.g., { keyPath: 'id' }.
 * @returns {Promise<any[]>} A promise that resolves to an array of keys from the store.
 */
const dbName = "OutlineDB";
const storeName = "outlineStore";
export async function setupDatabaseAndGetKeys(options = { keyPath: "_id" }) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Create the store if it does not already exist
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, options);
      }
    };

    request.onerror = (event) => {
      reject(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // console.log("db:\n\t", db); //// console.log => db

      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);

      const objectRequest = store.getAll();

      objectRequest.onsuccess = () => {
        resolve(objectRequest.result.map((item) => ({ _id: item._id, title: item.title }))); // Return all keys in the store
        db.close();
      };

      objectRequest.onerror = () => {
        reject(`Error fetching keys from ${storeName}`);
      };
    };
  });
}

/**
 * Initializes the database and object store if they do not exist.
 * @param {string} storeName The name of the object store.
 * @returns {Promise<IDBDatabase>} A promise that resolves to the database object.
 */
function initDatabase(storeName) {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // Create an object store with out-of-line keys (no keyPath specified)
        db.createObjectStore(storeName);
      }
    };

    openRequest.onerror = function (event) {
      reject(`Database error: ${event.target.errorCode}`);
    };

    openRequest.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}

function genUID() {
  return `id_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

/**
 * Adds data to the specified store where the key is a string and the value is an empty array.
 * @param {string} title The name of the object store.
 * @returns {Promise<number>} A promise that resolves when the data is added and returns UID, or rejects on error.
 */

export async function addOutlineToStore(title) {
  try {
    // Handles boilerplate
    const uniqueID = genUID();
    const db = await initDatabase(storeName);
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      // Use `add` to insert new data at the key and throw error if the key exists
      const addRequest = store.add({ _id: uniqueID, title, data: initialJSON });

      addRequest.onsuccess = () => {
        // console.log(`Data added successfully with key ${uniqueID}`);
        resolve(uniqueID);
      };

      addRequest.onerror = () => {
        // Provide more specific message if the key already exists
        if (addRequest.error && addRequest.error.name === "ConstraintError") {
          console.error(`Error: The key ${uniqueID} already exists in the store.`);
          reject(`Error: The key ${uniqueID} already exists in the store.`);
        } else {
          console.error(`Error adding data: ${addRequest.error}`);
          reject(`Error adding data: ${addRequest.error}`);
        }
      };

      transaction.oncomplete = () => {
        db.close();
      };

      transaction.onerror = (event) => {
        console.error(`Transaction error: ${event.target.error}`);
        reject(`Transaction error: ${event.target.error}`);
      };
    });
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error; // Rethrow to allow error handling in calling context
  }
}

/**
 * Deletes a key-value pair from a specified object store in IndexedDB.
 * @param {string} key The key of the data to be deleted.
 * @returns {Promise<void>} A promise that resolves when the key is successfully deleted, or rejects on failure.
 */
export async function deleteDataFromStore(key) {
  try {
    const db = await initDatabase(storeName);
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const deleteRequest = store.delete(key);

      deleteRequest.onsuccess = () => {
        // console.log(`Data deleted successfully for key ${key}`);
        resolve();
      };

      deleteRequest.onerror = () => {
        reject(`Error deleting data: ${deleteRequest.error}`);
      };

      transaction.oncomplete = () => {
        db.close();
      };

      transaction.onerror = (event) => {
        reject(`Transaction error: ${event.target.error}`);
      };
    });
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error; // Rethrow to allow error handling in the calling context
  }
}

/**
 * Retrieves an object from a specified object store in IndexedDB by key.
 * @param {string} key The key of the data to be retrieved.
 * @returns {Promise<any>} A promise that resolves to the retrieved data object, or rejects on failure.
 */
export async function getDataFromStore(key) {
  try {
    const db = await initDatabase(storeName);
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        if (getRequest.result !== undefined) {
          // console.log(`Data retrieved successfully for key ${key}`);
          resolve(getRequest.result);
        } else {
          // console.log("No data found for the key.");
          resolve(null); // Resolve as null if no data is found.
        }
      };

      getRequest.onerror = () => {
        reject(`Error retrieving data: ${getRequest.error}`);
      };

      transaction.oncomplete = () => {
        db.close();
      };

      transaction.onerror = (event) => {
        reject(`Transaction error: ${event.target.error}`);
      };
    });
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error; // Rethrow to allow error handling in the calling context
  }
}

/**
 * Updates a specific property of an object in an IndexedDB store identified by _id.
 * @param {string} _id The _id of the object to update.
 * @param {object} updateData Object containing the key and the new value to update, e.g., { key: 'value' }
 * @returns {Promise<void>} A promise that resolves when the update is successful or rejects on failure.
 */

export async function updateDB(_id, updateData) {
  try {
    const db = await initDatabase(storeName);
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const getRequest = store.get(_id);

      getRequest.onsuccess = () => {
        const data = getRequest.result;
        if (data) {
          // Update the key with the new value
          for (const key in updateData) {
            data[key] = updateData[key];
          }

          const updateRequest = store.put(data);
          updateRequest.onsuccess = () => {
            resolve();
          };
          updateRequest.onerror = () => {
            reject(`Error updating data: ${updateRequest.error}`);
          };
        } else {
          reject("No object found with the specified _id");
        }
      };

      getRequest.onerror = () => {
        reject(`Error fetching data: ${getRequest.error}`);
      };

      transaction.oncomplete = () => {
        db.close();
      };

      transaction.onerror = (event) => {
        reject(`Transaction error: ${event.target.error}`);
      };
    });
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error; // Rethrow to allow error handling in the calling context
  }
}
