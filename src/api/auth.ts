import firebase, { User } from "firebase";
import firebaseAuthService from "./initializer/firebase";
import { INullable } from "@/@types/utility";

export async function googleAuth () {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const { credential } = await firebaseAuthService.auth().signInWithPopup(googleProvider);
    if (credential) {
      alert ("인증 완료");
    } else {
      alert("인증 실패");
    }
  } catch (e) {
    alert(e.message);
  }
}

export async function whoAmI (): Promise<INullable<User>> {
  const { currentUser } = await firebaseAuthService.auth();
  if (!currentUser) {
    return null;
  }

  return currentUser;
}

export async function signout () {
  const test = await firebaseAuthService.auth().signOut();
}

export async function watchAuth () {
  firebaseAuthService.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}
