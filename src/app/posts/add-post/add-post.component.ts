import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent{
post = '';
@ViewChild('iptext') textArea: ElementRef;

AddPost(){
this.post = this.textArea.nativeElement.value;
}
}
