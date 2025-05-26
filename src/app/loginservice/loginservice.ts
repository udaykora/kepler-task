import { Injectable, inject } from '@angular/core';
import {
  collectionData,
  Firestore,
  updateDoc,
  doc,
  addDoc,
  getDoc,
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

  sidebarData$ = this.sidebarData.asObservable();
  email$ = this.email.asObservable();
  previewdatasend$ = this.previewdatasend.asObservable();
  resumedata$ = this.resumedata.asObservable();
  id$ = this.id.asObservable();

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
    email?: string,
    password?: string,
    id?: string
  ): Promise<boolean> {
    const usersRef = collection(this.firestore, 'resumedata');

    if (id) {
      const docRef = doc(this.firestore, 'resumedata', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.userid = docSnap.id;
        const data = docSnap.data();
        this.resumedata.next(data);
        this.id.next(this.userid);
        this.router.navigate(['/postjob']);
        return true;
      } else {
        console.warn(`No document found with ID: ${id}`);
        return false;
      }
    } else {
      const conditions = [];

      if (email !== undefined) {
        conditions.push(where('Email', '==', email));
      }
      if (password !== undefined) {
        conditions.push(where('Password', '==', password));
      }

      if (conditions.length === 0) {
        console.warn('No valid parameters provided for login.');
        return false;
      }

      const q = query(usersRef, ...conditions);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        this.userid = docSnap.id;
        const data = docSnap.data();
        console.log(data);
        this.resumedata.next(data);
        this.id.next(this.userid);

        return true;
      } else {
        console.warn('No matching documents found.');
        return false;
      }
    }
  }

  async getdatabyid(id: string): Promise<any> {
    const docRef = doc(this.firestore, 'resumedata', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      this.resumedata.next(data);
      console.log(data);
      return data
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
    console.log(updatedResumeDetails);

    // Only update the resumedetails field
    await updateDoc(docRef, {
      resumedetails: updatedResumeDetails,
    });
  }
}
