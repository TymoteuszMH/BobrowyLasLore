import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SheredService, LoginData } from '../../helpers/shered.service';
import { IPost } from '../../interfaces/post';
import { AddpostComponent } from '../addpost/addpost.component';
import { DeletepostComponent } from '../deletepost/deletepost.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  storiesList:IPost[] = [];
  author = false;
  data:any;
  modalTitle = "";

  constructor(
    private service: SheredService,
    protected logindata: LoginData,
    private router: Router,
    private modalService: NgbModal,
  ){}

  ngOnInit(){
    this.getStoriesList();
  }

  openAddModal(edit:boolean, data:any = {}) {
    const modalRef = this.modalService.open(AddpostComponent,{
        backdrop: true,
        scrollable: false,
        centered: true,
    });
    if(edit){
      this.modalTitle = "Edit Story";
      this.data = {
                  PostId: data.PostId,
                  PostTitle: data.PostTitle,
                  PostPhotoPath: data.PostPhotoPath,
                  PostContent: data.PostContent
      };
    }else{
      this.modalTitle = "Add Story";
      this.data = {
                  PostTitle: "",
                  PostPhotoPath: "",
                  PostContent: ""
      };
    }
    modalRef.componentInstance.data = this.data;
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.posts = this.storiesList;
    modalRef.componentInstance.type = 3;
    modalRef.componentInstance.edit = edit;
    modalRef.result.then(()=>{this.getStoriesList();});
  }

  getStoriesList(){
    this.service.getPostbyType(3).subscribe(data=>{
      this.storiesList = data;
    });
  }

  deleteStory(id:any){
    const modalRef = this.modalService.open(DeletepostComponent,{
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.componentInstance.id = id;
  modalRef.result.then(()=>{this.getStoriesList();});
  }

  goToDetails(id:any){
    this.router.navigate([ '/details', id]);
  }
}