import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginData, SheredService } from '../../helpers/shered.service';
import { ValidationService } from '../../helpers/validation.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit{
  @Input() modalTitle:string = "";
  @Input() data:any;
  @Input() posts:any;
  @Input() type:any;
  @Input() edit = false;
  err = false;
  postId = 0;
  postTitle = "";
  photoFileName = "";
  photoFilePath = "";
  postContent = "";

  constructor(
    private service: SheredService,
    private logindata: LoginData,
    protected validation: ValidationService,
    public activeModal: NgbActiveModal
  ){}

  ngOnInit(){
    this.postId = this.data.PostId
    this.postTitle = this.data.PostTitle;
    this.photoFilePath = this.data.PostPhotoPath;
    this.postContent = this.data.PostContent;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.photoFileName=data.toString();
      this.photoFilePath=this.service.PhotoUrl+this.photoFileName;
    })
  }

  addPost(){
    var done;
    var val={Type: this.type,
            User: this.logindata.userId,
            PostTitle: this.postTitle,
            PostPhoto: this. photoFilePath,
            PostContent: this.postContent
      }
    var validate = this.validation.ValidatePost(val, false, this.posts)
    if (validate){
      this.service.addPosts(val).subscribe(()=>{done = true; this.closeModal('added post!');});
    }else{
      this.err = true;
    }
  }

  async editPost(){
    var done = false;
    var val={PostId: this.postId,
            Type: this.type,
            User: this.logindata.userId,
            PostTitle: this.postTitle,
            PostPhoto: this. photoFilePath,
            PostContent: this.postContent
            }
    var validate = this.validation.ValidatePost(val, true, this.posts)
    if (validate){
      this.service.updatePosts(val).subscribe(()=>{done = true; this.closeModal('changes saved!');});
    }else{
      this.err = true;
    }
  }
}
