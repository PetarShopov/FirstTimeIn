import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	styleUrls: ['./post.component.css'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class PostComponent implements OnInit {
	postId: string;
	post: object = {};
	constructor(private activatedRoute: ActivatedRoute, private firebaseService: FirebaseService) {
		this.postId = this.activatedRoute.snapshot.params.postId;
	}

	ngOnInit() {
		this.getPost();
	}

	getPost(){
		this.firebaseService.getPostById(this.postId).then((doc) => {
			if (doc.exists) {
				this.post = doc.data();
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});;
	}

}
