import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SheredService } from '../../helpers/shered.service';

@Component({
  selector: 'app-deletepost',
  templateUrl: './deletepost.component.html',
  styleUrls: ['./deletepost.component.css']
})
export class DeletepostComponent {
  @Input() id:any;
  postId = 0;
  done = false

  constructor(
    
    private service: SheredService,
    public activeModal: NgbActiveModal
  ){}

  ngOnInit(){
    this.postId = this.id
  }
  //deleting post in api
  deletePost(){
    this.service.deletePost(this.id).subscribe(()=>{
      this.done = true; 
      setTimeout(() => {this.closeModal('post deleted!');}, 200)
    });
  }
  //closing modal
  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}
