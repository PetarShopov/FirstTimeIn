import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts;
  private basePath = '/uploads';

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  addPost() {
    this.firebaseService.createPost({ test: 1 })
      .then(res => {
      });
  }

  getPosts() {
    this.firebaseService.getPosts()
      .subscribe(res => {
        this.posts = res
      }
      );
  }

  updatePost(id) {
    this.firebaseService.updatePost(id);
  }

  deletePost(id) {
    this.firebaseService.deletePost(id);
  }
}
