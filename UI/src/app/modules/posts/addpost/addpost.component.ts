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
  done = false
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
  //aligning input data to local data
  ngOnInit(){
    this.postId = this.data.PostId
    this.postTitle = this.data.PostTitle;
    this.photoFilePath = this.data.PostPhotoPath;
    this.postContent = this.data.PostContent;
  }
  //function to close modal
  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
  //uploading photo to api
  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.photoFileName=data.toString();
      this.photoFilePath=this.service.PhotoUrl+this.photoFileName;
    })
  }
  //adding post, validating it's data, if everything is correct, it waits some time, so the data could reload without any problems
  addPost(){
    var val={Type: this.type,
            User: this.logindata.userId,
            PostTitle: this.postTitle,
            PostPhoto: this. photoFilePath,
            PostContent: this.postContent
      }
    var validate = this.validation.validatePost(val, this.posts)
    if (validate){
      this.service.addPosts(val).subscribe(()=>{
        this.done = true; 
        setTimeout(() => {this.closeModal('added post!');}, 200)
      });
    }else{
      this.err = true;
    }
  }
  //editing post, validating it's data, if everything is correct, it waits some time, so the data could reload without any problems
  editPost(){
    var val={PostId: this.postId,
            Type: this.type,
            User: this.logindata.userId,
            PostTitle: this.postTitle,
            PostPhoto: this. photoFilePath,
            PostContent: this.postContent
            }
    var validate = this.validation.validatePost(val, this.posts)
    if (validate){
      this.service.updatePosts(val).subscribe(()=>{
        this.done = true; 
        setTimeout(() => {this.closeModal('changes saved!');}, 200)
      });
    }else{
      this.err = true;
    }
  }
}
