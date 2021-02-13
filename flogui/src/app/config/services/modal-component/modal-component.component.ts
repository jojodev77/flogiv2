import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Modal } from '../models/modal.model';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit {
  @ViewChild('modalContainer', { read: ViewContainerRef }) private modalContainer: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    
  }

  createModal<T extends Modal>(component: Type<T>): ComponentRef<T> {
    this.modalContainer.clear();
    
    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);
    
    return this.modalContainer.createComponent(factory, 0);
  }

}