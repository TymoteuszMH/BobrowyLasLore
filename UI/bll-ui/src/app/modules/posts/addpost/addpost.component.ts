import { Component, Input } from '@angular/core';
import { LoginData, SheredService } from 'src/app/shered.service';
import { IPost } from '../../interfaces/post';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  @Input() ModalTitle:string="";
  @Input() data:any;
  PostForm: IPost[] = [];

  constructor(
    private service: SheredService,
    private logindata: LoginData,
  ){}
}
