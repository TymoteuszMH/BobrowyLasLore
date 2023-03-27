import { Component, Input } from '@angular/core';
import { LoginData, SheredService } from 'src/app/shered.service';
import { IPost } from '../../interfaces/post';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  @Input() ModalTitle:string="";
  @Input() data:any;
  err = false;
  err_mes= "";
  PostTitle= "";
  PhotoFileName= "";
  PhotoFilePath= "";
  PostContent = "";
  edit = false;

  constructor(
    private service: SheredService,
    private logindata: LoginData,
  ){}

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }

  addPost(){
    var val={

      }

  }
  editPost(){
    
  }
}
