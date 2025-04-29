import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-config',
	standalone: true,
  imports: [CommonModule],
	templateUrl: './modal-window.component.html',
	providers: [NgbModalConfig, NgbModal],
})
export class ModalWindowComponent implements AfterViewInit {
  @Input() title: string = 'Title';
  @Input() buttonText: string | undefined = undefined;
  @Input({required: true}) component!: Type<unknown>;


  @ViewChild('contentHost', { read: ViewContainerRef }) contentHost!: ViewContainerRef;

  activeModal = inject(NgbActiveModal);

  ngAfterViewInit(): void {
    this.contentHost.clear();
    this.contentHost.createComponent(this.component);
  }
}
