import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginData, SheredService } from '../../helpers/shered.service';
import { IPost } from '../../interfaces/post';
import { AddpostComponent } from '../addpost/addpost.component';
import { DeletepostComponent } from '../deletepost/deletepost.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articlesList:IPost[] = [];
  articlesListWithoutFilters:IPost[] = [];
  author = false;
  data:any;
  modalTitle = "";
  titleFilter = ""
  authorFilter = ""

  constructor(
    private service: SheredService,
    protected loginData: LoginData,
    private router: Router,
    private modalService: NgbModal,
  ){}

  ngOnInit(){
    this.getArticlesList();
  }
  //opening modal with ngbootstrap use, checking if modal should be edit or adding, refreshing data after closing modal
  openAddModal(edit:boolean, data:any = {}) {
    const modalRef = this.modalService.open(AddpostComponent,
      {
        backdrop: true,
        scrollable: false,
        centered: true,
      });
    if(edit){
      this.modalTitle = "Edit Article";
      this.data = {PostId: data.PostId,
                  PostTitle: data.PostTitle,
                  PostPhotoPath: data.PostPhotoPath,
                  PostContent: data.PostContent
                  }
    }else{
      this.modalTitle = "Add Article";
      this.data = {PostTitle: "",
                  PostPhotoPath: "",
                  PostContent: ""
                }
      
    }
  //sending needed data to modal
    modalRef.componentInstance.data = this.data;
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.posts = this.articlesList;
    modalRef.componentInstance.type = 2;
    modalRef.componentInstance.edit = edit;
    modalRef.result.then(()=>{this.getArticlesList();});
  }
  //getting post by type for list and filters
  getArticlesList(){
    this.service.getPostbyType(2).subscribe(data=>{
      this.articlesList = data;
      this.articlesListWithoutFilters = data;
    });
  }
  //opening delete modal with needed data, refreshing data after closing modal
  deleteArticule(id:any){
    const modalRef = this.modalService.open(DeletepostComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.componentInstance.id = id;
  modalRef.result.then(()=>{this.getArticlesList();});
  }
  //going to post details
  goToDetails(id:any){
    this.router.navigate([ '/details', id]);
  }
  //implementing filter to data
  filter(){
    var titleFilter = this.titleFilter;
    var authorFilter = this.authorFilter;

    this.articlesList = this.articlesListWithoutFilters.filter(function (el){
      return el.PostTitle.toString().toLowerCase().includes(
        titleFilter.toString().trim().toLowerCase()
      )&&el.User.Username.toString().toLowerCase().includes(
        authorFilter.toString().trim().toLowerCase()
      )
    })
  }
}