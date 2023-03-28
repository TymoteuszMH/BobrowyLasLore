import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginData, SheredService } from '../../helpers/shered.service';
import { IPost } from '../../interfaces/post';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articlesList:IPost[] = [];
  show = false;
  data:any;
  modalTitle = "";

  constructor(
    private service: SheredService,
    private logindata: LoginData,
    private router: Router,
  ){}

  ngOnInit(){
    this.getArticlesList();
  }

  addArticule(){
    this.data = {PostTitle: "",
                  PostPhotoName: "",
                  PostPhotoPath: "",
                  PostContent: ""
                }
    this.modalTitle = "Add Articule";
    this.show = true;
  }

  close(close: boolean){
    this.show = close;
  }

  getArticlesList(){
    this.service.getPosts().subscribe(data=>{
      this.articlesList = data;
    })
    this.articlesList.forEach((element: any, index:any) => {
      if(element.Type.TypeId != '1')
        this.articlesList.splice(index, 1)
    });
  }

  goToDetails(id:any){
    this.router.navigate([ '/details', id]);
  }


}