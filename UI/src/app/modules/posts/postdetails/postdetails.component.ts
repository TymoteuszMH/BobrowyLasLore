import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginData, SheredService } from 'src/app/shered.service';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent {
  postId: any;
  UserId: any;
  postData: any = [];

  constructor(
    private service: SheredService,
    private logindata: LoginData,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    const tempID = this.route.snapshot.paramMap.get("id");
    this.postId = tempID;
    this.UserId = this.logindata.userId
  }
  getPost(id:any){
    this.service.getPost(id).subscribe(data=>{
      this.postData = data
    });
  }
}
