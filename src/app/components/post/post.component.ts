import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";

export interface Post {
  id: string;
  color: string;
  cols: number;
  rows: number;
  text: string;
  image: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  imageSrc = 'https://firebasestorage.googleapis.com/v0/b/first-time-in.appspot.com/o/images%2Flion-conservators-center.jpg?alt=media&token=e683cbb8-8bc5-4106-8449-c1f1613b799c';
  posts: any = [
    { id: '', text: '', cols: 2, rows: 1, color: 'white', image: '' },
  ];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getPosts();
  }

  addPost() {
    this.firebaseService.createPost({ text: 'Lisbon', cols: 2, rows: 4, color: 'lightblue', image: this.imageSrc })
      .then(res => {
      });
  }

  getPosts() {
    this.firebaseService.getPosts().subscribe(posts => {
      this.posts = posts.map(
        post => ({ ...post.payload.doc.data(), id: post.payload.doc.id }))
    });
  }

  updatePost(id) {
    this.firebaseService.updatePost(id);
  }

  deletePost(id) {
    this.firebaseService.deletePost(id);
  }
}
