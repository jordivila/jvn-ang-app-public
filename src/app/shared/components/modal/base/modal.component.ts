import { AfterViewInit, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { modalHide, modalShow } from '../reducers/modal.actions';
import { ModalState } from '../reducers/modal.store';


export abstract class ModalBaseComponent implements OnInit, OnDestroy, AfterViewInit {


  @Input() title: string;
  @Input() body: string;
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() viewInitDoneEvent = new EventEmitter(); // used only when modal is shown using modalHelperService
  @ViewChild('childModal', { static: false }) public childModal: any;

  protected result: boolean;
  protected modalIsOpen: boolean;
  private bodyRef: HTMLBodyElement;

  constructor(
    protected elementRef: ElementRef,
    protected store: Store<ModalState>) {
    this.result = false;
    this.modalIsOpen = false;
    this.title = '';
    this.body = '';
  }

  ngOnInit() {
    // let extending classes super call this method
  }

  ngAfterViewInit() {
    this.domElementMoveToBody();
    this.viewInitDoneEvent.emit();
  }

  ngOnDestroy() {
    this.domElementRemoveFromBody();
  }

  show(): void {
    this.store.dispatch(modalShow());
    this.modalIsOpen = true;
    this.result = false;
    this.childModal.show();
  }

  okClicked(): void {
    this.result = true;
    this.childModal.hide();
  }

  koClicked(): void {
    this.result = false;
    this.childModal.hide();
  }

  modalHidden(): void {
    this.store.dispatch(modalHide());
    this.modalIsOpen = false;
    this.closeEvent.emit(this.result);
  }

  isOpen(): boolean {
    return this.modalIsOpen;
  }

  private domElementMoveToBody() {
    if (this.elementRef) {
      // I move this element & insert it as a body child
      // This is the only way I found to set css blur filter on the document
      // If you do not need to blur background you dont need to use this method
      this.bodyRef = document.getElementsByTagName('body').item(0);
      this.bodyRef.appendChild(this.elementRef.nativeElement);
    }
  }

  private domElementRemoveFromBody() {
    if (this.elementRef.nativeElement.parentNode) {
      this.elementRef.nativeElement.parentNode.removeChild(this.elementRef.nativeElement);
    }
  }
}
