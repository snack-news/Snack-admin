import firebase, { User } from "firebase";
import firebaseAuthService, { fireStore } from "./initializer/firebase";
import { INullable } from "@/@types/utility";
import { IServiceResponse } from "@/@types/utility/ajax";

export async function googleAuth (): Promise<IServiceResponse<firebase.User>> {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const { credential, user } = await firebaseAuthService.auth().signInWithPopup(googleProvider);
    if (credential && user) {
      return {
        isSuccess: true,
        data: user,
      };
    } else {
      return  {
        isSuccess: false,
        data: null,
        message: "인증 실패하였습니다."
      };
    }
  } catch (e) {
    return {
      isSuccess: false,
      data: null,
      message: e.message
    }
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
