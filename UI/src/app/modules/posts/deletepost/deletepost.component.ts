import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SheredService } from '../../helpers/shered.service';

@Component({
  selector: 'app-deletepost',
  templateUrl: './deletepost.component.html',
  styleUrls: ['./deletepost.component.css']
})
export class DeletepostComponent {
  
 postId = 0;

 @Input() id:any;

  constructor(
    
    private service: SheredService,
    public activeModal: NgbActiveModal
  ){}

  ngOnInit(){
    this.postId = this.id
  }

  deletePost(){
    var done = false;
    this.service.deletePost(this.id).subscribe(()=>{done = true; this.closeModal('added post!');});
    this.closeModal('post deleted!');
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}
