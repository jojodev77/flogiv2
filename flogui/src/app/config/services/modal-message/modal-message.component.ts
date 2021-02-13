import { Component, OnInit } from '@angular/core';
import { Modal } from '../models/modal.model';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent extends Modal {
  title: string;
  message: string;



  onInjectInputs(inputs): void {
    this.title = inputs.title;
    this.message = inputs.message;
  }

  save(): void {
    this.close('saving');
  }

  cancel(): void {
    this.dismiss('canceling');
  }

}