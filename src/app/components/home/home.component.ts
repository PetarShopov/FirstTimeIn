import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	posts: any = [
		{ id: '', text: '', cols: 2, rows: 1, color: 'white', image: '' },
	];
	images: Array<object>

	constructor(private firebaseService: FirebaseService, private router: Router) { }

	ngOnInit() {
		this.getPosts();
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

	deletePost(event, id) {
		event.stopPropagation();
		this.firebaseService.deletePost(id);
	}

	showPost(id) {
		this.router.navigate(['/posts/', id]);
	}

	upload(event) {
		this.firebaseService.uploadImage(event);
	}

	getImages() {
		this.firebaseService.getImages().then((res) => {
			this.images = res.items.map((i) => { return i.location });
			debugger;
		}).catch(function (error) {
			debugger
			// Uh-oh, an error occurred!
		});;;
	}

}
