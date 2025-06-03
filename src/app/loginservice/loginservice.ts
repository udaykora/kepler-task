import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, User } from 'firebase/auth';

import {
  collectionData,
  Firestore,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from '@firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  constructor(private router: Router) {}
  userid: string = '';
  firestore = inject(Firestore);
  toolscollection = collection(this.firestore, 'resumedata');
  private sidebarData = new BehaviorSubject<any>(null);
  private email = new BehaviorSubject<any>(null);
  private previewdatasend = new BehaviorSubject<any>(null);
  private resumedata = new BehaviorSubject<any>(null);
  private id = new BehaviorSubject<any>(null);
  private signinemail = new BehaviorSubject<any>(null);
  private resetpasswordmail = new BehaviorSubject<any>(null);

  sidebarData$ = this.sidebarData.asObservable();
  email$ = this.email.asObservable();
  previewdatasend$ = this.previewdatasend.asObservable();
  resumedata$ = this.resumedata.asObservable();
  id$ = this.id.asObservable();
  signinemail$ = this.signinemail.asObservable();
  resetpasswordmail$ = this.resetpasswordmail.asObservable();

  sendData(data: any) {
    this.sidebarData.next(data);
  }

  sendemail(data: any) {
    this.email.next(data);
  }

  sendpreviewdata(data: any) {
    this.previewdatasend.next(data);
    setTimeout(() => {
      console.log(this.previewdatasend);
    }, 4000);
  }

  getresumedata(): Observable<any[]> {
    return collectionData(this.toolscollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  async addResume(data: any) {
    const resumeCollection = collection(this.firestore, 'resumedata');
    const addoc = await addDoc(resumeCollection, data);
    this.userid = addoc.id;
    return addoc;
  }

  async deleteresume() {
    if (!this.userid) {
      throw new Error('User ID is not set. Cannot delete resume.');
    }
    const docRef = doc(this.firestore, 'resumedata', this.userid);
    await deleteDoc(docRef);
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string,
    id?: string
  ): Promise<any> {
    const usersRef = collection(this.firestore, 'resumedata');

    const userid = doc(this.firestore, "userid's", email);

    const datafile = await getDoc(userid);

    if (datafile.exists()) {
      let id = datafile.data()['id'];
      let userdatafile = doc(this.firestore, 'resumedata', id);
      let userdata = await getDoc(userdatafile);

      if (userdata.exists() && userdata.data()['Password'] == password) {
        this.userid = userdata.id;
        const data = userdata.data();
        this.resumedata.next(data);
        this.id.next(this.userid);
        return true;
      } else {
        console.warn('No matching documents found.');
        return false;
      }
    } else {
      console.warn('No matching documents found.');
      return false;
    }

    // if (id) {
    //   const docRef = doc(this.firestore, 'resumedata', id);
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     this.userid = docSnap.id;
    //     const data = docSnap.data();
    //     this.resumedata.next(data);
    //     this.id.next(this.userid);
    //     return true;
    //   } else {
    //     console.warn(`No document found with ID: ${id}`);
    //     return false;
    //   }
    // } else {
    //   const conditions = [];

    //   if (email !== undefined) {
    //     conditions.push(where('Email', '==', email));
    //   }
    //   if (password !== undefined) {
    //     conditions.push(where('Password', '==', password));
    //   }

    //   if (conditions.length === 0) {
    //     console.warn('No valid parameters provided for login.');
    //     return false;
    //   }

    //   const q = query(usersRef, ...conditions);
    //   const querySnapshot = await getDocs(q);

    //   if (!querySnapshot.empty) {
    //     const docSnap = querySnapshot.docs[0];
    //     this.userid = docSnap.id;
    //     const data = docSnap.data();
    //     console.log(data);
    //     this.resumedata.next(data);
    //     this.id.next(this.userid);

    //     return true;
    //   } else {
    //     console.warn('No matching documents found.');
    //     return false;
    //   }
    // }
  }

  async getdatabyid(id: string): Promise<any> {
    const docRef = doc(this.firestore, 'resumedata', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      this.resumedata.next(data);

      return data;
    } else {
      console.warn('No document found with ID:', id);
      return null;
    }
  }

  async updateResumeDetailsById(updatedResumeDetails: any): Promise<void> {
    if (!this.userid) {
      throw new Error('User ID is not set. Cannot update resume details.');
    }

    const docRef = doc(this.firestore, 'resumedata', this.userid);

    await updateDoc(docRef, {
      resumedetails: updatedResumeDetails,
    });
  }

  async changeuserid(email: any, id: any): Promise<void> {
    console.log(email);
    console.log(id);
    const dockref = doc(this.firestore, "userid's", email);

    await updateDoc(dockref, {
      id: id,
    });
  }
  async newemailsearch(email: any): Promise<any> {
    const emailsearch = doc(this.firestore, "userid's", email);
    const snapshot = await getDoc(emailsearch);

    if (snapshot.exists()) {
      return false;
    } else return true;
  }

  async signinproc(email: any): Promise<any> {
    this.signinemail.next(email);
  }

  async createacc(email: any, password: any): Promise<any> {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const data = {
      Password: password,
      resumedetails: {},
    };

    const docRef = await addDoc(collection(this.firestore, 'resumedata'), data);
    const id: any = docRef.id;

    const docRef1 = doc(this.firestore, "userid's", email);
    await setDoc(docRef1, { id: id }, { merge: true });
    return id;
  }

  async resetpassword(email: any): Promise<any> {
    this.resetpasswordmail.next(email);
  }

  async resetpasswordfun(email: string, newPassword: string): Promise<void> {
    const docRef1 = doc(this.firestore, "userid's", email);
    const snapshot = await getDoc(docRef1);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const userId = data['id'];
      const docRef2 = doc(this.firestore, 'resumedata', userId);
      await updateDoc(docRef2, {
        Password: newPassword,
      });
    } else {
      console.error('User not found with that email.');
    }
  }
}
