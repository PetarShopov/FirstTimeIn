import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from "../../services/firebase.service";

@Component({
    selector: 'image-dialog',
    templateUrl: './image-dialog.component.html',
})
export class ImageDialog {
    images = []
    constructor(
        public dialogRef: MatDialogRef<ImageDialog>,
        private firebaseService: FirebaseService
    ) { 
        this.getImages();
    }

    getImages() {
        this.firebaseService.getImages().then((res) => {
            this.images = res.items.map((i) => {
                return `https://firebasestorage.googleapis.com/v0/b/first-time-in.appspot.com/o/${encodeURIComponent(i.location.path)}?alt=media`
            });
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClick(image): any {
        this.dialogRef.close(image);
    }

}