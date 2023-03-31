import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginData, SheredService } from '../../helpers/shered.service';
import { IPost } from '../../interfaces/post';
import { AddpostComponent } from '../addpost/addpost.component';
import { DeletepostComponent } from '../deletepost/deletepost.component';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})

export class PostdetailsComponent {
  loaded: Promise<boolean> = Promise.resolve(false);
  postId: any;
  userId: any = this.logindata.userId;
  postData: any = [];
  postsList: IPost[] = []
  exist: boolean = false;
  modalTitle: string ="";

  constructor(
    private logindata: LoginData,
    private route: ActivatedRoute,
    private service: SheredService,
    private modalService: NgbModal,
    private router: Router
  ){}
  //getting id from url
  ngOnInit(){
    const tempID = this.route.snapshot.paramMap.get("id");
    this.getPost(tempID);
    this.getPosts();
  }
  //opening edit modal, refreshing data after close
  openAddModal(data:any) {
    const modalRef = this.modalService.open(AddpostComponent,
      {
        backdrop: true,
        scrollable: false,
        centered: true,
      });
      this.modalTitle = "Edit Post";

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.posts = this.postsList;
    modalRef.componentInstance.type = 2;
    modalRef.componentInstance.edit = true;
    
    modalRef.result.then(()=>{this.getPost(data.PostId);});
  }
  //deleting post, going to main page after deleting
  deletePost(id:any){
    const modalRef = this.modalService.open(DeletepostComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.componentInstance.id = id;
  modalRef.result.then(()=>{this.router.navigate([ '/'+this.postData.Type.Type ]);});
  }
  //getting post by id
  getPost(id:any){
    this.service.getPost(id).subscribe(data=>{
      this.postData = data;
      this.loaded = Promise.resolve(true);
    })
  }
  //getting post type's elements for validating title
  getPosts(){
    this.service.getPosts().subscribe(data=>{
      data.forEach((element: any, index:any) => {
        if(element.Type.TypeId != this.postData.Type.TypeId)
          data.splice(index, 1)
      });
      this.postsList = data
    })
  }
  
}
