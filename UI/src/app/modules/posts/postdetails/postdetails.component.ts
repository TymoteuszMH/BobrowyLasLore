import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginData, SheredService } from '../../helpers/shered.service';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})

export class PostdetailsComponent {
  postId: any;
  UserId: any = this.logindata.userId;
  postData: any = [];
  exist: boolean = false;

  
  
  constructor(
    private logindata: LoginData,
    private route: ActivatedRoute,
    private service: SheredService,
  ){}

  ngOnInit(){
    const tempID = this.route.snapshot.paramMap.get("id");
    this.GetPost(tempID);
  }


  GetPost(id:any){
    this.service.getPost(id).subscribe(data=>{
      this.postData = data;
    })
  }
}
