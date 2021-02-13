import { ComponentRef } from  '@angular/core';
import { Observable, Subject } from 'rxjs';


import { ModalComponentComponent } from '../modal-component/modal-component.component';


import { Modal } from './modal.model';

export class ModalRef {
  aftesrClosed() {
    throw new Error('Method not implemented.');
  }

  private result$ = new Subject<any>();

  constructor(
    private modalContainer: ComponentRef<ModalComponentComponent>,
    private modal: ComponentRef<Modal>,
  ) {
    this.modal.instance.modalInstance = this;
  }

  close(output: any): void {
    this.result$.next(output);
    this.destroy$();
  }

  dismiss(output: any): void {
    this.result$.error(output);
    this.destroy$();
  }

  onResult(): Observable<any> {
    return this.result$.asObservable();
  }

   destroy$(): void {
    this.modal.destroy();
    this.modalContainer.destroy();
    this.result$.complete();
  }

}