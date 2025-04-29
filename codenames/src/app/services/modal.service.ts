import { Injectable, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { ModalContent } from '../model/modal-content';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  open(title: string, component: Type<ModalContent>, buttonText: string | undefined = undefined) {
    const modalRef = this.modalService.open(ModalWindowComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.buttonText = buttonText;
    modalRef.componentInstance.component = component;
  }
}

