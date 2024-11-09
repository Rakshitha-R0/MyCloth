import {initializeApp} from 'firebase/app';
import {getAuth,
      signInWithPopup,
      GoogleAuthProvider,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
    } from 'firebase/auth';
import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QuerySnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAasXxrb-Rll1CW4ihkoFGtkmUqFYH8wO8",
    authDomain: "my-cloth-daba.firebaseapp.com",
    projectId: "my-cloth-daba",
    storageBucket: "my-cloth-daba.appspot.com",
    messagingSenderId: "11771127280",
    appId: "1:11771127280:web:dc188b2a2b5b02d6b5e935"
  };
  
  const FirebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });
  export const auth = getAuth();
  export const signInWithGooglePopup = () => 
    signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey ,objectsToAdd) =>{
    const collectionRef = collection(db ,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc( collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
  };

  export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    
    const querySnapShot =await getDocs(q);
    const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
      const {title, items} = docSnapShot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
  }

  export const createUserDocumentFromAuth = async(
    userAuth ,
    additionalInformation = {}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'user', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
 
    if(!userSnapshot.exists())  {
        const{displayName ,email} =userAuth;
        const createAt = new Date();
        
        try{
            await setDoc(
                userDocRef,{displayName ,email ,createAt , ...additionalInformation}
            );
        }catch(error){
          if(error){
            alert('error creatig the user. Try again!!');
          }
        }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async() => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged (auth,callback)