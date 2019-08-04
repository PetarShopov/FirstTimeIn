import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  imagesRef
  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) {
    this.imagesRef = this.firestorage.storage.ref().child('images');
  }

  createPost(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("posts")
        .add(data)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    })
  }

  getPosts() {
    return this.firestore.collection("posts").snapshotChanges();
  }

  updatePost(id) {
    return this.firestore
      .collection("posts")
      .doc(id)
      .set({ test: 2 })
  }

  deletePost(id) {
    return this.firestore
      .collection("posts")
      .doc(id)
      .delete()
  }

  getImages() {
    return this.imagesRef.listAll()
      .then((res) => {
        // res.items.map((i) => {console.log(i.location)})
        debugger
      }).catch(function (error) {
        debugger
        // Uh-oh, an error occurred!
      });;
  }
}
