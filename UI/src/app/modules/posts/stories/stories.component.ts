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
  storiesListWithoutFilters:IPost[] = [];
  author = false;
  data:any;
  modalTitle = "";
  titleFilter = "";
  authorFilter = "";

  constructor(
    private service: SheredService,
    protected logindata: LoginData,
    private router: Router,
    private modalService: NgbModal,
  ){}

  ngOnInit(){
    this.getStoriesList();
  }

  //opening modal with ngbootstrap use, checking if modal should be edit or adding, refreshing data after closing modal
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
    //sending needed data to modal
    modalRef.componentInstance.data = this.data;
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.posts = this.storiesList;
    modalRef.componentInstance.type = 3;
    modalRef.componentInstance.edit = edit;
    modalRef.result.then(()=>{this.getStoriesList();});
  }
  //getting post by type for list and filters
  getStoriesList(){
    this.service.getPostbyType(3).subscribe(data=>{
      this.storiesList = data;
      this.storiesListWithoutFilters = data;
    });
  }
  //opening delete modal with needed data, refreshing data after closing modal
  deleteStory(id:any){
    const modalRef = this.modalService.open(DeletepostComponent,{
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.componentInstance.id = id;
  modalRef.result.then(()=>{this.getStoriesList();});
  }
  //going to post details
  goToDetails(id:any){
    this.router.navigate([ '/details', id]);
  }
  //implementing filter to data
  filter(){
    var titleFilter = this.titleFilter;
    var authorFilter = this.authorFilter;

    this.storiesList = this.storiesListWithoutFilters.filter(function (el){
      return el.PostTitle.toString().toLowerCase().includes(
        titleFilter.toString().trim().toLowerCase()
      )&&el.User.Username.toString().toLowerCase().includes(
        authorFilter.toString().trim().toLowerCase()
      )
    })
  }
}