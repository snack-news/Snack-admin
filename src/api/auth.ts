import firebase, { User } from "firebase";
import firebaseAuthService, { fireStore } from "./initializer/firebase";
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

export async function signoutService () {
  await firebaseAuthService.auth().signOut();
}

interface IPermissionInformation {
  isAdmin: true;
  lastLogin: string;
}

export async function checkPermission (uid: string): Promise<boolean> {
  try {
    const postRef = fireStore.ref(`users/admin/${uid}`);
    await postRef.once("value");

    return true;
  } catch (e) {
    console.log("[Logs:checkPermission]", e);
    return false;
  }
}
