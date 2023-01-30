import firestore from '@react-native-firebase/firestore';

export const postCollection = (collectionName = '1', body: any) => {
  const newDoc = firestore().collection(collectionName).doc();
  newDoc.set({...body, id: newDoc.id});
};

export const getCollectionOrderBy = async (
  collectionName: string,
  sortParameter: string,
  asc: boolean,
) => {
  return await firestore()
    .collection(collectionName)
    .orderBy(sortParameter, asc ? 'asc' : 'desc')
    .get()
    .then(x => {
      const values: any[] = [];
      x.docs.forEach(doc => {
        const newDoc = {...doc.data()};
        values.push({...newDoc, id: doc.id});
      });
      return values;
    });
};
