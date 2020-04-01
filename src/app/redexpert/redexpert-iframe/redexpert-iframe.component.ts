import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-redexpert-iframe',
    templateUrl: './redexpert-iframe.component.html',
    styleUrls: ['./redexpert-iframe.component.scss']
})
export class RedexpertIframeComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('iframe', { static: false }) iframeRef: ElementRef;

    public iFrameUrl: SafeUrl;
    private routeSubscription: Subscription;
    private iFrameSubscription: Subscription;

    constructor(
        private sanitizer: DomSanitizer,
        private activeRoute: ActivatedRoute) {
        /************************************************************
         *
         *
         *
         * https://stackoverflow.com/questions/25098021/securityerror-blocked-a-frame-with-origin-from-accessing-a-cross-origin-frame
         *
         *
         *
         *************************************************************/
    }

    ngOnInit() {
        this.routeSubscription =
            this.activeRoute
                .params
                .subscribe(currentParams => {
                    this.iFrameUrl =
                        this.sanitizer
                            .bypassSecurityTrustResourceUrl(
                                `https://s-e-redex-dev01.we-group.com/${currentParams.relativePath}`
                            );
                });
    }

    ngAfterViewInit(): void {
        this.iFrameSubscription =
            fromEvent(this.iframeRef.nativeElement, 'load')
                .subscribe((event: Event) => {
                    const overrideStyles = this.getOverridingStyles();
                    $(this.iframeRef.nativeElement)
                        .contents()
                        .find('head:first')
                        .append($(`<style id="angularOverrides" type="text/css"> ${overrideStyles} </style>`));
                });
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }

        if (this.iFrameSubscription) {
            this.iFrameSubscription.unsubscribe();
        }
    }

    private getOverridingStyles(): string {
        return `
            body { background-image:none !important;background-color: transparent !important; }
            section { background-color:transparent !important; background-image:none !important; }
            div.common-tmpl {border:0px solid red;margin:0 0 0 0 !important;padding:0 0 0 0 !important;width:100% !important;}
            div.common-tmpl header {display:none;}
            div.common-tmpl div#body {
                height:100% !important;top:0 !important;margin:0 0 0 0 !important;padding:0 0 0 0 !important; width:99% !important;}
            div.common-tmpl nav.menu.fixed {display:none;}
            div.common-tmpl footer {display:none;}`;
    }
}
