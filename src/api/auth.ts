import firebase, { User } from "firebase";
import firebaseAuthService, { fireStore } from "./initializer/firebase";
import { INullable } from "@/@types/utility";
import { IServiceResponse } from "@/@types/utility/ajax";
import { IEmailAuthRequiredParams, ISignupWithEmailRequiredParams } from "@/api/types/auth";

export async function signupWithEmail ({ emailId, password }: ISignupWithEmailRequiredParams): Promise<IServiceResponse<firebase.User>> {
  try {
    const { user } = await firebaseAuthService.auth().createUserWithEmailAndPassword(emailId, password);
    if (user) {
      return {
        isSuccess: true,
        data: user
      }
    } else {
      return {
        isSuccess: false,
        data: null,
        message: "인증이 실패했습니다. 잠시 후 다시 시도하세요. (A0001)"
      }
    }
  } catch (e) {
    console.log("[Error Logs] signupWithEmail =>", e);
    return {
      isSuccess: false,
      data: null,
      message: e.message
    };
  }
}

export async function emailAuth ({ emailId, password }: IEmailAuthRequiredParams): Promise<IServiceResponse<firebase.User>> {
  try {
    const { user } = await firebaseAuthService.auth().signInWithEmailAndPassword(emailId, password);
    if (user) {
      return {
        isSuccess: true,
        data: user
      }
    } else {
      return {
        isSuccess: false,
        data: null,
        message: "로그인이 실패했습니다. 잠시 후 다시 시도하세요.(A0003)"
      }
    }
  } catch (e) {
    console.log("[Error Logs] emailAuth =>", e);
    return {
      isSuccess: false,
      data: null,
      message: e.message
    };
  }
}

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
        message: "인증이 실패했습니다. 잠시 후 다시 시도하세요. (A0002)"
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
