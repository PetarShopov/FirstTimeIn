import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Post } from '../components/post/post.component';
import { map } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {
	imagesRef;
	ref;
	task;
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

	getPostById(id) {
		return this.firestore.collection("posts").doc(id).ref.get();
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
		return this.imagesRef.listAll();
			
	}

	uploadImage(event) {
		const randomId = Math.random().toString(36).substring(2);
		this.ref = this.firestorage.ref('images').child(randomId);
		this.task = this.ref.put(event.target.files[0]);
	}
}
