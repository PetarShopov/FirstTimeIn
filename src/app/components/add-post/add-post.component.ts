import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
declare var $: any;
import { MatDialog } from '@angular/material/dialog';
import { ImageDialog } from '../image-dialog/image-dialog.component'
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
	mainImage = 'https://firebasestorage.googleapis.com/v0/b/first-time-in.appspot.com/o/images%2Flion-conservators-center.jpg?alt=media';
	title = 'Title';
	showSummernote = false;

	ImageButton = (context) => {
		var ui = $.summernote.ui;
		var button = ui.button({
			contents: 'Image',
			tooltip: 'Image',
			click: () => {
				this.openDialog()
			}
		});
		return button.render();
	}

	constructor(private firebaseService: FirebaseService, public dialog: MatDialog, private router: Router) { }

	ngOnInit() {
		$(document).ready(() => {
			$('#summernote').summernote({
				height: 300,
				dialogsInBody: true,
				toolbar: [
					['paragraph', ['style', 'ol', 'ul', 'paragraph']],
					['font', ['fontname', 'fontsize', 'color', 'bold', 'italic', 'underline', 'strikethrough', 'clear']],
					['insert', ['picture', 'link', 'table', 'hr']],
					['misc', ['fullscreen', 'codeview', 'help']],
					['image', ['image']],
				],
				buttons: {
					image: this.ImageButton,
				}
			});
		});
	}

	addPost() {
		this.firebaseService.createPost({
			text: $('#summernote').summernote('code'),
			shortText: this.title || 'No Title',
			image: this.mainImage
		})
			.then(res => {
				this.router.navigate(['/']);
			});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(ImageDialog, { width: '700px' });

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const text = $('#summernote').summernote('code') + `<img src=${result} style="width: 100px">`;
				$("#summernote").summernote("code", text);
			}
		});
	}

	updateMainImage():void {
		const dialogRef = this.dialog.open(ImageDialog, { width: '700px' });

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.mainImage = result;
			}
		});
	}

	toggleSummernote() {
		this.showSummernote = !this.showSummernote;
	}
}
