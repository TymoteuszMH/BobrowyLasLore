import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginData, SheredService } from '../../helpers/shered.service';
import { ValidationService } from '../../helpers/validation.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  @Input() modalTitle:string = "";
  @Input() data:any;
  @Input() posts:any;
  @Input() type:any;
  @Input() edit = false;
  @Output() addeditpost = new EventEmitter<boolean>()
  err = false;
  postTitle = "";
  photoFileName = "";
  photoFilePath = "";
  postContent = "";
  

  constructor(
    private service: SheredService,
    private logindata: LoginData,
    protected validation: ValidationService,
  ){}

  ngOnInit(){
    this.closemodal(true);
    this.postTitle = this.data.postTitle;
    this.photoFileName = this.data.PostPhotoName;
    this.photoFilePath = this.data.PostPhotoPath;
    this.postContent = this.data.PostContent;
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

  closemodal(close: boolean){
    this.addeditpost.emit(close);
  }

  addPost(){
    var val={Type: this.type,
            User: this.logindata.userId,
            PostTitle: this.postTitle,
            PostPhoto: this. photoFilePath,
            PostContent: this.postContent
      }
    var validate = this.validation.ValidatePost(val, true, this.posts)
    if (validate){
      this.service.addPosts(val).subscribe();
      this.closemodal(false);
    }else{
      this.err = true;
    }
  }
  editPost(){
    var val={Type: this.type,
            User: this.logindata.userId,
            PostTitle: this.postTitle,
            PostPhoto: this. photoFilePath,
            PostContent: this.postContent
            }
    var validate = this.validation.ValidatePost(val, true, this.posts)
    if (validate){
      this.service.updatePosts(val).subscribe();
      this.closemodal(false);
    }else{
      this.err = true;
    }
  }
}
