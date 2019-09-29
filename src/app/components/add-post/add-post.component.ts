import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
declare var $: any;

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
	imageSrc = 'https://firebasestorage.googleapis.com/v0/b/first-time-in.appspot.com/o/images%2Flion-conservators-center.jpg?alt=media';

	constructor(private firebaseService: FirebaseService, private router: Router) { }

	ngOnInit() {
		$(document).ready(function () {
			$('#summernote').summernote({
				height: 300,
			});
		});
	}


	addPost() {
		this.firebaseService.createPost({
			text: $('#summernote').summernote('code'),
			shortText: `test`,
			color: 'lightblue',
			image: this.imageSrc
		})
			.then(res => {
			});
	}
}
