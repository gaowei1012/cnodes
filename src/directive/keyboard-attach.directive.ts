import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Content, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx'
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: '[keyboardAttach]'
})
export class KeyboardAttachDirective implements OnInit, OnDestroy {
    @Input('keyboardAttach') content: Content;

    private onShowSubscription: Subscription;
    private onHideSubscription: Subscription;
    private onShowWindowsSubscription: Subscription;

    constructor(private elementRef: ElementRef,
        private keyboard: Keyboard,
        private platform: Platform) { }

    ngOnInit() {
        if (this.platform.is('covdova') && this.platform.is('ios')) {
            this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe((e) => this.onShow(e));
            this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => this.onHide());
        }

    }

    ngOnDestroy() {
        if (this.onShowSubscription) this.onShowSubscription.unsubscribe();
        if (this.onHideSubscription) this.onHideSubscription.unsubscribe();
        if (this.onShowWindowsSubscription) this.onShowWindowsSubscription.unsubscribe();
    }

    private onShow(e) {
        const keyboardHeight: number = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        this.setElementPostion(keyboardHeight);
        this.keyboard.disableScroll(true);
    }

    private onHide() {
        this.setElementPostion(0);
        this.keyboard.disableScroll(false);
    }

    private setElementPostion(pixels: number) {
        this.elementRef.nativeElement.style.paddingButtom = pixels + 'px';
        this.content.resize();

        this.onShowSubscription = Observable.timer(0, 1)
            .subscribe(() => {
                if (window.pageYOffset !== 0) {
                    window.scrollTo(0, 0);

                    this.onShowSubscription.unsubscribe();

                    setTimeout(() => {
                        this.content.scrollToBottom(0)
                    }, 100)
                }
            })
    }
}