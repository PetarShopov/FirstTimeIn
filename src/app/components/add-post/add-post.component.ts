import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
declare var $: any;
import { MatDialog } from '@angular/material/dialog';
import { ImageDialog } from '../image-dialog/image-dialog.component'

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
	imageSrc = 'https://firebasestorage.googleapis.com/v0/b/first-time-in.appspot.com/o/images%2Flion-conservators-center.jpg';

	SaveButton = (context) => {
		var ui = $.summernote.ui;
		var button = ui.button({
			contents: 'Save',
			tooltip: 'Save',
			click: () => {
				this.addPost()
			}
		});
		return button.render();
	}

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

	constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

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
					['save', ['save']],
				],
				buttons: {
					image: this.ImageButton,
					save: this.SaveButton,
				}
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

	openDialog(): void {
		const dialogRef = this.dialog.open(ImageDialog, { width: '700px' });

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const text = $('#summernote').summernote('code') + `<img src=${result} style="width: 100px">`;
				$("#summernote").summernote("code", text);
			}
		});
	}
}
