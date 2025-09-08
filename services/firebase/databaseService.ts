export class FirebaseDatabaseService {
  createDB = async (collectionName: string, Id: string, Data: any): Promise<any> => {
    const { db } = await import("../../firebase-config");
    const { doc, setDoc } = await import("firebase/firestore");

    try {
      await setDoc(doc(db, collectionName, Id), Data);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  updateDB = async (collectionName: string, Id: string, Data: any): Promise<{ success: boolean } | any> => {
    const { db } = await import("../../firebase-config");
    const { doc, updateDoc } = await import("firebase/firestore");
    try {
      const result = await updateDoc(doc(db, collectionName, Id), Data);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  getCollectionDB = async (collectionName: string): Promise<{ Data: any[] } | any> => {
    const { db } = await import("../../firebase-config");
    const { collection, getDocs } = await import("firebase/firestore");
    try {
      const data = await getDocs(collection(db, collectionName));
      const Data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return { Data };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  deleteDB = async (collectionName: string, documentId: string): Promise<{ success: boolean } | any> => {
    const { db } = await import("../../firebase-config");
    const { deleteDoc, doc } = await import("firebase/firestore");
    try {
      await deleteDoc(doc(db, collectionName, documentId));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  getDB = async (collectionName: string, documentId: string): Promise<{ data?: any; error?: any }> => {
    const { db } = await import("../../firebase-config");
    const { doc, getDoc } = await import("firebase/firestore");
    try {
      const dataDoc = await getDoc(doc(db, collectionName, documentId));
      const data = dataDoc.data();
      return { data };
    } catch (error) {
      return { error };
    }
  };

  getDBRealtime = async (
    collectionName: string, 
    documentId: string, 
    callback: (result: { data?: any; error?: string }) => void
  ): Promise<(() => void) | undefined> => {
    const { db } = await import("../../firebase-config");
    const { doc, onSnapshot } = await import("firebase/firestore");

    try {
      const docRef = doc(db, collectionName, documentId);

      // Set up a real-time listener
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          callback({ data }); // Pass the data back to your callback function
        } else {
          callback({ error: "Document does not exist" });
        }
      });

      // Return the unsubscribe function to stop the listener when needed
      return unsubscribe;

    } catch (error) {
      callback({ error: error as string });
    }
  };

  checkIsExistsDB = async (collectionName: string, documentId: string): Promise<boolean | any> => {
    const { db } = await import("../../firebase-config");
    const { doc, getDoc } = await import("firebase/firestore");
    try {
      const dataDoc = await getDoc(doc(db, collectionName, documentId));

      if (dataDoc.exists()) {
        return true;
      }
      return false;
    } catch (error) {
      return { error };
    }
  };

  createOrUpdateDB = async (
    collectionName: string,
    documentId: string,
    Data: any,
    dataPropertyName: string
  ): Promise<{ success: boolean } | { error: any }> => {
    const { db } = await import("../../firebase-config");
    const { doc, getDoc, setDoc, updateDoc } = await import("firebase/firestore");
    try {
      const dataDoc = await getDoc(doc(db, collectionName, documentId));

      if (!dataDoc.exists()) {
        // Create the document
        await setDoc(doc(db, collectionName, documentId), Data);
      } else {
        // Update user's chat information
        const data = dataDoc.data();

        // Check if the dataPropertyName exists and is an array
        if (!Array.isArray(data?.[dataPropertyName])) {
          data![dataPropertyName] = [];
        }

        await updateDoc(doc(db, collectionName, documentId), {
          [dataPropertyName]: [
            ...data![dataPropertyName],
            ...Data[dataPropertyName],
          ],
        });
      }
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  UpdateFunction = async (
    collectionName: string,
    uid: string,
    newData: any,
    data: any[] | null,
    dataPropertyName: string
  ): Promise<{ success: boolean } | any> => {
    let Data: any[];
    if (data) {
      Data = [...data, newData];
    } else {
      Data = [newData];
    }

    return await this.updateDB(collectionName, uid, {
      [dataPropertyName]: Data,
    });
  };
}

export const firebaseDatabaseService = new FirebaseDatabaseService();
