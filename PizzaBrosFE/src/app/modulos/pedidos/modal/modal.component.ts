import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string = "";
    private elemento: any;
    
    object : any;

    constructor(private modalService: ModalService, private referenciaEl: ElementRef) {
        this.elemento = referenciaEl.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.elemento);

        // close modal on background click
        //el esta solito
        this.elemento.addEventListener('click', (el: { target: { className: string; }; }) => {
            if (el.target.className === 'jw-modal') {
                this.cerrar();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.anadir(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.eliminar(this.id);
        this.elemento.remove();
    }

    // open modal
    abrir(): void {
        
        this.elemento.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    // close modal
    cerrar(): void {
        this.elemento.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}